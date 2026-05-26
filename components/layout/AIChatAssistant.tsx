"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Bot, User, Wifi, ChevronDown } from "lucide-react";

// Tooth SVG icon for the floating button
function ToothSVG({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M16 4C10 4 4 10 4 18C4 26 8 32 8 40C8 56 12 76 20 76C24 76 26 68 28 60C29 56 30 54 32 54C34 54 35 56 36 60C38 68 40 76 44 76C52 76 56 56 56 40C56 32 60 26 60 18C60 10 54 4 48 4C42 4 38 8 32 8C26 8 22 4 16 4Z"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinejoin="round"
        fill="rgba(255,255,255,0.15)"
      />
    </svg>
  );
}

interface Message {
  id: string;
  role: "user" | "bot";
  text: string;
  timestamp: Date;
}

const QUICK_REPLIES = [
  { label: "📅 Book Appointment", key: "book" },
  { label: "💰 Pricing Info", key: "pricing" },
  { label: "🚨 Emergency?", key: "emergency" },
  { label: "🦷 Services", key: "services" },
];

const BOT_RESPONSES: Record<string, string> = {
  book: `Great! You can book an appointment in a few ways:\n\n📞 Call us: +91-9876543210\n💬 WhatsApp: +91-9876543210\n🌐 Online form on our website\n\nOur clinic is open Mon–Sat 9am–8pm and Sun 10am–4pm. For emergencies, we're available 24/7.\n\nShall I help with anything else?`,
  pricing: `Our treatments are competitively priced:\n\n✨ Teeth Whitening: ₹8,000–₹15,000\n🦷 Dental Implants: ₹25,000–₹60,000\n👑 Dental Crown: ₹5,000–₹12,000\n📐 Invisalign: ₹80,000–₹1,50,000\n🔧 Root Canal: ₹4,000–₹8,000\n\nWe offer flexible EMI options. Book a free consultation for an exact quote!`,
  emergency: `🚨 DENTAL EMERGENCY — We're here!\n\nFor urgent dental care, call us immediately:\n\n📞 Emergency Line: +91-9876543210\n\nWe provide 24/7 emergency service. Common emergencies we handle:\n• Severe toothache\n• Broken or knocked-out tooth\n• Dental abscess\n• Lost crown or filling\n\nDon't wait — call now and we'll see you right away!`,
  services: `We offer a full range of dental treatments:\n\n🦷 General Dentistry\n  • Cleanings & Check-ups\n  • Fillings & Root Canal\n\n✨ Cosmetic Dentistry\n  • Teeth Whitening\n  • Veneers & Smile Design\n\n📐 Orthodontics\n  • Invisalign & Metal Braces\n\n🔩 Implantology\n  • Single & Full Arch Implants\n\nWould you like details on any specific service?`,
  default: `Thank you for your message! 😊 Our team will get back to you shortly.\n\nFor immediate assistance:\n📞 Call: +91-9876543210\n📧 Email: hello@smilecraftdental.com\n\nIs there anything else I can help you with?`,
};

