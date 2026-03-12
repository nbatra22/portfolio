import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface VaultItemProps {
  index: number;
  title: string;
  medium: string;
  year: string;
  media?: { type: "image" | "video"; src: string };
  text?: string;
}

const VaultItem = ({ index, title, medium, year, media, text }: VaultItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-t border-foreground/20">
      <button
        className="w-full flex items-baseline justify-between py-4 gap-6 text-left group"
        onClick={() => setIsOpen((v) => !v)}
      >
        <div className="flex items-baseline gap-5 min-w-0">
          <span className="font-mono text-xs text-muted-foreground shrink-0">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="font-mono text-sm md:text-base uppercase tracking-wide truncate group-hover:text-accent transition-colors">
            {title}
          </span>
        </div>
        <div className="flex items-baseline gap-5 shrink-0">
          <span className="font-mono text-xs text-muted-foreground hidden sm:block uppercase tracking-widest">
            {medium}
          </span>
          <span className="font-mono text-xs text-muted-foreground">
            {year}
          </span>
          <span className="font-mono text-sm text-muted-foreground group-hover:text-foreground transition-colors">
            {isOpen ? "−" : "+"}
          </span>
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="pb-8 pl-10">
              {media && (
                <div className="mb-5 max-w-lg">
                  {media.type === "video" ? (
                    <video
                      className="w-full h-auto"
                      src={media.src}
                      autoPlay
                      loop
                      muted
                      playsInline
                    />
                  ) : (
                    <img
                      src={media.src}
                      alt={title}
                      className="w-full h-auto"
                    />
                  )}
                </div>
              )}
              {text && (
                <p className="font-mono text-xs md:text-sm leading-relaxed whitespace-pre-line max-w-2xl text-muted-foreground">
                  {text}
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VaultItem;
