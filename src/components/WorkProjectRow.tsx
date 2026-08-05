import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { Plus, Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  isSoundActive,
  releaseSound,
  requestSound,
  subscribeSound,
} from "@/lib/mediaSound";
import AudioWaveform from "@/components/AudioWaveform";

export interface ProjectMedia {
  type: "image" | "video" | "audio";
  src: string;
  // Opt-in click-to-unmute (see ProjectVideo). Off by default — only
  // projects that specifically call for interactive sound should set this.
  // Not applicable to "audio" media, which is always click-to-play.
  hasSound?: boolean;
}

export interface WorkSubsection {
  title: string;
  description?: string;
  // Falls back to the parent project's `link` when omitted.
  link?: string;
}

export interface WorkProject {
  title: string;
  date: string;
  category: string;
  description: string;
  link?: string;
  media: ProjectMedia[];
  // Default: first image full-width, remaining up to two as half-width
  // slots (with a placeholder filling any empty slot). "staggered": each
  // image shown at its own natural aspect ratio (nothing cropped), offset
  // vertically from the other — for projects where the whole frame matters.
  // "grid": exactly four items in a 2x2 grid, in DOM order (top-left,
  // top-right, bottom-left, bottom-right) — row width unchanged either way.
  // "row": each image at its own natural aspect ratio (nothing cropped),
  // placed side by side instead of stacked — for projects where all items
  // should be visible together without scrolling.
  layout?: "default" | "staggered" | "grid" | "row";
  // "row"-only: overrides the flat `media` list with explicit columns —
  // each inner array is one column, stacked (see RowMedia for how extra
  // items in a column behave).
  mediaColumns?: ProjectMedia[][];
  // Optional numbered breakdown stacked beneath the row's media/description,
  // in array order — for projects with multiple distinct components worth
  // naming individually.
  subsections?: WorkSubsection[];
}

interface WorkProjectRowProps {
  project: WorkProject;
}