// Typing dots animation component
function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 px-4 py-3 rounded-2xl rounded-bl-sm" style={{ background: "#f1f5f9", maxWidth: "80px" }}>
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-2 h-2 rounded-full"
          style={{ background: "#94a3b8" }}
          animate={{ y: [0, -5, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 0.7, repeat: Infinity, delay: i * 0.18, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

export default function AIChatAssistant() {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "bot",
      text: "Hi! I'm your dental AI assistant. How can I help you today? 😊",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen && !isMinimized) {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [messages, isOpen, isMinimized]);

  const addBotMessage = async (responseKey: string) => {
    setIsTyping(true);
    // Simulate realistic typing delay based on message length
    const responseText = BOT_RESPONSES[responseKey] ?? BOT_RESPONSES.default;
    const typingDuration = Math.min(500 + responseText.length * 8, 2500);
    await new Promise((resolve) => setTimeout(resolve, typingDuration));
    setIsTyping(false);
    setMessages((prev) => [
      ...prev,
      {
        id: `bot-${Date.now()}`,
        role: "bot",
        text: responseText,
        timestamp: new Date(),
      },
    ]);
  };

  const handleQuickReply = async (key: string, label: string) => {
    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      text: label,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    await addBotMessage(key);
  };

  const handleSend = async () => {
    const text = inputValue.trim();
    if (!text) return;
    setInputValue("");
    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      text,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);

    // Simple keyword matching for scripted responses
    const lower = text.toLowerCase();
    let responseKey = "default";
    if (lower.includes("book") || lower.includes("appoint") || lower.includes("schedule")) {
      responseKey = "book";
    } else if (lower.includes("price") || lower.includes("cost") || lower.includes("fee") || lower.includes("₹")) {
      responseKey = "pricing";
    } else if (lower.includes("emergency") || lower.includes("urgent") || lower.includes("pain") || lower.includes("hurts")) {
      responseKey = "emergency";
    } else if (lower.includes("service") || lower.includes("treatment") || lower.includes("what") || lower.includes("offer")) {
      responseKey = "services";
    }

    await addBotMessage(responseKey);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const formatTime = (date: Date) =>
    date.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });

  const chatVariants = {
    hidden: { opacity: 0, scale: 0.85, y: 20, originX: 0, originY: 1 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: "spring" as any, damping: 22, stiffness: 300 },
    },
    exit: {
      opacity: 0,
      scale: 0.88,
      y: 16,
      transition: { duration: 0.2, ease: "easeIn" },
    },
  };

  const buttonVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.07 },
    tap: { scale: 0.95 },
  };

  if (!mounted) return null;

  return (
    <div className="fixed bottom-6 left-6 z-[9990] flex flex-col items-start gap-3">
      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="rounded-2xl overflow-hidden flex flex-col"
            style={{
              width: 320,
              height: isMinimized ? "auto" : 430,
              background: "#ffffff",
              boxShadow: "0 20px 60px rgba(0,0,0,0.18), 0 4px 20px rgba(13,148,136,0.15)",
              border: "1px solid rgba(13,148,136,0.15)",
            }}
            variants={chatVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-4 py-3 shrink-0"
              style={{
                background: "linear-gradient(135deg, #0d9488 0%, #0f766e 60%, #115e59 100%)",
              }}
            >
              <div className="flex items-center gap-2.5">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: "rgba(255,255,255,0.15)" }}
                >
                  <ToothSVG size={18} />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm leading-none mb-0.5">
                    SmileCraft AI
                  </p>
                  <div className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-xs" style={{ color: "rgba(255,255,255,0.75)" }}>
                      Online • Usually replies instantly
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setIsMinimized((v) => !v)}
                  className="p-1.5 rounded-lg transition-colors duration-150"
                  style={{ color: "rgba(255,255,255,0.8)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.12)")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                  aria-label={isMinimized ? "Expand chat" : "Minimize chat"}
                >
                  <ChevronDown
                    size={16}
                    style={{
                      transform: isMinimized ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 0.2s ease",
                    }}
                  />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg transition-colors duration-150"
                  style={{ color: "rgba(255,255,255,0.8)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.12)")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                  aria-label="Close chat"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            <AnimatePresence>
              {!isMinimized && (
                <motion.div
                  className="flex flex-col flex-1 overflow-hidden"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1, transition: { duration: 0.25 } }}
                  exit={{ height: 0, opacity: 0, transition: { duration: 0.2 } }}
                >
                  {/* Messages area */}
                  <div
                    className="flex-1 overflow-y-auto px-3 py-3 space-y-2"
                    style={{ minHeight: 0, maxHeight: 260 }}
                  >
                    {messages.map((msg) => (
                      <motion.div
                        key={msg.id}
                        className={`flex items-end gap-2 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        {/* Avatar */}
                        <div
                          className="w-6 h-6 rounded-full flex items-center justify-center shrink-0"
                          style={{
                            background:
                              msg.role === "bot"
                                ? "linear-gradient(135deg, #0d9488, #0f766e)"
                                : "linear-gradient(135deg, #3b82f6, #2563eb)",
                          }}
                        >
                          {msg.role === "bot" ? (
                            <Bot size={12} className="text-white" />
                          ) : (
                            <User size={12} className="text-white" />
                          )}
                        </div>

                        {/* Bubble */}
                        <div className={`flex flex-col gap-0.5 max-w-[75%] ${msg.role === "user" ? "items-end" : "items-start"}`}>
                          <div
                            className="px-3 py-2 rounded-2xl text-xs leading-relaxed whitespace-pre-line"
                            style={{
                              background:
                                msg.role === "bot" ? "#f1f5f9" : "linear-gradient(135deg, #0d9488, #0f766e)",
                              color: msg.role === "bot" ? "#0f172a" : "white",
                              borderRadius:
                                msg.role === "bot"
                                  ? "4px 16px 16px 16px"
                                  : "16px 4px 16px 16px",
                            }}
                          >
                            {msg.text}
                          </div>
                          <span className="text-[10px]" style={{ color: "#94a3b8" }}>
                            {formatTime(msg.timestamp)}
                          </span>
                        </div>
                      </motion.div>
                    ))}

                    {/* Typing indicator */}
                    <AnimatePresence>
                      {isTyping && (
                        <motion.div
                          className="flex items-end gap-2"
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 4 }}
                        >
                          <div
                            className="w-6 h-6 rounded-full flex items-center justify-center shrink-0"
                            style={{ background: "linear-gradient(135deg, #0d9488, #0f766e)" }}
                          >
                            <Bot size={12} className="text-white" />
                          </div>
                          <TypingIndicator />
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div ref={messagesEndRef} />
                  </div>

                  {/* Quick replies */}
                  {messages.length <= 2 && !isTyping && (
                    <div className="px-3 pb-2">
                      <p className="text-[10px] font-medium mb-1.5" style={{ color: "#94a3b8" }}>
                        Quick replies:
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {QUICK_REPLIES.map((qr) => (
                          <motion.button
                            key={qr.key}
                            onClick={() => handleQuickReply(qr.key, qr.label)}
                            className="text-[11px] px-2.5 py-1.5 rounded-full font-medium transition-all duration-150"
                            style={{
                              background: "rgba(13,148,136,0.08)",
                              color: "#0d9488",
                              border: "1px solid rgba(13,148,136,0.2)",
                            }}
                            whileHover={{
                              background: "rgba(13,148,136,0.15)",
                              scale: 1.03,
                            }}
                            whileTap={{ scale: 0.97 }}
                          >
                            {qr.label}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Input area */}
                  <div
                    className="flex items-center gap-2 px-3 py-2.5 shrink-0"
                    style={{ borderTop: "1px solid #e2e8f0" }}
                  >
                    <input
                      ref={inputRef}
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Type a message..."
                      className="flex-1 text-xs outline-none bg-transparent"
                      style={{ color: "#0f172a", fontFamily: "inherit" }}
                      disabled={isTyping}
                    />
                    <motion.button
                      onClick={handleSend}
                      disabled={!inputValue.trim() || isTyping}
                      className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-150"
                      style={{
                        background:
                          inputValue.trim() && !isTyping
                            ? "linear-gradient(135deg, #0d9488, #0f766e)"
                            : "#e2e8f0",
                        color: inputValue.trim() && !isTyping ? "white" : "#94a3b8",
                      }}
                      whileHover={{ scale: inputValue.trim() && !isTyping ? 1.1 : 1 }}
                      whileTap={{ scale: inputValue.trim() && !isTyping ? 0.92 : 1 }}
                      aria-label="Send message"
                    >
                      <Send size={13} />
                    </motion.button>
                  </div>

                  {/* Footer */}
                  <div
                    className="px-3 py-1.5 text-center shrink-0"
                    style={{ background: "#f8fafc", borderTop: "1px solid #f1f5f9" }}
                  >
                    <span className="text-[10px]" style={{ color: "#cbd5e1" }}>
                      Powered by SmileCraft AI · Not a substitute for medical advice
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Trigger Button */}
      <div className="relative">
        {/* Pulse ring when closed */}
        {!isOpen && (
          <div
            className="absolute inset-0 rounded-full animate-ping"
            style={{ background: "rgba(13,148,136,0.3)", animationDuration: "2s" }}
          />
        )}

        <motion.button
          onClick={() => setIsOpen((v) => !v)}
          className="relative flex items-center gap-2.5 rounded-full px-4 py-3 text-white font-semibold text-sm shadow-lg"
          style={{
            background: "linear-gradient(135deg, #0d9488 0%, #3b82f6 100%)",
            boxShadow: "0 8px 30px rgba(13,148,136,0.45)",
          }}
          variants={buttonVariants}
          initial="rest"
          whileHover="hover"
          whileTap="tap"
          aria-label="Open AI chat assistant"
        >
          <div className="w-7 h-7 shrink-0">
            <ToothSVG size={28} />
          </div>
          <AnimatePresence mode="wait">
            {!isOpen ? (
              <motion.span
                key="label"
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto", transition: { delay: 0.1 } }}
                exit={{ opacity: 0, width: 0 }}
                className="overflow-hidden whitespace-nowrap"
              >
                AI Assistant
              </motion.span>
            ) : (
              <motion.span
                key="close"
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto", transition: { delay: 0.05 } }}
                exit={{ opacity: 0, width: 0 }}
                className="overflow-hidden whitespace-nowrap"
              >
                Close Chat
              </motion.span>
            )}
          </AnimatePresence>
          {/* Online indicator */}
          <div className="flex items-center gap-1 shrink-0">
            <Wifi size={12} style={{ color: "rgba(255,255,255,0.7)" }} />
          </div>
        </motion.button>
      </div>
    </div>
  );
}
