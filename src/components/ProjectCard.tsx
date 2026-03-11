import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";

interface ProjectCardProps {
  title: string;
  description: string;
  category: string;
  link: string;
  featured?: boolean;
  thumbnail?: string;
  video?: string;
}

const ProjectCard = ({ title, description, category, link, featured = false, thumbnail, video }: ProjectCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const isExternalLink = link.startsWith('http://') || link.startsWith('https://');

  const cardContent = (
    <motion.article
      className="relative border-brutal bg-card overflow-hidden cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{
        x: 4,
        y: -4,
        boxShadow: "6px 6px 0px hsl(var(--foreground))"
      }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
        {/* Preview area - only for featured projects */}
        {featured && (
          <div className="relative bg-secondary h-80 md:h-[28rem]">
            {video ? (
              <video
                src={video}
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : thumbnail ? (
              <img
                src={thumbnail}
                alt={title}
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : (
              <div className="absolute inset-0 opacity-20">
                <div className="absolute inset-0" style={{
                  backgroundImage: `repeating-linear-gradient(
                    45deg,
                    transparent,
                    transparent 10px,
                    hsl(var(--muted-foreground) / 0.1) 10px,
                    hsl(var(--muted-foreground) / 0.1) 20px
                  )`
                }} />
              </div>
            )}

            {/* Category tag */}
            <motion.span
              className="absolute top-3 left-3 font-mono text-xs uppercase tracking-widest bg-background px-2 py-1 border-brutal z-10"
              animate={{
                backgroundColor: isHovered ? "hsl(var(--accent))" : "hsl(var(--background))",
                color: isHovered ? "hsl(var(--background))" : "hsl(var(--foreground))"
              }}
            >
              {category}
            </motion.span>
          </div>
        )}

        {/* Content */}
        <div className={`${featured ? "p-5 md:p-6" : "p-4 md:p-6"}`}>
          {/* Category tag for non-featured projects */}
          {!featured && (
            <motion.span
              className="inline-block font-mono text-xs uppercase tracking-widest bg-secondary px-2 py-1 border-brutal mb-3"
              animate={{
                backgroundColor: isHovered ? "hsl(var(--accent))" : "hsl(var(--secondary))",
                color: isHovered ? "hsl(var(--background))" : "hsl(var(--foreground))"
              }}
            >
              {category}
            </motion.span>
          )}
          <h3 className={`font-display ${featured ? "text-2xl md:text-4xl" : "text-2xl md:text-3xl"}`}>
            {title}
          </h3>
          <motion.p
            className="font-mono text-sm text-muted-foreground mt-2 line-clamp-2"
            animate={{ opacity: isHovered ? 1 : 0.7 }}
          >
            {description}
          </motion.p>
        </div>

        {/* Scanlines on hover */}
        {isHovered && <div className="absolute inset-0 scanlines pointer-events-none" />}
    </motion.article>
  );

  return isExternalLink ? (
    <a href={link} target="_blank" rel="noopener noreferrer">
      {cardContent}
    </a>
  ) : (
    <Link to={link}>
      {cardContent}
    </Link>
  );
};

export default ProjectCard;