import Groq from "groq-sdk";
import { knowledgeBase } from "./knowledgeBaseService";

const SYSTEM_PROMPT = `You are RockshipAI Assistant. Help users learn about RockshipAI Solutions.

RULES:
- Always reply in English (default), unless user writes in Vietnamese
- Be concise: 2-4 sentences max
- For lists, put each item on a NEW LINE starting with dash (-). Example:
  Here are our services:
  - AI automation
  - Data analytics

CASE STUDY CARDS:
When user asks about case studies, include JSON for EACH matching case study (copy values EXACTLY from knowledge base):
{"type":"case_study","data":{"slug":"exact-slug","type":"Case Studies","title":"exact title","logoText":"exact logoText","partner":"exact partner"}}

For MULTIPLE case studies (when listing all or showing related ones), include MULTIPLE JSON objects:
Example response for "show all case studies":
Here are our case studies:
{"type":"case_study","data":{"slug":"ai-loan-automation","type":"Case Studies","title":"Automated borrower engagement...","logoText":"AI Loan Automation for Microfinance","partner":""}}
{"type":"case_study","data":{"slug":"ai-conversational-commerce","type":"Case Studies","title":"...","logoText":"AI Conversational Commerce","partner":""}}
`;

type ChatMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

let groq: Groq | null = null;
let conversationHistory: ChatMessage[] = [];

export const clearConversation = (): void => {
  conversationHistory = [{ role: "system", content: SYSTEM_PROMPT }];
};

export const initGroq = (): boolean => {
  if (!process.env.NEXT_PUBLIC_GROQ_API_KEY) {
    console.warn("Groq API Key missing.");
    return false;
  }
  try {
    groq = new Groq({
      apiKey: process.env.NEXT_PUBLIC_GROQ_API_KEY,
      dangerouslyAllowBrowser: true,
    });
    conversationHistory = [{ role: "system", content: SYSTEM_PROMPT }];
    return true;
  } catch (e) {
    console.error("Failed to init Groq", e);
    return false;
  }
};

// Speech-to-text transcription using Groq Whisper API with fallback signal
export const transcribeAudio = async (
  audioBlob: Blob,
  language: string = "en",
): Promise<string | null> => {
  const apiKey = process.env.NEXT_PUBLIC_GROQ_API_KEY;

  if (apiKey) {
    try {
      const formData = new FormData();
      formData.append("file", audioBlob, "audio.webm");
      formData.append("model", "whisper-large-v3-turbo");
      formData.append("response_format", "json");
      formData.append("language", language);

      const response = await fetch(
        "https://api.groq.com/openai/v1/audio/transcriptions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
          },
          body: formData,
        },
      );

      if (response.ok) {
        const data = await response.json();
        return data.text || "";
      }
      console.warn("Groq Whisper failed, signaling fallback");
    } catch (error) {
      console.warn("Groq Whisper error:", error);
    }
  }

  // Return null to signal that fallback should be used for next recording
  return null;
};

// Text-to-Speech using TTS API (Orpheus model) with Web Speech API fallback
export const textToSpeech = async (
  text: string,
): Promise<ArrayBuffer | null> => {
  const apiKey = process.env.NEXT_PUBLIC_GROQ_API_KEY;

  // Try TTS first
  if (apiKey) {
    try {
      const response = await fetch(
        "https://api.groq.com/openai/v1/audio/speech",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "canopylabs/orpheus-v1-english",
            input: text,
            voice: "autumn",
            response_format: "wav",
          }),
        },
      );

      if (response.ok) {
        return response.arrayBuffer();
      }
      console.warn("TTS failed, falling back to Web Speech API");
    } catch (error) {
      console.warn("TTS error, falling back to Web Speech API:", error);
    }
  }

  // Return null to signal fallback to Web Speech API
  return null;
};

