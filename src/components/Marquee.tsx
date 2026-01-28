import { motion } from "framer-motion";

interface MarqueeProps {
  text: string;
  speed?: number;
  className?: string;
}

const Marquee = ({ text, speed = 20, className = "" }: MarqueeProps) => {
  const items = Array(4).fill(text);

  return (
    <div className={`overflow-hidden border-y border-border py-3 ${className}`}>
      <motion.div 
        className="flex whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ 
          duration: speed, 
          repeat: Infinity, 
          ease: "linear" 
        }}
      >
        {items.map((item, i) => (
          <span 
            key={i} 
            className="font-display text-4xl md:text-6xl mx-8 text-muted-foreground/40"
          >
            {item}
            <span className="mx-8 text-accent">✦</span>
          </span>
        ))}
        {items.map((item, i) => (
          <span 
            key={`dup-${i}`} 
            className="font-display text-4xl md:text-6xl mx-8 text-muted-foreground/40"
          >
            {item}
            <span className="mx-8 text-accent">✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
};

export default Marquee;