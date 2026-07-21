import { NextRequest, NextResponse } from "next/server";
import { getGroqApiKey } from "@/lib/chat/config";

export const runtime = "nodejs";

const MAX_AUDIO_BYTES = 10 * 1024 * 1024; // ~10 minutes of opus

/**
 * Proxies speech-to-text to Groq Whisper. The browser used to call
 * api.groq.com directly with the key in an Authorization header; this route
 * exists so the key can be server-only.
 */
export async function POST(request: NextRequest) {
  const apiKey = getGroqApiKey();
  if (!apiKey) {
    return NextResponse.json({ error: "STT is not configured" }, { status: 503 });
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
  }

  const file = form.get("file");
  if (!(file instanceof Blob)) {
    return NextResponse.json({ error: "Audio file is required" }, { status: 400 });
  }
  if (file.size > MAX_AUDIO_BYTES) {
    return NextResponse.json({ error: "Audio too large" }, { status: 413 });
  }

  const language = form.get("language");

  // Rebuilt rather than forwarded, so the caller cannot choose the model or
  // smuggle extra fields to Groq.
  const upstreamForm = new FormData();
  upstreamForm.append("file", file, "audio.webm");
  upstreamForm.append("model", "whisper-large-v3-turbo");
  upstreamForm.append("response_format", "json");
  upstreamForm.append(
    "language",
    typeof language === "string" && /^[a-z]{2}$/.test(language) ? language : "en"
  );

  try {
    const response = await fetch(
      "https://api.groq.com/openai/v1/audio/transcriptions",
      {
        method: "POST",
        headers: { Authorization: `Bearer ${apiKey}` },
        body: upstreamForm,
      }
    );

    if (!response.ok) {
      console.warn("Groq Whisper failed:", response.status);
      return NextResponse.json({ error: "Transcription failed" }, { status: 502 });
    }

    const data = await response.json();
    return NextResponse.json({ text: data.text || "" });
  } catch (error) {
    console.error("Transcription error:", error);
    return NextResponse.json({ error: "Transcription failed" }, { status: 502 });
  }
}
