import { NextRequest, NextResponse } from "next/server";
import { getGroqApiKey } from "@/lib/chat/config";

export const runtime = "nodejs";

const MAX_TEXT_LENGTH = 4000;

/**
 * Proxies text-to-speech to Groq (Orpheus). Same reason as the transcribe
 * route: keeps the Groq key off the client.
 *
 * Returns 502 on any upstream failure — the client treats a non-OK response as
 * the signal to fall back to the browser's Web Speech API.
 */
export async function POST(request: NextRequest) {
  const apiKey = getGroqApiKey();
  if (!apiKey) {
    return NextResponse.json({ error: "TTS is not configured" }, { status: 503 });
  }

  let text: unknown;
  try {
    text = (await request.json())?.text;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (typeof text !== "string" || !text.trim()) {
    return NextResponse.json({ error: "Text is required" }, { status: 400 });
  }

  const input = text.slice(0, MAX_TEXT_LENGTH);

  try {
    const response = await fetch("https://api.groq.com/openai/v1/audio/speech", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "canopylabs/orpheus-v1-english",
        input,
        voice: "autumn",
        response_format: "wav",
      }),
    });

    if (!response.ok) {
      console.warn("Groq TTS failed:", response.status);
      return NextResponse.json({ error: "TTS failed" }, { status: 502 });
    }

    return new Response(await response.arrayBuffer(), {
      headers: {
        "Content-Type": "audio/wav",
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("TTS error:", error);
    return NextResponse.json({ error: "TTS failed" }, { status: 502 });
  }
}
