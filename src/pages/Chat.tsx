import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import Navigation from "@/components/Navigation";
import GlitchText from "@/components/GlitchText";
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
      "Hey! I'm Navya's AI assistant. Ask me about her work, creative process, or just say hi.",
  },
];

const Chat = () => {
  const { sessionId } = useSession();

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
          sessionId: sessionId
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to fetch response");
      }

      const data = await res.json();
      const reply =
        data.text || "Sorry — I didn't quite understand that.";

      setMessages((prev) => [
        ...prev,
        { role: "bot", content: reply },
      ]);
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
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />

      <main className="flex-1 pt-24 md:pt-32 pb-6 flex flex-col">
        <div className="container mx-auto px-4 md:px-8 flex-1 flex flex-col max-w-3xl">
          {/* Header */}
          <motion.header
            className="mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <GlitchText
              text="CHAT WITH AI"
              className="text-4xl md:text-6xl"
            />
            <p className="font-mono text-muted-foreground mt-3 text-sm">
              // REAL-TIME AI CONVERSATION
            </p>
          </motion.header>

          {/* Chat area */}
          <div className="h-[calc(100vh-380px)] min-h-[200px] border-brutal bg-card p-4 md:p-6 overflow-y-auto mb-4 space-y-4">
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                className={`flex ${
                  msg.role === "user"
                    ? "justify-end"
                    : "justify-start"
                }`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div
                  className={`max-w-[80%] p-4 ${
                    msg.role === "user"
                      ? "bg-accent text-primary-foreground"
                      : "bg-secondary border-l-2 border-accent"
                  }`}
                >
                  <span className="font-mono text-xs block mb-1 opacity-60">
                    {msg.role === "user" ? "YOU" : "NAVYA.AI"}
                  </span>
                  <p className="font-mono text-sm">{msg.content}</p>
                </div>
              </motion.div>
            ))}

            {/* Typing indicator */}
            {loading && (
              <motion.div
                className="flex justify-start"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="bg-secondary border-l-2 border-accent p-4">
                  <span className="font-mono text-xs block mb-1 opacity-60">
                    NAVYA.AI
                  </span>
                  <p className="font-mono text-sm opacity-70">
                    Thinking…
                  </p>
                </div>
              </motion.div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" && handleSend()
              }
              placeholder="Type your message..."
              className="flex-1 bg-secondary border-brutal p-4 font-mono text-sm focus:outline-none focus:border-accent placeholder:text-muted-foreground"
            />
            <motion.button
              onClick={handleSend}
              disabled={loading}
              className="bg-foreground text-background px-6 py-4 font-display text-lg border-brutal hover:bg-accent hover:text-foreground transition-colors disabled:opacity-50"
              whileHover={{ x: 2, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              SEND →
            </motion.button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Chat;
