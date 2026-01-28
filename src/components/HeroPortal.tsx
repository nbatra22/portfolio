import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";

interface HeroPortalProps {
  title: string;
  subtitle: string;
  link: string;
  index: number;
}

const HeroPortal = ({ title, subtitle, link, index }: HeroPortalProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link to={link}>
      <motion.div
        className="relative border-brutal bg-card p-6 md:p-8 cursor-pointer overflow-hidden group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.15, duration: 0.5 }}
        whileHover={{ 
          x: 4, 
          y: -4,
          boxShadow: "8px 8px 0px hsl(var(--accent))"
        }}
      >
        {/* Scanline overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 scanlines" />
        
        {/* Index number */}
        <motion.span 
          className="absolute top-2 right-3 font-display text-6xl md:text-8xl text-muted-foreground/20 select-none"
          animate={{ 
            opacity: isHovered ? 0.4 : 0.1,
            scale: isHovered ? 1.1 : 1
          }}
        >
          0{index + 1}
        </motion.span>

        {/* Content */}
        <div className="relative z-10">
          <motion.h2 
            className="font-display text-4xl md:text-6xl lg:text-7xl tracking-tight"
            animate={{ 
              color: isHovered ? "hsl(var(--accent))" : "hsl(var(--foreground))"
            }}
            transition={{ duration: 0.2 }}
          >
            {title}
          </motion.h2>
          
          <motion.p 
            className="font-mono text-sm text-muted-foreground mt-3 max-w-xs"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: isHovered ? 1 : 0.6, x: isHovered ? 0 : -10 }}
          >
            {subtitle}
          </motion.p>

          {/* Arrow indicator */}
          <motion.div 
            className="mt-6 flex items-center gap-2 font-mono text-xs uppercase tracking-widest"
            animate={{ x: isHovered ? 10 : 0 }}
          >
            <span className="text-accent">→</span>
            <span>Enter</span>
          </motion.div>
        </div>

        {/* Glitch effect on hover */}
        {isHovered && (
          <motion.div 
            className="absolute inset-0 bg-accent/5"
            animate={{ opacity: [0, 0.1, 0, 0.05, 0] }}
            transition={{ duration: 0.3, repeat: Infinity }}
          />
        )}
      </motion.div>
    </Link>
  );
};

export default HeroPortal;