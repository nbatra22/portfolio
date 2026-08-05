import { AnimatePresence, motion } from "framer-motion";
import { Maximize2, MessageCircle, Minimize2, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useSession } from "@/contexts/SessionContext";

type Message = {
  role: "user" | "bot";
  content: string;
};

const CHAT_ENDPOINT = "https://nbchatbotserver.azurewebsites.net/chat";
const STORAGE_KEY = "navya_chat_messages";
const INTERACTED_KEY = "navya_chat_interacted";

const defaultMessages: Message[] = [
  {
    role: "bot",
    content:
      "Welcome to Navya's portfolio. I'm a chatbot designed to help you navigate the page and learn a bit more about Navya. Ask a question and learn more about her design process, her projects, and more:)",
  },
];

const ChatWidget = () => {
  const { sessionId } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  // Pulse is just meant to draw a first click — once the user has ever
  // opened the chat, it's served its purpose and stays off permanently
  // (persisted per session, same as the message history below).
  const [hasInteracted, setHasInteracted] = useState(() => {
    try {
      return sessionStorage.getItem(INTERACTED_KEY) === "true";
    } catch {
      return false;
    }
  });

  const handleToggle = () => {
    setIsOpen((v) => !v);
    if (!hasInteracted) {
      setHasInteracted(true);
      try {
        sessionStorage.setItem(INTERACTED_KEY, "true");
      } catch {
        // ignore
      }
    }
  };

  const [messages, setMessages] = useState<Message[]>(() => {
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : defaultMessages;
    } catch {
      return defaultMessages;
    }
  });
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    fetch("https://nbchatbotserver.azurewebsites.net/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: ["ping"] }),
    }).catch(() => {});
  }, []);

  const handleSend = async () => {
    if (!input.trim() || loading || !sessionId) return;

    const userMessage = input;
    setInput("");

    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setLoading(true);

    try {
      const res = await fetch(CHAT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: userMessage,
          sessionId: sessionId,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to fetch response");
      }

      const data = await res.json();
      const reply = data.text || "Sorry — I didn't quite understand that.";

      setMessages((prev) => [...prev, { role: "bot", content: reply }]);
    } catch (err) {
      console.error("Chat error:", err);
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          content: "⚠️ Trouble connecting to the AI server.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 right-6 z-50 flex w-[90vw] flex-col border border-white/10 bg-[#0c0d12]/95 backdrop-blur-md md:bottom-28 md:right-10"
            style={{ transformOrigin: "bottom right" }}
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              width: isExpanded ? "min(90vw, 32rem)" : "min(90vw, 24rem)",
              height: isExpanded ? "min(85vh, 42rem)" : "28rem",
            }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
              <span className="font-nav text-xs uppercase tracking-[0.2em] text-foreground/80">
                Navya.AI
              </span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsExpanded((v) => !v)}
                  aria-label={isExpanded ? "Collapse chat" : "Expand chat"}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  {isExpanded ? (
                    <Minimize2 className="h-3.5 w-3.5" />
                  ) : (
                    <Maximize2 className="h-3.5 w-3.5" />
                  )}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  aria-label="Close chat"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 space-y-3 overflow-y-auto p-4">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  className={`flex ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div
                    className={`max-w-[85%] px-3 py-2 text-sm ${
                      msg.role === "user"
                        ? "bg-foreground/10 text-foreground"
                        : "border-l-2 border-accent bg-white/[0.03] text-foreground/90"
                    }`}
                  >
                    <span className="font-nav block mb-1 text-[10px] uppercase tracking-widest opacity-50">
                      {msg.role === "user" ? "You" : "Navya.AI"}
                    </span>
                    <p className="font-nav leading-relaxed">{msg.content}</p>
                  </div>
                </motion.div>
              ))}

              {loading && (
                <motion.div
                  className="flex justify-start"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="border-l-2 border-accent bg-white/[0.03] px-3 py-2">
                    <span className="font-nav block mb-1 text-[10px] uppercase tracking-widest opacity-50">
                      Navya.AI
                    </span>
                    <p className="font-nav text-sm opacity-70">Thinking…</p>
                  </div>
                </motion.div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="flex gap-2 border-t border-white/10 p-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Type your message..."
                className="font-nav flex-1 border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent/50"
              />
              <button
                onClick={handleSend}
                disabled={loading}
                aria-label="Send message"
                className="font-nav border border-white/15 px-3 text-xs uppercase tracking-widest text-foreground/80 transition-colors hover:border-accent/60 hover:text-accent disabled:opacity-40"
              >
                Send
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={handleToggle}
        aria-label={isOpen ? "Close chat" : "Chat with my AI"}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full border border-white/15 bg-[#0c0d12]/80 backdrop-blur-sm md:bottom-10 md:right-10"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        whileHover={{
          scale: 1.08,
          borderColor: "hsl(var(--accent) / 0.6)",
          boxShadow: "0 0 24px hsl(var(--accent) / 0.35)",
        }}
        whileTap={{ scale: 0.96 }}
      >
        {!isOpen && !hasInteracted && (
          <>
            {/* Two staggered rings pinging outward — a continuous radar-style
                pulse rather than a single subtle blip, to actually draw the
                eye and read as an action item worth clicking. Stops for good
                once the user has ever opened the chat (handleToggle). */}
            <motion.div
              className="pointer-events-none absolute inset-0 rounded-full border-2 border-white/70"
              animate={{ scale: [1, 1.7], opacity: [0.7, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
            />
            <motion.div
              className="pointer-events-none absolute inset-0 rounded-full border-2 border-white/70"
              animate={{ scale: [1, 1.7], opacity: [0.7, 0] }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                ease: "easeOut",
                delay: 1.1,
              }}
            />
          </>
        )}
        {isOpen ? (
          <X className="h-5 w-5 text-foreground/80" strokeWidth={1.5} />
        ) : (
          <MessageCircle className="h-5 w-5 text-foreground/80" strokeWidth={1.5} />
        )}
      </motion.button>
    </>
  );
};

export default ChatWidget;
