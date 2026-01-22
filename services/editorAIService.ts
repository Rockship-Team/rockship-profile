import { GoogleGenAI } from "@google/genai"

let genAI: GoogleGenAI | null = null

const initAI = (): GoogleGenAI | null => {
  if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
    console.warn("Gemini API Key missing.")
    return null
  }
  if (!genAI) {
    genAI = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY })
  }
  return genAI
}

export type AIAction =
  | "generate"
  | "improve"
  | "shorter"
  | "longer"
  | "grammar"
  | "translate"
  | "summarize"
  | "continue"

interface AIRequest {
  action: AIAction
  text?: string
  prompt?: string
  language?: string
}

const getSystemPrompt = (action: AIAction, language?: string): string => {
  const prompts: Record<AIAction, string> = {
    generate: `You are a helpful writing assistant. Generate content based on the user's prompt.
Write in a professional, engaging style suitable for a blog post.
Output ONLY the generated content, no explanations or meta text.`,

    improve: `You are a professional editor. Improve the given text by:
- Enhancing clarity and readability
- Fixing awkward phrasing
- Improving word choice
- Maintaining the original meaning and tone
Output ONLY the improved text, no explanations.`,

    shorter: `You are a concise editor. Make the text shorter while:
- Keeping the key message and meaning intact
- Removing redundancy and filler words
- Maintaining readability
Output ONLY the shortened text, no explanations.`,

    longer: `You are a content expander. Expand the text by:
- Adding relevant details and examples
- Elaborating on key points
- Maintaining the original tone and style
- Keeping it natural and not repetitive
Output ONLY the expanded text, no explanations.`,

    grammar: `You are a grammar expert. Fix all grammar, spelling, and punctuation errors in the text.
- Correct typos and misspellings
- Fix grammatical errors
- Improve punctuation
- Maintain the original meaning
Output ONLY the corrected text, no explanations.`,

    translate: `You are a professional translator. Translate the text to ${language || "Vietnamese"}.
- Maintain the original meaning and tone
- Use natural, fluent language
- Preserve formatting (headings, lists, etc.)
Output ONLY the translated text, no explanations.`,

    summarize: `You are a summarization expert. Summarize the text into key points:
- Extract the main ideas
- Present them as clear, concise bullet points
- Maintain accuracy
Output ONLY the summary, no explanations.`,

    continue: `You are a writing assistant. Continue writing from where the text ends:
- Match the style and tone of the existing text
- Create a natural continuation
- Add relevant content that flows well
Output ONLY the continuation text, no explanations.`,
  }

  return prompts[action]
}

export async function executeAIAction(request: AIRequest): Promise<string> {
  const ai = initAI()

  if (!ai) {
    throw new Error("AI service unavailable. Please check API key configuration.")
  }

  const { action, text, prompt, language } = request

  let userMessage: string
  if (action === "generate") {
    userMessage = prompt || "Write an introduction paragraph."
  } else {
    userMessage = text || ""
  }

  if (!userMessage.trim()) {
    throw new Error("No text provided for AI action.")
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-lite",
      contents: userMessage,
      config: {
        systemInstruction: getSystemPrompt(action, language),
        temperature: action === "grammar" ? 0.1 : 0.7,
      },
    })

    const result = response.text
    if (!result) {
      throw new Error("AI returned empty response.")
    }

    return result.trim()
  } catch (error) {
    console.error("AI Action Error:", error)
    throw new Error("Failed to process AI request. Please try again.")
  }
}
