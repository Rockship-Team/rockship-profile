import OpenAI from "openai";

/**
 * Server-only provider configuration. Nothing here may be prefixed
 * NEXT_PUBLIC_ — that would inline the credential into the client bundle,
 * which is exactly the bug this module exists to fix.
 */

/**
 * Chat runs on Qwen via Alibaba Cloud Model Studio's OpenAI-compatible
 * endpoint. In ap-southeast-1 the base URL must carry the WorkspaceId segment
 * (https://{WorkspaceId}.ap-southeast-1.maas.aliyuncs.com/compatible-mode/v1);
 * without it requests fail against the region.
 */
export const QWEN_MODEL = process.env.QWEN_MODEL || "qwen-plus";

let client: OpenAI | null = null;

export const getQwenClient = (): OpenAI | null => {
  const apiKey = process.env.DASHSCOPE_API_KEY;
  const baseURL = process.env.DASHSCOPE_BASE_URL;

  if (!apiKey || !baseURL) return null;
  if (!client) client = new OpenAI({ apiKey, baseURL });
  return client;
};

/**
 * Voice (Whisper STT, Orpheus TTS) stays on Groq for now — only chat moved to
 * Qwen. Qwen-ASR is worth evaluating separately.
 */
export const getGroqApiKey = (): string | undefined => process.env.GROQ_API_KEY;
