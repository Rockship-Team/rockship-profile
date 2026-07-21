/**
 * Browser-side assistant client.
 *
 * Every provider call goes through our own API routes — no API key is
 * referenced here, so none is inlined into the client bundle. The system
 * prompt, knowledge-base retrieval and scope enforcement all live server-side
 * in app/api/chat/route.ts.
 */

/** Mirrors the server's HistoryMessage in app/api/chat/route.ts. */
type HistoryMessage = {
  role: "user" | "assistant";
  content: string;
};

// Kept in the browser because the chat route is stateless. Only plain messages
// go in here — retrieved knowledge is attached per-turn by the server and must
// never accumulate across turns.
let conversationHistory: HistoryMessage[] = [];

export const clearConversation = (): void => {
  conversationHistory = [];
};

// Speech-to-text via our /api/voice/transcribe proxy, with fallback signal
export const transcribeAudio = async (
  audioBlob: Blob,
  language: string = "en",
): Promise<string | null> => {
  try {
    const formData = new FormData();
    formData.append("file", audioBlob, "audio.webm");
    formData.append("language", language);

    const response = await fetch("/api/voice/transcribe", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      const data = await response.json();
      return data.text || "";
    }
    console.warn("Transcription failed, signaling fallback");
  } catch (error) {
    console.warn("Transcription error:", error);
  }

  // Return null to signal that fallback should be used for next recording
  return null;
};

// Text-to-Speech via our /api/voice/speech proxy, with Web Speech API fallback
export const textToSpeech = async (
  text: string,
): Promise<ArrayBuffer | null> => {
  try {
    const response = await fetch("/api/voice/speech", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });

    if (response.ok) {
      return response.arrayBuffer();
    }
    console.warn("TTS failed, falling back to Web Speech API");
  } catch (error) {
    console.warn("TTS error, falling back to Web Speech API:", error);
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

const MAX_HISTORY = 20;

// Streaming version with callback for real-time UI updates
export const getChatResponseStream = async (
  userMessage: string,
  onChunk: (chunk: string) => void,
  onComplete: (fullResponse: string) => void,
  onError: (error: string, isUnavailable: boolean) => void,
): Promise<void> => {
  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: userMessage,
        history: conversationHistory.slice(-MAX_HISTORY),
      }),
    });

    if (!response.ok || !response.body) {
      // 503 means the server has no provider credentials — a configuration
      // problem, not a transient one, so the UI shows itself as offline.
      onError(
        "Sorry, the assistant is unavailable right now. Please try again later.",
        response.status === 503,
      );
      return;
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let fullResponse = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      const chunk = decoder.decode(value, { stream: true });
      if (chunk) {
        fullResponse += chunk;
        onChunk(chunk);
      }
    }
    fullResponse += decoder.decode();

    // Only plain messages are retained; the server attaches retrieved
    // knowledge itself, per turn.
    conversationHistory.push(
      { role: "user", content: userMessage },
      { role: "assistant", content: fullResponse },
    );
    if (conversationHistory.length > MAX_HISTORY) {
      conversationHistory = conversationHistory.slice(-MAX_HISTORY);
    }

    onComplete(
      fullResponse ||
        "I processed that, but couldn't generate a text response.",
    );
  } catch (error: unknown) {
    console.error("Chat Error:", error);
    onError("Sorry, something went wrong. Please try again.", false);
  }
};