// Helper to get voices with fallback for async loading
const getVoicesAsync = (): Promise<SpeechSynthesisVoice[]> => {
  return new Promise((resolve) => {
    const voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
      resolve(voices);
      return;
    }
    // Voices not loaded yet, wait for voiceschanged event
    const handleVoicesChanged = () => {
      window.speechSynthesis.removeEventListener(
        "voiceschanged",
        handleVoicesChanged,
      );
      resolve(window.speechSynthesis.getVoices());
    };
    window.speechSynthesis.addEventListener(
      "voiceschanged",
      handleVoicesChanged,
    );
    // Timeout fallback in case event never fires
    setTimeout(() => {
      window.speechSynthesis.removeEventListener(
        "voiceschanged",
        handleVoicesChanged,
      );
      resolve(window.speechSynthesis.getVoices());
    }, 1000);
  });
};

// Track if TTS should be cancelled
let ttsCancelled = false;

// Preprocess text for more natural speech
const preprocessTextForSpeech = (text: string): string => {
  return (
    text
      // Remove URLs
      .replace(/https?:\/\/[^\s]+/g, "")
      // Remove email addresses
      .replace(/[\w.-]+@[\w.-]+\.\w+/g, "")
      // Remove special characters that sound awkward
      .replace(/[*_`~#]/g, "")
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") // [link](url) -> link
      // Normalize whitespace
      .replace(/\s+/g, " ")
      .trim()
  );
};

// Split text into sentences for natural pauses
const splitIntoSentences = (text: string): string[] => {
  // Split on sentence boundaries but keep the punctuation
  const sentences = text.match(/[^.!?]+[.!?]+|[^.!?]+$/g) || [text];
  return sentences.map((s) => s.trim()).filter((s) => s.length > 0);
};

// Fallback TTS using Web Speech API (browser native)
// Speaks sentence by sentence with natural pauses for better quality
export const textToSpeechFallback = async (text: string): Promise<void> => {
  if (typeof window === "undefined" || !window.speechSynthesis) {
    throw new Error("Speech synthesis not supported");
  }

  // Reset cancel flag
  ttsCancelled = false;

  // Cancel any ongoing speech
  window.speechSynthesis.cancel();
  await new Promise((r) => setTimeout(r, 100));

  // Preprocess and split into sentences
  const processedText = preprocessTextForSpeech(text);
  const sentences = splitIntoSentences(processedText);

  if (sentences.length === 0) return;

  // Get voices
  const voices = await getVoicesAsync();
  const englishVoices = voices.filter((v) => v.lang.startsWith("en"));

  // Priority list: Premium/Enhanced voices first, then Google, then standard
  const preferredVoicePatterns = [
    // macOS premium voices (most natural)
    "Ava (Premium)",
    "Zoe (Premium)",
    "Evan (Premium)",
    "Samantha (Enhanced)",
    "Karen (Premium)",
    "Daniel (Enhanced)",
    "Serena (Premium)",
    // Google voices
    "Google UK English Female",
    "Google UK English Male",
    "Google US English",
    // Microsoft Edge voices
    "Microsoft Aria",
    "Microsoft Jenny",
    "Microsoft Guy",
    // Standard macOS
    "Samantha",
    "Karen",
    "Daniel",
    "Moira",
    "Tessa",
    "Alex",
  ];

  let selectedVoice: SpeechSynthesisVoice | undefined;
  for (const pattern of preferredVoicePatterns) {
    selectedVoice = englishVoices.find((v) => v.name.includes(pattern));
    if (selectedVoice) break;
  }
  if (!selectedVoice) {
    selectedVoice = englishVoices[0];
  }

  // Determine voice settings
  const isPremium =
    selectedVoice?.name.includes("Premium") ||
    selectedVoice?.name.includes("Enhanced");
  const isGoogle = selectedVoice?.name.includes("Google");

  // Settings for more natural speech
  const rate = isPremium ? 0.95 : isGoogle ? 0.88 : 0.85;
  const pitch = isPremium ? 1.0 : 0.95;

  console.log(
    "[TTS Fallback] Using voice:",
    selectedVoice?.name || "default",
    "| rate:",
    rate,
  );

  // Speak each sentence with a pause between
  for (let i = 0; i < sentences.length; i++) {
    if (ttsCancelled) {
      console.log("[TTS Fallback] Cancelled");
      return;
    }

    const sentence = sentences[i];
    await speakSentence(sentence, selectedVoice, rate, pitch);

    // Natural pause between sentences (shorter for questions/exclamations)
    if (i < sentences.length - 1 && !ttsCancelled) {
      const pauseDuration = sentence.endsWith("?") ? 200 : 300;
      await new Promise((r) => setTimeout(r, pauseDuration));
    }
  }

  console.log("[TTS Fallback] Finished all sentences");
};

// Speak a single sentence
const speakSentence = (
  text: string,
  voice: SpeechSynthesisVoice | undefined,
  rate: number,
  pitch: number,
): Promise<void> => {
  return new Promise((resolve) => {
    if (ttsCancelled) {
      resolve();
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = rate;
    utterance.pitch = pitch;
    utterance.volume = 1.0;

    if (voice) {
      utterance.voice = voice;
    }

    utterance.onend = () => resolve();
    utterance.onerror = (e) => {
      if (e.error !== "interrupted" && e.error !== "canceled") {
        console.warn("[TTS] Sentence error:", e.error);
      }
      resolve();
    };

    window.speechSynthesis.speak(utterance);

    // Chrome bug workaround: resume if paused
    const resumeInterval = setInterval(() => {
      if (!window.speechSynthesis.speaking || ttsCancelled) {
        clearInterval(resumeInterval);
      } else if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      }
    }, 5000);

    utterance.onend = () => {
      clearInterval(resumeInterval);
      resolve();
    };
  });
};

// Stop Web Speech API
export const stopSpeechFallback = (): void => {
  ttsCancelled = true;
  if (typeof window !== "undefined" && window.speechSynthesis) {
    window.speechSynthesis.cancel();
  }
};

// Streaming version with callback for real-time UI updates
export const getChatResponseStream = async (
  userMessage: string,
  onChunk: (chunk: string) => void,
  onComplete: (fullResponse: string) => void,
  onError: (error: string) => void,
): Promise<void> => {
  if (!process.env.NEXT_PUBLIC_GROQ_API_KEY || !groq) {
    onError("error");
    return;
  }

  try {
    // Keep conversation history manageable (max 20 messages + system)
    if (conversationHistory.length > 21) {
      conversationHistory = [
        conversationHistory[0], // system prompt
        ...conversationHistory.slice(-20), // last 20 messages
      ];
    }

    // Search knowledge base for relevant information
    const relevantKnowledge = knowledgeBase.searchKnowledge(userMessage);
    const knowledgeContext =
      knowledgeBase.formatKnowledgeForLLM(relevantKnowledge);

    // Create enhanced prompt with knowledge base
    const enhancedPrompt = `${knowledgeContext}

USER: ${userMessage}`;

    // Add user message to history
    conversationHistory.push({ role: "user", content: enhancedPrompt });

    // Create chat completion with streaming
    const chatCompletion = await groq.chat.completions.create({
      messages: conversationHistory,
      model: "llama-3.3-70b-versatile",
      temperature: 0.5,
      max_tokens: 4096,
      top_p: 0.9,
      stream: true,
    });

    // Stream response with callbacks
    let fullResponse = "";
    for await (const chunk of chatCompletion) {
      const content = chunk.choices[0]?.delta?.content || "";
      if (content) {
        fullResponse += content;
        onChunk(content);
      }
    }

    // Add assistant response to history
    conversationHistory.push({ role: "assistant", content: fullResponse });

    onComplete(
      fullResponse ||
        "I processed that, but couldn't generate a text response.",
    );
  } catch (error: unknown) {
    console.error("Groq Chat Error:", error);
    onError("error");
  }
};
