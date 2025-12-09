import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";

const COMPANY_CONTEXT = `
You are RockshipAI, an intelligent assistant for RockshipAI Solutions. 
Here is the company profile you represent:

1. COMPANY PROFILE
- Name: RockshipAI Solutions
- Founded: 2018
- Domain: Enterprise Artificial Intelligence & Machine Learning
- Mission: To accelerate human potential through scalable, ethical, and secure AI infrastructure.
- Vision: A world where AI seamlessly augments every industry, driving efficiency and innovation.
- Core Values: Innovation, Transparency, Ethical AI, Scalability.

2. SOLUTIONS
- Platforms: LLM Core Engine, Computer Vision Suite, Rockship Voice (Multimodal), Workflow Orchestrator.
- Industry Solutions: Automotive, Robotics, Finance, Healthcare, Defense.
- Services: RLHF, Synthetic Data, Model Evaluation, Custom Pipelines.

3. TECH STACK
- Frameworks: PyTorch, JAX, TensorFlow, YOLO, Detectron.
- Infrastructure: AWS/GCP/Azure, Kubernetes, Docker.
- Data: ClickHouse, PostgreSQL, Vector Databases.

4. ENTERPRISE & GOV
- We offer on-premise deployments, ISO/SOC2 compliance, and GovCloud secure environments.

5. ACHIEVEMENTS
- 500M+ Labeled Data Points processed.
- 150+ Enterprise Deployments.
- 40% Average Accuracy Lift for clients.

Your goal is to answer questions about RockshipAI professionally, briefly, and enthusiastically. 
If asked about pricing, suggest scheduling a demo.
`;

let chatSession: Chat | null = null;
let genAI: GoogleGenAI | null = null;

export const initGemini = (): boolean => {
  if (!process.env.GEMINI_API_KEY) {
    console.warn("Gemini API Key missing.");
    return false;
  }
  try {
    genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    return true;
  } catch (e) {
    console.error("Failed to init Gemini", e);
    return false;
  }
};

export const getChatResponse = async (userMessage: string): Promise<string> => {
  if (!process.env.GEMINI_API_KEY || !genAI) {
    return "I'm currently offline (API Key missing). Please check back later.";
  }

  try {
    if (!chatSession) {
      chatSession = genAI.chats.create({
        model: 'gemini-2.5-flash',
        config: {
          systemInstruction: COMPANY_CONTEXT,
          temperature: 0.7,
        },
      });
    }

    const result: GenerateContentResponse = await chatSession.sendMessage({
      message: userMessage
    });

    return result.text || "I processed that, but couldn't generate a text response.";

  } catch (error) {
    console.error("Gemini Chat Error:", error);
    return "I apologize, but I'm having trouble connecting to the RockshipAI knowledge base right now.";
  }
};