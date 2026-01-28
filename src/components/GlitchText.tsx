import { motion } from "framer-motion";

interface GlitchTextProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "span";
}

const GlitchText = ({ text, className = "", as: Tag = "h1" }: GlitchTextProps) => {
  return (
    <motion.div 
      className={`relative inline-block ${className}`}
      whileHover="glitch"
    >
      <Tag className="font-display relative">
        {text}
        <motion.span
          className="absolute inset-0 text-accent"
          variants={{
            glitch: {
              x: [0, -2, 2, -1, 0],
              opacity: [0, 1, 0, 1, 0],
            }
          }}
          transition={{ duration: 0.3, repeat: Infinity }}
          aria-hidden
        >
          {text}
        </motion.span>
        <motion.span
          className="absolute inset-0"
          style={{ color: "hsl(180 75% 55%)" }}
          variants={{
            glitch: {
              x: [0, 2, -2, 1, 0],
              opacity: [0, 0.5, 0, 0.5, 0],
            }
          }}
          transition={{ duration: 0.3, repeat: Infinity, delay: 0.05 }}
          aria-hidden
        >
          {text}
        </motion.span>
      </Tag>
    </motion.div>
  );
};

export default GlitchText;