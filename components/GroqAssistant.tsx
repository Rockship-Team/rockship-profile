import { Mic, Send, Square, Trash2, Volume2, VolumeX, X } from "lucide-react";
import Image from "next/image";
import React, { useCallback, useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  clearConversation,
  getChatResponseStream,
  stopSpeechFallback,
  textToSpeech,
  textToSpeechFallback,
  transcribeAudio,
} from "../services/assistantService";
import { ChatMessage, ChatRole } from "../types";
import { CaseStudyCard } from "./CaseStudyCard";

// Normalize text: convert Unicode bullets to markdown, fix line breaks
const normalizeMarkdown = (text: string): string => {
  let result = text;

  // Replace all Unicode bullet variants with markdown dash
  // Covers: • ● ○ ◦ ‣ ⁃ ◉ ⦿ ⦾ ∙
  result = result.replace(/[•●○◦‣⁃◉⦿⦾∙]/g, "-");

  // Split into lines and merge bullet-only lines with next content line
  const lines = result.split("\n");
  const mergedLines: string[] = [];

  // Helper to check if a line is just a bullet
  const isBulletOnly = (line: string): boolean => {
    const t = line.trim();
    return t === "-" || t === "*" || t === "•" || t === "●" || t === "";
  };

  for (let i = 0; i < lines.length; i++) {
    const trimmed = lines[i].trim();

    // Check if this line is just a dash/bullet
    if (trimmed === "-" || trimmed === "*") {
      // Find the next line with actual content
      let nextContent = "";
      let skipTo = i;
      for (let j = i + 1; j < lines.length; j++) {
        const nextTrimmed = lines[j].trim();
        // Skip empty lines and bullet-only lines
        if (nextTrimmed && !isBulletOnly(lines[j])) {
          nextContent = nextTrimmed;
          skipTo = j;
          break;
        }
      }
      if (nextContent) {
        mergedLines.push("- " + nextContent);
        i = skipTo; // Skip to after the content line
      }
      // If no content found, skip this orphan bullet
    } else if (trimmed) {
      // Only add non-empty lines
      mergedLines.push(lines[i]);
    }
  }

  result = mergedLines.join("\n");

  // Ensure dash has space after it: "-Item" -> "- Item"
  result = result.replace(/^-([^\s\n-])/gm, "- $1");

  // Remove excessive blank lines
  result = result.replace(/\n{3,}/g, "\n\n");

  return result.trim();
};

// Memoized markdown component definitions - moved outside component to prevent recreation
const markdownComponents = {
  p: ({ children }: { children?: React.ReactNode }) => (
    <p className="mb-2 last:mb-0">{children}</p>
  ),
  ul: ({ children }: { children?: React.ReactNode }) => (
    <ul className="list-disc list-inside mb-2 space-y-1">{children}</ul>
  ),
  ol: ({ children }: { children?: React.ReactNode }) => (
    <ol className="list-decimal list-inside mb-2 space-y-1">{children}</ol>
  ),
  li: ({ children }: { children?: React.ReactNode }) => (
    <li className="text-gray-200">{children}</li>
  ),
  strong: ({ children }: { children?: React.ReactNode }) => (
    <strong className="font-bold text-white">{children}</strong>
  ),
  em: ({ children }: { children?: React.ReactNode }) => (
    <em className="italic">{children}</em>
  ),
  code: ({ children }: { children?: React.ReactNode }) => (
    <code className="bg-rockship-900/50 px-1.5 py-0.5 rounded text-xs font-mono text-cyan-300">
      {children}
    </code>
  ),
  pre: ({ children }: { children?: React.ReactNode }) => (
    <pre className="bg-rockship-900/80 p-2 rounded-lg overflow-x-auto mb-2 text-xs font-mono">
      {children}
    </pre>
  ),
  a: ({ children, href }: { children?: React.ReactNode; href?: string }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-rockship-accent hover:text-cyan-300 underline"
    >
      {children}
    </a>
  ),
  blockquote: ({ children }: { children?: React.ReactNode }) => (
    <blockquote className="border-l-2 border-rockship-accent/50 pl-3 italic text-gray-300 mb-2">
      {children}
    </blockquote>
  ),
  h1: ({ children }: { children?: React.ReactNode }) => (
    <h1 className="text-lg font-bold text-white mb-2">{children}</h1>
  ),
  h2: ({ children }: { children?: React.ReactNode }) => (
    <h2 className="text-base font-bold text-white mb-2">{children}</h2>
  ),
  h3: ({ children }: { children?: React.ReactNode }) => (
    <h3 className="text-sm font-bold text-white mb-1">{children}</h3>
  ),
};