// Plain autoplaying background video, paused (and, if it's the active sound
// source, silenced) via IntersectionObserver once it scrolls out of view.
// When withSound is set, adds click-to-unmute — only one video on the page
// can have sound at once, so unmuting one silences whichever was previously
// playing. Off by default: most project videos are decorative background
// loops with no click affordance at all.
const ProjectVideo = ({
  src,
  className = "",
  videoClassName = "",
  withSound = false,
}: {
  src: string;
  className?: string;
  videoClassName?: string;
  withSound?: boolean;
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasSound, setHasSound] = useState(false);

  useEffect(() => {
    if (!withSound) return;
    const video = videoRef.current;
    if (!video) return;
    return subscribeSound(() => setHasSound(isSoundActive(video)));
  }, [withSound]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
          if (withSound) releaseSound(video);
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [withSound]);

  const videoEl = (
    <video
      ref={videoRef}
      className={videoClassName}
      src={src}
      autoPlay
      loop
      muted
      playsInline
    />
  );

  if (!withSound) {
    return <div className={className}>{videoEl}</div>;
  }

  const toggleSound = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    if (isSoundActive(video)) {
      releaseSound(video);
    } else {
      requestSound(video);
    }
  };

  return (
    <button
      type="button"
      onClick={toggleSound}
      className={`group/video relative block ${className}`}
      aria-label={hasSound ? "Mute video" : "Play video with sound"}
    >
      {videoEl}
      <span className="pointer-events-none absolute bottom-2 right-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/60 text-white opacity-0 backdrop-blur-sm transition-opacity group-hover/video:opacity-100">
        {hasSound ? <Volume2 size={14} /> : <VolumeX size={14} />}
      </span>
    </button>
  );
};

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
    <div
      className={`overflow-hidden border border-white/10 bg-black/40 ${
        media.type === "audio" ? "aspect-[3/1]" : "aspect-video"
      }`}
    >
      {media.type === "video" ? (
        <ProjectVideo
          src={media.src}
          className="h-full w-full"
          videoClassName="h-full w-full object-cover"
          withSound={media.hasSound}
        />
      ) : media.type === "audio" ? (
        <AudioWaveform src={media.src} className="h-full w-full" />
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

// Images shown at their own natural aspect ratio (nothing cropped),
// stacked directly above each other at the same width with a gap between.
const StaggeredMedia = ({ media, title }: { media: ProjectMedia[]; title: string }) => (
  <div className="flex flex-col gap-6">
    {media.map((item) => (
      <div
        key={item.src}
        className="w-[85%] overflow-hidden border border-white/10 bg-black/40"
      >
        {item.type === "video" ? (
          <ProjectVideo
            src={item.src}
            className="w-full"
            videoClassName="h-auto w-full"
            withSound={item.hasSound}
          />
        ) : (
          <img src={item.src} alt={title} className="h-auto w-full" />
        )}
      </div>
    ))}
  </div>
);

// Images shown at their own natural aspect ratio (nothing cropped), placed
// side by side so every item is visible together without scrolling. Each
// entry in `columns` is itself a stack: its first item renders at natural
// aspect ratio, and any further items crop (object-cover) to fill exactly
// whatever height that first item leaves free — sized off the tallest
// column, so adding a stacked item never grows the row itself. Falls back
// to one column per `media` item when `columns` isn't given.
const RowMedia = ({
  media,
  columns,
  title,
}: {
  media: ProjectMedia[];
  columns?: ProjectMedia[][];
  title: string;
}) => {
  const cols = columns ?? media.map((item) => [item]);

  return (
    <div className="flex gap-3">
      {cols.map((col, colIndex) => (
        <div key={colIndex} className="flex min-w-0 flex-1 flex-col gap-3">
          {col.map((item, i) => {
            const fillsRemainder = i > 0;
            return (
              <div
                key={item.src}
                className={`overflow-hidden border border-white/10 bg-black/40 ${
                  fillsRemainder ? "relative min-h-0 flex-1" : ""
                }`}
              >
                {item.type === "video" ? (
                  <ProjectVideo
                    src={item.src}
                    className={fillsRemainder ? "absolute inset-0" : "w-full"}
                    videoClassName={
                      fillsRemainder
                        ? "h-full w-full object-cover"
                        : "h-auto w-full"
                    }
                    withSound={item.hasSound}
                  />
                ) : (
                  <img
                    src={item.src}
                    alt={title}
                    className={
                      fillsRemainder
                        ? "absolute inset-0 h-full w-full object-cover"
                        : "h-auto w-full"
                    }
                  />
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

// Four items laid out as an even 2x2 grid, in DOM order.
const GridMedia = ({ media, title }: { media: ProjectMedia[]; title: string }) => (
  <div className="grid grid-cols-2 gap-3">
    {media.map((item) => (
      <div
        key={item.src}
        className="aspect-video overflow-hidden border border-white/10 bg-black/40"
      >
        {item.type === "video" ? (
          <ProjectVideo
            src={item.src}
            className="h-full w-full"
            videoClassName="h-full w-full object-cover"
            withSound={item.hasSound}
          />
        ) : (
          <img
            src={item.src}
            alt={title}
            className="h-full w-full object-cover"
          />
        )}
      </div>
    ))}
  </div>
);

// One numbered sub-row within a project that has `subsections` — a
// collapsed header (number + title) that expands on click to reveal the
// description and a "View More" link (falling back to the parent
// project's link when the subsection doesn't set its own). No media —
// subsections are text-only.
const SubsectionRow = ({
  subsection,
  index,
  fallbackLink,
}: {
  subsection: WorkSubsection;
  index: number;
  fallbackLink?: string;
}) => {
  const [open, setOpen] = useState(false);
  const link = subsection.link ?? fallbackLink;
  const isExternalLink = link?.startsWith("http");

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="group/sub flex w-full items-center justify-between gap-4 py-6 text-left"
      >
        <span className="flex items-baseline gap-4">
          <span className="font-nav text-xs text-muted-foreground/40">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="font-nav text-lg uppercase tracking-[0.1em] text-foreground/85 transition-colors group-hover/sub:text-accent">
            {subsection.title}
          </span>
        </span>
        <Plus
          size={16}
          className={`shrink-0 text-muted-foreground/50 transition-transform duration-200 ${
            open ? "rotate-45" : ""
          }`}
        />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="pb-6 pl-[2.25rem]">
              {subsection.description && (
                <p className="font-nav max-w-md text-xs leading-relaxed text-muted-foreground">
                  {subsection.description}
                </p>
              )}
              {link &&
                (isExternalLink ? (
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-nav mt-4 inline-flex w-fit items-center gap-2 text-xs uppercase tracking-[0.2em] text-foreground/70 transition-colors hover:text-accent"
                  >
                    View More
                    <span className="transition-transform group-hover/sub:translate-x-1">
                      →
                    </span>
                  </a>
                ) : (
                  <Link
                    to={link}
                    className="font-nav mt-4 inline-flex w-fit items-center gap-2 text-xs uppercase tracking-[0.2em] text-foreground/70 transition-colors hover:text-accent"
                  >
                    View More
                    <span className="transition-transform group-hover/sub:translate-x-1">
                      →
                    </span>
                  </Link>
                ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const WorkProjectRow = ({ project }: WorkProjectRowProps) => {
  const hasSubsections = !!project.subsections;
  const isExternalLink = project.link?.startsWith("http");
  const [first, second, third] = project.media;
  const rowRef = useRef<HTMLDivElement>(null);

  // Fades each row in as it approaches the center of the viewport while
  // scrolling, and back out as it moves toward the top or bottom edge —
  // a continuous, reversible focus effect rather than a one-time reveal.
  const { scrollYProgress } = useScroll({
    target: rowRef,
    offset: ["start end", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.5, 0.85, 1], [0, 1, 0, 0]);

  // The opacity fade lives on an inner element, not the row's own outer
  // box: an element with animated opacity gets its own compositing layer,
  // and browsers can paint that layer above an unrelated position:sticky
  // sibling (like the section caption) regardless of z-index — a real,
  // reproducible Chromium stacking bug, not just a lint nitpick. Keeping
  // the outer box plain (no transform/opacity) means it never competes
  // for stacking against the caption in the first place.
  const content = (
    <div
      ref={rowRef}
      className="border-t border-white/10 py-10 md:py-14 group"
    >
      <motion.div
        style={{ opacity }}
        className={`grid grid-cols-1 gap-8 ${
          hasSubsections ? "" : "md:grid-cols-2 md:gap-12"
        }`}
      >
        {/* Left: title, date, description */}
        <div className="flex flex-col justify-center">
          <span className="font-nav text-xs text-muted-foreground/60">
            {project.date}
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
          {project.link && !hasSubsections && (
            <span className="font-nav mt-6 inline-flex w-fit items-center gap-2 text-xs uppercase tracking-[0.2em] text-foreground/70 transition-colors group-hover:text-accent">
              {isExternalLink ? "View Case Study" : "View Project"}
              <span className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </span>
          )}
        </div>

        {/* Right: supporting visuals — skipped when the project instead
            carries its visuals per-subsection below. */}
        {!hasSubsections &&
          (project.layout === "staggered" ? (
            <StaggeredMedia media={project.media} title={project.title} />
          ) : project.layout === "row" ? (
            <RowMedia
              media={project.media}
              columns={project.mediaColumns}
              title={project.title}
            />
          ) : project.layout === "grid" ? (
            <GridMedia media={project.media} title={project.title} />
          ) : project.media.length <= 1 ? (
            <MediaSlot media={first} title={project.title} />
          ) : (
            <div className="grid grid-cols-2 gap-3">
              <div className="col-span-2">
                <MediaSlot media={first} title={project.title} />
              </div>
              <MediaSlot media={second} title={project.title} />
              <MediaSlot media={third} title={project.title} />
            </div>
          ))}

        {project.subsections && (
          <div className="flex flex-col divide-y divide-white/10 border-t border-white/10">
            {project.subsections.map((sub, i) => (
              <SubsectionRow
                key={sub.title}
                subsection={sub}
                index={i}
                fallbackLink={project.link}
              />
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );

  if (!project.link || hasSubsections) {
    return content;
  }

  return isExternalLink ? (
    <a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      className="block"
    >
      {content}
    </a>
  ) : (
    <Link to={project.link} className="block">
      {content}
    </Link>
  );
};

export default WorkProjectRow;
