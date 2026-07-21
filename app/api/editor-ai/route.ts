import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";
import {
  AI_ACTIONS,
  getEditorSystemPrompt,
  type AIAction,
} from "@/lib/chat/editor-prompts";

export const runtime = "nodejs";

const MAX_INPUT_LENGTH = 20000;
const ADMIN_COOKIE_NAME = "admin_session";

let genAI: GoogleGenAI | null = null;

/**
 * Same check as proxy.ts. Repeated here because the proxy matcher only covers
 * `/admin/:path*` — without this the route would be an open, billable Gemini
 * endpoint.
 */
const isAuthenticated = (request: NextRequest): boolean => {
  const token = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
  if (!token) return false;
  try {
    const [username] = Buffer.from(token, "base64").toString().split(":");
    return !!process.env.ADMIN_USERNAME && username === process.env.ADMIN_USERNAME;
  } catch {
    return false;
  }
};

const getClient = (): GoogleGenAI | null => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  if (!genAI) genAI = new GoogleGenAI({ apiKey });
  return genAI;
};

/**
 * Writing assistant for the admin blog editor. Behind the admin auth in
 * proxy.ts, and server-side so GEMINI_API_KEY never reaches the browser.
 */
export async function POST(request: NextRequest) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const ai = getClient();
  if (!ai) {
    return NextResponse.json(
      { error: "AI service unavailable. Please check API key configuration." },
      { status: 503 }
    );
  }

  let body: { action?: string; text?: string; prompt?: string; language?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { action, text, prompt, language } = body;
  if (!action || !AI_ACTIONS.includes(action as AIAction)) {
    return NextResponse.json({ error: "Unknown action" }, { status: 400 });
  }

  const userMessage = (action === "generate" ? prompt : text) || "";
  if (!userMessage.trim()) {
    return NextResponse.json(
      { error: "No text provided for AI action." },
      { status: 400 }
    );
  }
  if (userMessage.length > MAX_INPUT_LENGTH) {
    return NextResponse.json({ error: "Text too long" }, { status: 413 });
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-lite",
      contents: userMessage,
      config: {
        systemInstruction: getEditorSystemPrompt(action as AIAction, language),
        temperature: action === "grammar" ? 0.1 : 0.7,
      },
    });

    const result = response.text?.trim();
    if (!result) {
      return NextResponse.json(
        { error: "AI returned empty response." },
        { status: 502 }
      );
    }

    return NextResponse.json({ result });
  } catch (error) {
    console.error("Editor AI error:", error);
    return NextResponse.json(
      { error: "Failed to process AI request. Please try again." },
      { status: 502 }
    );
  }
}
