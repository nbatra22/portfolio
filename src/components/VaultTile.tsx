import { motion } from "framer-motion";
import { useState } from "react";

export interface VaultTileData {
  title: string;
  medium: string;
  year: string;
  text?: string;
  link?: string;
  media?: { type: "image" | "video"; src: string };
}

const VaultTile = ({ item, index }: { item: VaultTileData; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);

  const inner = (
    <motion.div
      className="group relative aspect-[4/5] overflow-hidden border border-white/10 bg-white/[0.02]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.4, delay: index * 0.04 }}
    >
      {item.media ? (
        item.media.type === "video" ? (
          <video
            className="h-full w-full object-cover transition-all duration-500 grayscale-[0.4] group-hover:scale-105 group-hover:grayscale-0"
            src={item.media.src}
            autoPlay
            loop
            muted
            playsInline
          />
        ) : (
          <img
            src={item.media.src}
            alt={item.title}
            className="h-full w-full object-cover transition-all duration-500 grayscale-[0.4] group-hover:scale-105 group-hover:grayscale-0"
          />
        )
      ) : (
        <div className="flex h-full w-full items-center justify-center p-6 transition-colors duration-500 group-hover:bg-white/[0.03]">
          <span className="font-nav text-center text-sm uppercase tracking-[0.2em] text-muted-foreground/50">
            {item.title}
          </span>
        </div>
      )}

      {/* Corner index / year, always visible */}
      <div className="pointer-events-none absolute top-3 left-3 right-3 flex items-center justify-between">
        <span className="font-nav text-[10px] text-foreground/70">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="font-nav text-[10px] uppercase tracking-widest text-foreground/70">
          {item.year}
        </span>
      </div>

      {/* Hover explanation overlay */}
      <motion.div
        className="pointer-events-none absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-[#08090d] via-[#08090d]/80 to-transparent p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.25 }}
      >
        <span className="font-nav text-[10px] uppercase tracking-[0.2em] text-accent">
          {item.medium}
        </span>
        <h3 className="font-nav mt-1 text-sm uppercase tracking-wide text-foreground">
          {item.title}
        </h3>
        {item.text && (
          <p className="font-nav mt-2 line-clamp-4 text-xs leading-relaxed text-muted-foreground">
            {item.text}
          </p>
        )}
        {item.link && (
          <span className="font-nav mt-2 text-[10px] uppercase tracking-[0.2em] text-foreground/60">
            View →
          </span>
        )}
      </motion.div>
    </motion.div>
  );

  if (!item.link) return inner;

  return (
    <a href={item.link} target="_blank" rel="noopener noreferrer" className="block">
      {inner}
    </a>
  );
};

export default VaultTile;
