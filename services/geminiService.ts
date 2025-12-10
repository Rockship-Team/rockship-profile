import { Chat, GenerateContentResponse, GoogleGenAI } from "@google/genai";
import { knowledgeBase } from "./knowledgeBaseService";

const SYSTEM_PROMPT = `
You are RockshipAI, an intelligent assistant for RockshipAI Solutions.

Your role is to:
1. Answer questions about RockshipAI professionally and accurately
2. Reference specific data and information from the knowledge base when provided
3. Be helpful, concise, and enthusiastic about our solutions
4. When discussing technical details, cite specific features and capabilities
5. For pricing inquiries, suggest scheduling a demo
6. Maintain a professional yet friendly tone

Guidelines:
- Always base your answers on the provided knowledge base information
- When specific data is available (numbers, names, technologies), use it accurately
- If information is not available in the knowledge base, acknowledge it politely
- Keep responses focused and relevant to the user's question

When the user asks about a specific case study, or asks to see a case study, you MUST output the response in the following JSON format (and ONLY this JSON, no other text):
    
IMPORTANT: You MUST populate the JSON fields using the EXACT values found in the "Relevant Knowledge Base Information" section. Do not hallucinate or change the values.

{
  "type": "case_study",
  "data": {
    "type": "Partner", 
    "title": "Exact title from context",
    "logoText": "Exact logoText from context",
    "partner": "Exact partner from context"
  }
}

If you find multiple case studies, choose the most relevant one.
`;

let chatSession: Chat | null = null;
let genAI: GoogleGenAI | null = null;

export const initGemini = (): boolean => {
  if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
    console.warn("Gemini API Key missing.");
    return false;
  }
  try {
    genAI = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY });
    return true;
  } catch (e) {
    console.error("Failed to init Gemini", e);
    return false;
  }
};

export const getChatResponse = async (userMessage: string): Promise<string> => {
  if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY || !genAI) {
    return "I'm currently offline (API Key missing). Please check back later.";
  }

  try {
    // Search knowledge base for relevant information
    const relevantKnowledge = knowledgeBase.searchKnowledge(userMessage);
    const knowledgeContext =
      knowledgeBase.formatKnowledgeForLLM(relevantKnowledge);

    // Create enhanced prompt with knowledge base
    const enhancedPrompt = `${knowledgeContext}

USER QUESTION: ${userMessage}

Please provide a comprehensive answer based on the information above. If specific details are provided in the knowledge base, reference them directly in your response.`;

    if (!chatSession) {
      chatSession = genAI.chats.create({
        model: "gemini-2.5-flash",
        config: {
          systemInstruction: SYSTEM_PROMPT,
          temperature: 0.7,
        },
      });
    }

    const result: GenerateContentResponse = await chatSession.sendMessage({
      message: enhancedPrompt,
    });

    return (
      result.text || "I processed that, but couldn't generate a text response."
    );
  } catch (error) {
    console.error("Gemini Chat Error:", error);
    return "I apologize, but I'm having trouble connecting to the RockshipAI knowledge base right now.";
  }
};
