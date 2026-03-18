import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface VaultItemProps {
  index: number;
  title: string;
  medium: string;
  year: string;
  media?: { type: "image" | "video"; src: string };
  text?: string;
  link?: string;
  secondaryMedia?: { type: "image" | "video"; src: string };
}

const VaultItem = ({ index, title, medium, year, media, text, link, secondaryMedia }: VaultItemProps) => {
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
              {media && text ? (
                <div className="flex gap-6 items-start">
                  <div className="shrink-0 w-48 md:w-64">
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
                      <img src={media.src} alt={title} className="w-full h-auto" />
                    )}
                  </div>
                  {secondaryMedia && (
                    <div className="shrink-0 w-48 md:w-64">
                      {secondaryMedia.type === "video" ? (
                        <video
                          className="w-full h-auto"
                          src={secondaryMedia.src}
                          autoPlay
                          loop
                          muted
                          playsInline
                        />
                      ) : (
                        <img src={secondaryMedia.src} alt="" className="w-full h-auto" />
                      )}
                    </div>
                  )}
                  <p className="font-mono text-xs md:text-sm leading-relaxed whitespace-pre-line text-muted-foreground">
                    {text}
                  </p>
                </div>
              ) : (
                <>
                  {media && (
                    <div className="mb-5 w-48 md:w-64">
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
                        <img src={media.src} alt={title} className="w-full h-auto" />
                      )}
                    </div>
                  )}
                  {text && (
                    <p className="font-mono text-xs md:text-sm leading-relaxed whitespace-pre-line max-w-2xl text-muted-foreground">
                      {text}
                    </p>
                  )}
                </>
              )}
{link && (
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-4 font-mono text-xs text-muted-foreground hover:text-accent transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Substack icon */}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z"/>
                  </svg>
                  Read on Substack
                </a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VaultItem;
