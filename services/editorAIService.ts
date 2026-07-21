import type { AIAction } from "@/lib/chat/editor-prompts"

export type { AIAction }

interface AIRequest {
  action: AIAction
  text?: string
  prompt?: string
  language?: string
}

/**
 * Calls the admin editor's writing assistant through our own API route. The
 * Gemini key and prompts stay on the server — this used to run in the browser
 * with a NEXT_PUBLIC_ key, which shipped the credential in the bundle.
 */
export async function executeAIAction(request: AIRequest): Promise<string> {
  let response: Response
  try {
    response = await fetch("/api/editor-ai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(request),
    })
  } catch (error) {
    console.error("AI Action Error:", error)
    throw new Error("Failed to process AI request. Please try again.")
  }

  const data = await response.json().catch(() => null)

  if (!response.ok) {
    throw new Error(
      data?.error || "Failed to process AI request. Please try again."
    )
  }

  return data.result
}