// Memoized Markdown renderer component
const MarkdownRenderer = React.memo(({ content }: { content: string }) => (
  <div className="markdown-content">
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
      {normalizeMarkdown(content)}
    </ReactMarkdown>
  </div>
));
MarkdownRenderer.displayName = "MarkdownRenderer";

export const GroqAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: ChatRole.MODEL,
      text: "Hello! I'm Rockship, your AI guide. Ask me anything about our solutions, tech stack, or case studies.",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [isTTSEnabled, setIsTTSEnabled] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [usingFallbackSTT, setUsingFallbackSTT] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const recordingTimerRef = useRef<NodeJS.Timeout | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const recognitionRef = useRef<InstanceType<
    NonNullable<typeof window.SpeechRecognition>
  > | null>(null);
  const hasSpokenGreetingRef = useRef(false);

  // Cleanup audio analysis on unmount
  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  // Listen for custom event from AISphere click in Hero section
  useEffect(() => {
    const handleOpenChat = () => setIsOpen(true);
    window.addEventListener("openAIChat", handleOpenChat);
    return () => window.removeEventListener("openAIChat", handleOpenChat);
  }, []);

  // Hide button in hero section, show after scrolling past it
  useEffect(() => {
    const handleScroll = () => {
      // Show button after scrolling past 80% of viewport height (hero section)
      const scrollThreshold = window.innerHeight * 0.8;
      setShowButton(window.scrollY > scrollThreshold);
    };

    // Check initial position
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  // Audio analysis for speech visualization
  const startAudioAnalysis = useCallback((audioElement: HTMLAudioElement) => {
    try {
      // Create audio context if not exists
      if (!audioContextRef.current) {
        audioContextRef.current = new (
          window.AudioContext ||
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (window as any).webkitAudioContext
        )();
      }

      const audioContext = audioContextRef.current;

      // Resume context if suspended
      if (audioContext.state === "suspended") {
        audioContext.resume();
      }

      // Create analyser
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 256;
      analyser.smoothingTimeConstant = 0.8;
      analyserRef.current = analyser;

      // Connect audio element to analyser
      const source = audioContext.createMediaElementSource(audioElement);
      source.connect(analyser);
      analyser.connect(audioContext.destination);

      // Start monitoring audio levels
      const dataArray = new Uint8Array(analyser.frequencyBinCount);

      const updateLevel = () => {
        if (!analyserRef.current) return;

        analyserRef.current.getByteFrequencyData(dataArray);

        // Calculate average level (0-255) and normalize to 0-1
        const sum = dataArray.reduce((a, b) => a + b, 0);
        const average = sum / dataArray.length;
        const normalizedLevel = Math.min(average / 128, 1); // Normalize and cap at 1

        setAudioLevel(normalizedLevel);

        animationFrameRef.current = requestAnimationFrame(updateLevel);
      };

      updateLevel();
    } catch (error) {
      console.warn("[Audio Analysis] Failed to start:", error);
    }
  }, []);

  const stopAudioAnalysis = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    setAudioLevel(0);
  }, []);

  // Simulated audio level for Web Speech API (no direct audio access)
  const startSimulatedAudioLevel = useCallback(() => {
    const startTime = Date.now();
    const updateSimulatedLevel = () => {
      const elapsed = (Date.now() - startTime) / 1000;
      // Create natural speech-like variation using multiple sine waves
      const level =
        0.4 +
        Math.sin(elapsed * 8) * 0.2 +
        Math.sin(elapsed * 12) * 0.15 +
        Math.sin(elapsed * 20) * 0.1;
      setAudioLevel(Math.max(0, Math.min(1, level)));
      animationFrameRef.current = requestAnimationFrame(updateSimulatedLevel);
    };
    updateSimulatedLevel();
  }, []);

  // Fallback TTS using Web Speech API
  const speakWithFallback = useCallback(
    async (cleanText: string) => {
      console.log("[TTS] Starting Web Speech fallback...");
      startSimulatedAudioLevel();
      try {
        await textToSpeechFallback(cleanText);
        console.log("[TTS] Web Speech fallback completed");
      } catch (error) {
        console.warn("[TTS] Web Speech fallback failed:", error);
      } finally {
        stopAudioAnalysis();
        setIsSpeaking(false);
      }
    },
    [startSimulatedAudioLevel, stopAudioAnalysis],
  );

  // TTS playback function using Groq Orpheus API with Web Speech fallback
  const speakText = useCallback(
    async (text: string) => {
      if (!text || !isTTSEnabled) return;

      // Clean text for TTS - remove markdown and JSON
      const cleanText = text
        .replace(/\{"type":"case_study"[^}]+\}/g, "") // Remove case study JSON
        .replace(/[*_`#]/g, "") // Remove markdown formatting
        .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") // Convert links to text
        .replace(/\n{2,}/g, ". ") // Replace multiple newlines with period
        .replace(/\n/g, " ") // Replace single newlines with space
        .replace(/\s{2,}/g, " ") // Collapse multiple spaces
        .trim();

      if (!cleanText) return;

      setIsSpeaking(true);
      console.log("[TTS] Speaking text:", cleanText.substring(0, 50) + "...");

      try {
        console.log("[TTS] Trying TTS API...");
        const audioData = await textToSpeech(cleanText);

        // Check if we got valid audio data (not null and not empty)
        if (audioData && audioData.byteLength > 0) {
          console.log(
            "[TTS] Groq returned audio:",
            audioData.byteLength,
            "bytes",
          );
          // Use TTS audio
          const audioBlob = new Blob([audioData], { type: "audio/wav" });
          const audioUrl = URL.createObjectURL(audioBlob);

          // Stop any existing audio
          if (audioRef.current) {
            audioRef.current.pause();
            URL.revokeObjectURL(audioRef.current.src);
          }

          const audio = new Audio(audioUrl);
          audioRef.current = audio;

          audio.onended = () => {
            console.log("[TTS] Groq audio playback finished");
            stopAudioAnalysis();
            setIsSpeaking(false);
            URL.revokeObjectURL(audioUrl);
          };

          // If Groq audio fails to play, fallback to Web Speech
          audio.onerror = (e) => {
            console.warn(
              "[TTS] Groq audio playback failed:",
              e,
              "- using Web Speech fallback",
            );
            stopAudioAnalysis();
            URL.revokeObjectURL(audioUrl);
            speakWithFallback(cleanText);
          };

          await audio.play();
          console.log("[TTS] Groq audio playback started");

          // Start audio analysis for visualization
          startAudioAnalysis(audio);
        } else {
          // Groq API failed or returned empty, use Web Speech fallback
          console.log(
            "[TTS] Groq returned null/empty, using Web Speech fallback",
          );
          await speakWithFallback(cleanText);
        }
      } catch (error) {
        // Any error in TTS, try Web Speech fallback
        console.warn("[TTS] TTS error:", error, "- trying Web Speech fallback");
        await speakWithFallback(cleanText);
      }
    },
    [isTTSEnabled, speakWithFallback, startAudioAnalysis, stopAudioAnalysis],
  );

  // Speak greeting when chat opens with TTS enabled
  useEffect(() => {
    if (
      isOpen &&
      isTTSEnabled &&
      !hasSpokenGreetingRef.current &&
      messages.length > 0
    ) {
      hasSpokenGreetingRef.current = true;
      // Small delay to ensure audio context is ready
      const timer = setTimeout(() => {
        speakText(messages[0].text);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen, isTTSEnabled, messages, speakText]);

  // Toggle TTS
  const toggleTTS = useCallback(() => {
    setIsTTSEnabled((prev) => {
      if (prev) {
        // Stop audio when disabling TTS
        if (audioRef.current) {
          audioRef.current.pause();
        }
        stopSpeechFallback();
        stopAudioAnalysis();
        setIsSpeaking(false);
      }
      return !prev;
    });
  }, [stopAudioAnalysis]);

  // Recording timer
  useEffect(() => {
    if (isRecording) {
      setRecordingTime(0);
      recordingTimerRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } else {
      if (recordingTimerRef.current) {
        clearInterval(recordingTimerRef.current);
        recordingTimerRef.current = null;
      }
    }
    return () => {
      if (recordingTimerRef.current) {
        clearInterval(recordingTimerRef.current);
      }
    };
  }, [isRecording]);

  // Format seconds to mm:ss
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen, scrollToBottom]);

  // Stop current TTS playback
  const stopTTS = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    stopSpeechFallback();
    stopAudioAnalysis();
    setIsSpeaking(false);
  }, [stopAudioAnalysis]);

  const handleSend = useCallback(async () => {
    if (!input.trim()) return;

    // Stop TTS if playing - allow user to interrupt
    if (isSpeaking) {
      stopTTS();
    }

    const userInput = input;
    const userMsg: ChatMessage = {
      role: ChatRole.USER,
      text: userInput,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    // Create a placeholder message for streaming
    const initialBotMsg: ChatMessage = {
      role: ChatRole.MODEL,
      text: "",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, initialBotMsg]);

    // Use a variable to accumulate the response to avoid state mutation issues
    let accumulatedText = "";

    const updateMessage = (text: string) => {
      setMessages((prev) => {
        const newMessages = prev.slice(0, -1);
        const lastMsg = prev[prev.length - 1];
        if (lastMsg && lastMsg.role === ChatRole.MODEL) {
          return [...newMessages, { ...lastMsg, text }];
        }
        return prev;
      });
    };

    try {
      await getChatResponseStream(
        userInput,
        // onChunk: update the last message with new content
        (chunk) => {
          accumulatedText += chunk;
          updateMessage(accumulatedText);
        },
        // onComplete: speak the response if TTS is enabled
        (fullResponse) => {
          setIsLoading(false);
          speakText(fullResponse);
        },
        // onError: show error message
        (error, isUnavailable) => {
          updateMessage(error);
          setIsLoading(false);
          if (isUnavailable) {
            setIsOnline(false);
          }
        },
      );
    } catch (err) {
      console.error("Chat error:", err);
      updateMessage("Sorry, something went wrong. Please try again.");
      setIsLoading(false);
    }
  }, [input, speakText, isSpeaking, stopTTS]);

  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter") handleSend();
    },
    [handleSend],
  );

  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const handleClear = useCallback(() => {
    clearConversation();
    setMessages([
      {
        role: ChatRole.MODEL,
        text: "Hello! I'm Rockship, your AI guide. Ask me anything about our solutions, tech stack, or case studies.",
        timestamp: new Date(),
      },
    ]);
  }, []);

  const stopRecording = useCallback(() => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state !== "inactive"
    ) {
      mediaRecorderRef.current.stop();
    }
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }
    setIsRecording(false);
  }, []);

  // Start Web Speech Recognition (fallback)
  const startWebSpeechRecognition = useCallback(() => {
    const SpeechRecognitionAPI =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognitionAPI) {
      alert("Web Speech Recognition is not supported in this browser.");
      return false;
    }

    const recognition = new SpeechRecognitionAPI();
    recognitionRef.current = recognition;
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    recognition.onresult = (event: any) => {
      const results = event.results;
      let transcript = "";
      for (let i = 0; i < results.length; i++) {
        transcript += results[i][0].transcript + " ";
      }
      transcript = transcript.trim();
      if (transcript) {
        setInput((prev) => (prev ? `${prev} ${transcript}` : transcript));
      }
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    recognition.onerror = (event: any) => {
      console.error("Speech recognition error:", event.error);
      if (event.error === "not-allowed") {
        alert("Microphone permission denied.");
      }
      setIsRecording(false);
    };

    recognition.onend = () => {
      setIsRecording(false);
    };

    recognition.start();
    setIsRecording(true);
    return true;
  }, []);

  const handleMicClick = useCallback(async () => {
    if (isRecording) {
      // Stop recording
      stopRecording();
      return;
    }

    // Stop TTS if playing when starting to record
    if (isSpeaking) {
      stopTTS();
    }

    // Use Web Speech Recognition API if fallback is enabled
    if (usingFallbackSTT) {
      startWebSpeechRecognition();
      return;
    }

    // Check if browser supports getUserMedia
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      alert("Your browser does not support microphone access.");
      return;
    }

    // Start recording with Groq Whisper
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
          sampleRate: 16000,
        },
      });
      streamRef.current = stream;

      const mimeType = MediaRecorder.isTypeSupported("audio/webm;codecs=opus")
        ? "audio/webm;codecs=opus"
        : MediaRecorder.isTypeSupported("audio/webm")
          ? "audio/webm"
          : "audio/mp4";

      const mediaRecorder = new MediaRecorder(stream, { mimeType });
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        if (streamRef.current) {
          streamRef.current.getTracks().forEach((track) => track.stop());
          streamRef.current = null;
        }

        if (audioChunksRef.current.length === 0) return;

        const audioBlob = new Blob(audioChunksRef.current, { type: mimeType });
        setIsTranscribing(true);

        try {
          const transcribedText = await transcribeAudio(audioBlob);
          if (transcribedText !== null) {
            // Groq Whisper succeeded
            if (transcribedText) {
              setInput((prev) =>
                prev ? `${prev} ${transcribedText}` : transcribedText,
              );
            }
          } else {
            // Groq failed, enable fallback for next recording
            console.warn("Enabling Web Speech Recognition fallback");
            setUsingFallbackSTT(true);
          }
        } catch (error) {
          console.error("Transcription error:", error);
          setUsingFallbackSTT(true);
        } finally {
          setIsTranscribing(false);
          audioChunksRef.current = [];
        }
      };

      mediaRecorder.onerror = (event) => {
        console.error("MediaRecorder error:", event);
        stopRecording();
      };

      mediaRecorder.start(500);
      setIsRecording(true);
    } catch (error: unknown) {
      console.error("Microphone access error:", error);
      if (
        error instanceof Error &&
        (error.name === "NotAllowedError" ||
          error.name === "PermissionDeniedError")
      ) {
        alert(
          "Microphone permission denied. Please allow microphone access in your browser settings.",
        );
      } else {
        alert(
          "Could not access microphone. Please check your device settings.",
        );
      }
    }
  }, [
    isRecording,
    stopRecording,
    usingFallbackSTT,
    startWebSpeechRecognition,
    isSpeaking,
    stopTTS,
  ]);

  return (
    <div className="fixed bottom-4 right-2 md:bottom-6 md:right-6 z-50 flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-80 md:w-96 h-[500px] glass-panel rounded-2xl flex flex-col shadow-2xl border border-rockship-accent/30 overflow-hidden animate-fade-in-up">
          {/* Header */}
          <div className="bg-gradient-to-r from-rockship-900 to-rockship-800 p-4 flex justify-between items-center border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 flex-shrink-0 relative overflow-hidden rounded-full">
                <Image
                  src="/captain_chatbot_no_bg.png"
                  alt="Rockship Assistant"
                  width={40}
                  height={40}
                  className="object-cover"
                />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-display font-bold text-sm text-white">
                    Rockship Assistant
                  </h3>
                  <button
                    onClick={toggleTTS}
                    className={`p-1 rounded-lg transition ${
                      isTTSEnabled
                        ? "text-rockship-accent bg-rockship-accent/20"
                        : "text-gray-400 hover:text-white"
                    } ${isSpeaking ? "animate-pulse" : ""}`}
                    aria-label={isTTSEnabled ? "Disable voice" : "Enable voice"}
                    title={
                      isTTSEnabled
                        ? "Voice enabled (click to disable)"
                        : "Enable voice response"
                    }
                  >
                    {isTTSEnabled ? (
                      <Volume2 size={16} />
                    ) : (
                      <VolumeX size={16} />
                    )}
                  </button>
                </div>
                <span
                  className={`text-xs flex items-center gap-1 ${isOnline ? "text-green-400" : "text-red-400"}`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${isOnline ? "bg-green-400 animate-pulse" : "bg-red-400"}`}
                  ></span>
                  {isOnline ? "Online" : "Offline"}
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-white transition"
              aria-label="Close chat"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-rockship-900/50">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${
                  msg.role === ChatRole.USER ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                    msg.role === ChatRole.USER
                      ? "bg-rockship-accent text-white rounded-br-none font-medium"
                      : "bg-rockship-800 text-gray-200 rounded-bl-none border border-white/5"
                  }`}
                >
                  {msg.role === ChatRole.MODEL
                    ? (() => {
                        // Show loading dots if message is empty and still loading
                        if (!msg.text && isLoading) {
                          return (
                            <div className="flex gap-1 items-center py-1">
                              <span
                                className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"
                                style={{ animationDelay: "0ms" }}
                              ></span>
                              <span
                                className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"
                                style={{ animationDelay: "150ms" }}
                              ></span>
                              <span
                                className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"
                                style={{ animationDelay: "300ms" }}
                              ></span>
                            </div>
                          );
                        }

                        // Extract case_study JSON and render cards
                        const extractJsonObjects = (text: string): string[] => {
                          const results: string[] = [];
                          const marker = '{"type":"case_study"';
                          let searchStart = 0;

                          while (searchStart < text.length) {
                            const start = text.indexOf(marker, searchStart);
                            if (start === -1) break;

                            // Find matching closing brace by counting
                            let depth = 0;
                            let end = -1;
                            for (let i = start; i < text.length; i++) {
                              if (text[i] === "{") depth++;
                              if (text[i] === "}") depth--;
                              if (depth === 0) {
                                end = i + 1;
                                break;
                              }
                            }

                            if (end === -1) {
                              // Incomplete JSON, stop searching
                              break;
                            }

                            results.push(text.substring(start, end));
                            searchStart = end;
                          }

                          return results;
                        };

                        const text = msg.text;
                        const jsonStrings = extractJsonObjects(text);

                        if (jsonStrings.length === 0) {
                          return <MarkdownRenderer content={text} />;
                        }

                        // Parse and validate JSONs
                        const cards: React.ReactNode[] = [];
                        let cleanText = text;

                        jsonStrings.forEach((jsonStr, idx) => {
                          try {
                            const parsed = JSON.parse(jsonStr);
                            if (
                              parsed.type === "case_study" &&
                              parsed.data?.slug &&
                              parsed.data?.logoText
                            ) {
                              cards.push(
                                <CaseStudyCard
                                  key={`card-${idx}`}
                                  item={parsed.data}
                                  index={0}
                                  compact
                                />,
                              );
                              cleanText = cleanText.replace(jsonStr, "");
                            }
                          } catch {
                            // Keep invalid JSON in text
                          }
                        });

                        // Just trim, let normalizeMarkdown in MarkdownRenderer handle bullet formatting
                        cleanText = cleanText.trim();

                        if (cards.length === 0) {
                          return <MarkdownRenderer content={text} />;
                        }

                        return (
                          <div className="space-y-3">
                            {cleanText && (
                              <MarkdownRenderer content={cleanText} />
                            )}
                            {cards}
                          </div>
                        );
                      })()
                    : msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 bg-rockship-900 border-t border-white/10 flex gap-2">
            <button
              onClick={handleClear}
              disabled={isLoading || messages.length <= 1}
              className="text-gray-400 hover:text-white p-2 rounded-xl transition disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Clear conversation"
              title="Clear conversation"
            >
              <Trash2 size={18} />
            </button>
            {isRecording ? (
              // Recording UI with waveform and timer
              <div className="flex-1 bg-rockship-accent rounded-xl px-4 py-2 flex items-center justify-between">
                {/* Waveform animation */}
                <div className="flex items-center gap-[3px] h-5">
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                    <div
                      key={i}
                      className="w-[3px] bg-rockship-900 rounded-full"
                      style={{
                        animation: "waveform 0.8s ease-in-out infinite",
                        animationDelay: `${i * 0.08}s`,
                      }}
                    />
                  ))}
                </div>
                {/* Timer and Stop button */}
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-rockship-900 tabular-nums">
                    {formatTime(recordingTime)}
                  </span>
                  <button
                    type="button"
                    onClick={handleMicClick}
                    className="w-6 h-6 bg-rockship-900 rounded flex items-center justify-center hover:bg-rockship-800 transition"
                    aria-label="Stop recording"
                    title="Stop recording"
                  >
                    <Square size={12} className="text-white fill-white" />
                  </button>
                </div>
                {/* Inline keyframes for waveform */}
                <style>{`
                  @keyframes waveform {
                    0%, 100% { height: 6px; }
                    50% { height: 18px; }
                  }
                `}</style>
              </div>
            ) : (
              // Regular input
              <div className="flex-1 relative flex items-center">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder={
                    isTranscribing ? "Transcribing..." : "Ask about our AI..."
                  }
                  disabled={isTranscribing}
                  className="w-full bg-rockship-800 border-none rounded-xl pl-4 pr-10 py-2 text-sm text-white focus:ring-2 focus:ring-rockship-accent outline-none disabled:opacity-50"
                />
                <button
                  type="button"
                  onClick={handleMicClick}
                  disabled={isTranscribing || isLoading}
                  className={`absolute right-2 p-1 rounded-lg transition ${
                    isTranscribing
                      ? "text-rockship-accent animate-pulse"
                      : "text-gray-400 hover:text-white"
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                  aria-label="Start recording"
                  title="Voice input"
                >
                  <Mic size={16} />
                </button>
              </div>
            )}
            <button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="bg-rockship-accent hover:bg-cyan-300 text-rockship-900 p-2 rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed"
              title="Send message"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}

      {/* Floating Action Button - AISphere Mini (hidden in hero section) */}
      {!isOpen && (
        <div
          className={`transition-all duration-500 ease-out flex flex-col items-center ${
            showButton
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 translate-y-4 scale-90 pointer-events-none"
          }`}
        >
          {/* Badge */}
          <div className="mb-1 md:mb-2 mr-1 md:mr-0 bg-white text-rockship-900 px-2 md:px-3 py-1 rounded-full text-[10px] md:text-xs font-bold shadow-lg animate-bounce-sync border border-rockship-accent/30 whitespace-nowrap">
            Need help?
          </div>
          <button
            onClick={toggleOpen}
            className="relative w-14 h-14 md:w-24 md:h-24 mr-1 md:mr-0 rounded-full overflow-hidden hover:scale-110 transition-transform active:scale-95 bg-transparent group animate-bounce-gentle"
          >
            <Image
              src="/captain_chatbot_no_bg.png"
              alt="Open chat"
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
          </button>
          {/* Synced bounce animations */}
          <style>{`
            @keyframes bounce-sync {
              0%, 100% { transform: translateY(0); }
              50% { transform: translateY(-8px); }
            }
            @keyframes bounce-gentle {
              0%, 100% { transform: translateY(0); }
              50% { transform: translateY(-4px); }
            }
            .animate-bounce-sync {
              animation: bounce-sync 1.5s ease-in-out infinite;
            }
            .animate-bounce-gentle {
              animation: bounce-gentle 1.5s ease-in-out infinite;
              animation-delay: 0.1s;
            }
          `}</style>
        </div>
      )}
    </div>
  );
};
