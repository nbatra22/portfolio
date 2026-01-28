import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface VaultItemProps {
  title: string;
  medium: string;
  year: string;
  index: number;
  media?: { type: "image" | "video"; src: string };
}

const VaultItem = ({ title, medium, year, index, media }: VaultItemProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative aspect-square border-brutal bg-secondary cursor-pointer overflow-hidden group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ scale: 1.02 }}
    >
      {/* Media or grid pattern background */}
      {media ? (
        media.type === "video" ? (
          <video
            className="absolute inset-0 w-full h-full object-cover"
            src={media.src}
            autoPlay
            loop
            muted
            playsInline
          />
        ) : (
          <img
            className="absolute inset-0 w-full h-full object-cover"
            src={media.src}
            alt={title}
          />
        )
      ) : (
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `
            linear-gradient(hsl(var(--muted-foreground) / 0.1) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--muted-foreground) / 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px'
        }} />
      )}

      {/* Index number */}
      <span className="absolute top-2 left-2 font-mono text-xs text-muted-foreground">
        {String(index + 1).padStart(2, '0')}
      </span>

      {/* Hover caption overlay */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="absolute inset-0 bg-background/95 p-4 flex flex-col justify-end"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
          >
            <h4 className="font-display text-xl md:text-2xl">{title}</h4>
            <div className="flex justify-between items-end mt-2">
              <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider">
                {medium}
              </span>
              <span className="font-mono text-xs text-accent">{year}</span>
            </div>
            
            {/* View indicator */}
            <motion.div 
              className="absolute top-4 right-4 w-8 h-8 border-brutal flex items-center justify-center"
              initial={{ rotate: 0 }}
              animate={{ rotate: 45 }}
            >
              <span className="text-sm">→</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Glitch flash */}
      {isHovered && (
        <motion.div
          className="absolute inset-0 bg-accent/20 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.3, 0] }}
          transition={{ duration: 0.15 }}
        />
      )}
    </motion.div>
  );
};

export default VaultItem;