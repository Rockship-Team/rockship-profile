import { NextRequest, NextResponse } from "next/server";
import { getQwenClient, QWEN_MODEL } from "@/lib/chat/config";
import { getRefusal, SYSTEM_PROMPT } from "@/lib/chat/prompt";
import { knowledgeBase } from "@/services/knowledgeBaseService";

export const runtime = "nodejs";

/** Mirrors the client-side history entry in services/assistantService.ts. */
type HistoryMessage = { role: "user" | "assistant"; content: string };

const MAX_HISTORY = 20;
const MAX_MESSAGE_LENGTH = 2000;

const isHistoryMessage = (value: unknown): value is HistoryMessage =>
  typeof value === "object" &&
  value !== null &&
  ((value as HistoryMessage).role === "user" ||
    (value as HistoryMessage).role === "assistant") &&
  typeof (value as HistoryMessage).content === "string";

/** A one-chunk stream, so refusals look identical to a model reply in the UI. */
const streamText = (text: string): Response =>
  new Response(
    new ReadableStream({
      start(controller) {
        controller.enqueue(new TextEncoder().encode(text));
        controller.close();
      },
    }),
    { headers: { "Content-Type": "text/plain; charset=utf-8" } }
  );

export async function POST(request: NextRequest) {
  let message: unknown;
  let history: HistoryMessage[] = [];

  try {
    const body = await request.json();
    message = body?.message;
    if (Array.isArray(body?.history)) {
      history = body.history.filter(isHistoryMessage).slice(-MAX_HISTORY);
    }
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (typeof message !== "string" || !message.trim()) {
    return NextResponse.json({ error: "Message is required" }, { status: 400 });
  }
  if (message.length > MAX_MESSAGE_LENGTH) {
    return NextResponse.json({ error: "Message too long" }, { status: 413 });
  }

  // Scope gate. Retrieval finding nothing means the question is not about us,
  // so refuse here rather than sending it to the model: a prompt rule can be
  // argued around, this cannot, and it costs nothing.
  const matches = knowledgeBase.searchKnowledge(message);
  if (matches.length === 0) {
    return streamText(getRefusal(message));
  }

  const client = getQwenClient();
  if (!client) {
    console.error("Chat API: DASHSCOPE_API_KEY / DASHSCOPE_BASE_URL not set");
    return NextResponse.json(
      { error: "Chat is not configured" },
      { status: 503 }
    );
  }

  const knowledgeContext = knowledgeBase.formatKnowledgeForLLM(matches);

  try {
    const completion = await client.chat.completions.create({
      model: QWEN_MODEL,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...history,
        // Retrieved knowledge is scoped to this turn only. Folding it into the
        // user message (as the old client-side code did) pushed the blob into
        // history, so every turn carried every previous retrieval — burning
        // context and feeding stale topics back to the model.
        {
          role: "system",
          content: `Knowledge base excerpt for the question below. Answer only from this.\n${knowledgeContext}`,
        },
        { role: "user", content: message },
      ],
      // Retuned for Qwen: this is lookup from a supplied excerpt, not open
      // generation, so temperature/top_p are lower than the Llama values. The
      // replies are capped at 2-4 sentences, so 1024 output tokens is ample
      // and well inside qwen-plus's 8k limit.
      temperature: 0.3,
      max_tokens: 1024,
      top_p: 0.8,
      stream: true,
    });

    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();
        try {
          for await (const chunk of completion) {
            const content = chunk.choices[0]?.delta?.content;
            if (content) controller.enqueue(encoder.encode(content));
          }
        } catch (error) {
          console.error("Chat API stream error:", error);
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Failed to process chat message" },
      { status: 500 }
    );
  }
}
