import { AnimatePresence, motion } from "framer-motion";
import { Maximize2, Minimize2, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useSession } from "@/contexts/SessionContext";

type Message = {
  role: "user" | "bot";
  content: string;
};

const CHAT_ENDPOINT = "https://nbchatbotserver.azurewebsites.net/chat";
const STORAGE_KEY = "navya_chat_messages";

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

  const handleToggle = () => setIsOpen((v) => !v);

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
            className="fixed bottom-24 right-4 z-50 flex w-[90vw] flex-col border-2 border-ink bg-paper shadow-[6px_6px_0_0_hsl(var(--ink))] md:bottom-28 md:right-10"
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
            <div className="flex items-center justify-between bg-ink px-4 py-3 text-paper">
              <span className="text-xs font-bold uppercase tracking-[0.2em]">
                Navya.AI
              </span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsExpanded((v) => !v)}
                  aria-label={isExpanded ? "Collapse chat" : "Expand chat"}
                  className="transition-colors hover:text-accent"
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
                  className="transition-colors hover:text-accent"
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
                        ? "bg-ink text-paper"
                        : "border-2 border-ink border-l-[6px] border-l-accent"
                    }`}
                  >
                    <span className="mb-1 block text-[10px] font-bold uppercase tracking-widest opacity-60">
                      {msg.role === "user" ? "You" : "Navya.AI"}
                    </span>
                    <p className="leading-snug">{msg.content}</p>
                  </div>
                </motion.div>
              ))}

              {loading && (
                <motion.div
                  className="flex justify-start"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="border-2 border-ink border-l-[6px] border-l-accent px-3 py-2">
                    <span className="mb-1 block text-[10px] font-bold uppercase tracking-widest opacity-60">
                      Navya.AI
                    </span>
                    <p className="text-sm opacity-70">Thinking…</p>
                  </div>
                </motion.div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="flex gap-2 border-t-2 border-ink p-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Type your message..."
                className="flex-1 border-2 border-ink bg-paper px-3 py-2 text-sm placeholder:text-muted-foreground focus:border-accent focus:outline-none"
              />
              <button
                onClick={handleSend}
                disabled={loading}
                aria-label="Send message"
                className="border-2 border-ink bg-ink px-3 text-xs font-bold uppercase tracking-widest text-paper transition-colors hover:border-accent hover:bg-accent disabled:opacity-40"
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
        className="fixed bottom-6 right-4 z-50 flex h-14 min-w-[7.5rem] items-center justify-center gap-2 rounded-full border-2 border-ink bg-ink px-7 text-paper shadow-[4px_4px_0_0_hsl(var(--accent))] md:bottom-10 md:right-10"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        whileHover={{ x: -2, y: -2 }}
        whileTap={{ scale: 0.96 }}
      >
        {isOpen ? (
          <>
            <X className="h-4 w-4" strokeWidth={2.5} />
            <span className="text-sm font-bold uppercase tracking-[0.15em]">Close</span>
          </>
        ) : (
          <span className="text-sm font-bold uppercase tracking-[0.15em]">Chat</span>
        )}
      </motion.button>
    </>
  );
};

export default ChatWidget;
