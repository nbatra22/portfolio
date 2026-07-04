import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export interface ProjectMedia {
  type: "image" | "video";
  src: string;
}

export interface WorkProject {
  title: string;
  date: string;
  category: string;
  description: string;
  link?: string;
  media: ProjectMedia[];
}

interface WorkProjectRowProps {
  project: WorkProject;
  index: number;
}

const MediaSlot = ({ media, title }: { media?: ProjectMedia; title: string }) => {
  if (!media) {
    return (
      <div className="flex aspect-video items-center justify-center border border-dashed border-white/15 bg-white/[0.02]">
        <span className="font-nav text-[10px] uppercase tracking-[0.2em] text-muted-foreground/50">
          Visual coming soon
        </span>
      </div>
    );
  }

  return (
    <div className="aspect-video overflow-hidden border border-white/10 bg-black/40">
      {media.type === "video" ? (
        <video
          className="h-full w-full object-cover"
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
          className="h-full w-full object-cover"
        />
      )}
    </div>
  );
};

const WorkProjectRow = ({ project, index }: WorkProjectRowProps) => {
  const isExternalLink = project.link?.startsWith("http");
  const [first, second, third] = project.media;

  const content = (
    <div className="grid grid-cols-1 gap-8 border-t border-white/10 py-10 md:grid-cols-2 md:gap-12 md:py-14 group">
      {/* Left: title, date, description */}
      <div className="flex flex-col justify-center">
        <span className="font-nav text-xs text-muted-foreground/60">
          {String(index + 1).padStart(2, "0")} — {project.date}
        </span>
        <h3 className="font-nav mt-3 text-3xl uppercase tracking-tight text-foreground/90 transition-colors group-hover:text-accent md:text-4xl">
          {project.title}
        </h3>
        <span className="font-nav mt-2 text-[11px] uppercase tracking-[0.25em] text-muted-foreground/50">
          {project.category}
        </span>
        <p className="font-nav mt-5 max-w-md text-sm leading-relaxed text-muted-foreground">
          {project.description}
        </p>
        {project.link && (
          <span className="font-nav mt-6 inline-flex w-fit items-center gap-2 text-xs uppercase tracking-[0.2em] text-foreground/70 transition-colors group-hover:text-accent">
            {isExternalLink ? "View Case Study" : "View Project"}
            <span className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </span>
        )}
      </div>

      {/* Right: 2-3 supporting visuals */}
      <div className="grid grid-cols-2 gap-3">
        <div className="col-span-2">
          <MediaSlot media={first} title={project.title} />
        </div>
        <MediaSlot media={second} title={project.title} />
        <MediaSlot media={third} title={project.title} />
      </div>
    </div>
  );

  const wrapperProps = {
    initial: { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.5 },
  };

  if (!project.link) {
    return <motion.div {...wrapperProps}>{content}</motion.div>;
  }

  return isExternalLink ? (
    <motion.a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      className="block"
      {...wrapperProps}
    >
      {content}
    </motion.a>
  ) : (
    <motion.div {...wrapperProps}>
      <Link to={project.link} className="block">
        {content}
      </Link>
    </motion.div>
  );
};

export default WorkProjectRow;
