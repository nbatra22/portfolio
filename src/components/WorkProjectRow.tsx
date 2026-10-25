import { AnimatePresence, motion } from "framer-motion";
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
import { projectNumber, projectSlug } from "@/data/projects";

// Media sits in heavy black frames with soft corners, like the screenshots
// placed along the PDF's process spreads.
const FRAME = "overflow-hidden rounded-[14px] border-[3px] border-ink bg-ink";

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
      <span className="pointer-events-none absolute bottom-2 right-2 flex h-7 w-7 items-center justify-center border-2 border-ink bg-paper text-ink opacity-0 transition-opacity group-hover/video:opacity-100">
        {hasSound ? <Volume2 size={14} /> : <VolumeX size={14} />}
      </span>
    </button>
  );
};

// The cover page's crossed-out placeholder box, reused wherever a visual
// hasn't been made yet — "forever in the wireframe stage".
export const WireframeX = ({ strokeWidth = 3 }: { strokeWidth?: number }) => (
  <svg
    className="absolute inset-0 h-full w-full"
    preserveAspectRatio="none"
    aria-hidden="true"
  >
    <line x1="0" y1="0" x2="100%" y2="100%" stroke="currentColor" strokeWidth={strokeWidth} />
    <line x1="100%" y1="0" x2="0" y2="100%" stroke="currentColor" strokeWidth={strokeWidth} />
  </svg>
);

const MediaSlot = ({ media, title }: { media?: ProjectMedia; title: string }) => {
  if (!media) {
    return (
      <div className="relative aspect-video border-[3px] border-ink bg-paper">
        <WireframeX />
        <span className="absolute bottom-2 left-3 bg-paper px-1 text-[10px] uppercase tracking-[0.2em]">
          Visual coming soon
        </span>
      </div>
    );
  }

  return (
    <div
      className={`${FRAME} ${
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
        className={`w-[85%] ${FRAME}`}
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
    <div className="flex gap-4">
      {cols.map((col, colIndex) => (
        <div key={colIndex} className="flex min-w-0 flex-1 flex-col gap-4">
          {col.map((item, i) => {
            const fillsRemainder = i > 0;
            return (
              <div
                key={item.src}
                className={`${FRAME} ${
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
  <div className="grid grid-cols-2 gap-4">
    {media.map((item) => (
      <div
        key={item.src}
        className={`aspect-video ${FRAME}`}
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
          <span className="text-xs">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="text-lg font-bold uppercase transition-colors group-hover/sub:text-accent">
            {subsection.title}
          </span>
        </span>
        <Plus
          size={16}
          className={`shrink-0 transition-transform duration-200 ${
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
                <p className="max-w-md text-sm leading-snug">
                  {subsection.description}
                </p>
              )}
              {link &&
                (isExternalLink ? (
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex w-fit items-center gap-2 border-b-2 border-ink text-xs font-bold uppercase tracking-[0.15em] transition-colors hover:border-accent hover:text-accent"
                  >
                    View More
                    <span className="transition-transform group-hover/sub:translate-x-1">
                      →
                    </span>
                  </a>
                ) : (
                  <Link
                    to={link}
                    className="mt-4 inline-flex w-fit items-center gap-2 border-b-2 border-ink text-xs font-bold uppercase tracking-[0.15em] transition-colors hover:border-accent hover:text-accent"
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
  // "Computer Vision x Fashion Tech" → stacked lines in the tag box, the
  // way the PDF stacks each project's disciplines.
  const tags = project.category.split(/\s+(?:x|\/)\s+/i);

  // One spread per project: copy on the left page, visuals on the right,
  // split by the same hairline gutter that runs down the cover.
  const content = (
    <div
      id={projectSlug(project.title)}
      className="group scroll-mt-16 border-b border-ink"
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`grid grid-cols-1 ${hasSubsections ? "" : "md:grid-cols-2"}`}
      >
        {/* Left page: number, title, tags, description */}
        <div className="flex flex-col border-ink px-4 py-10 md:border-r md:px-10 md:py-16">
          <div className="flex items-baseline justify-between text-xs uppercase tracking-[0.2em]">
            <span>p. {projectNumber(project.title)}</span>
            <span>{project.date}</span>
          </div>
          <h3 className="glitch-hover mt-8 text-6xl font-bold leading-[0.85] tracking-[-0.04em] md:text-8xl">
            {project.title}
          </h3>
          <div className="mt-8 w-fit self-end border-2 border-ink px-4 py-2 text-right text-lg font-medium leading-tight md:text-xl">
            {tags.map((tag) => (
              <span key={tag} className="block">
                {tag}
              </span>
            ))}
          </div>
          <p className="mt-8 max-w-md text-lg leading-snug md:text-xl">
            {project.description}
          </p>
          {project.link && !hasSubsections && (
            <span className="mt-8 inline-flex w-fit items-center gap-2 border-b-2 border-ink text-xs font-bold uppercase tracking-[0.15em] transition-colors group-hover:border-accent group-hover:text-accent">
              {isExternalLink ? "View Case Study" : "View Project"}
              <span className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </span>
          )}
        </div>

        {/* Right page: supporting visuals — skipped when the project instead
            carries its visuals per-subsection below. */}
        {!hasSubsections && (
          <div className="flex flex-col justify-center px-4 pb-10 md:px-10 md:py-16">
            {project.layout === "staggered" ? (
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
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <MediaSlot media={first} title={project.title} />
                </div>
                <MediaSlot media={second} title={project.title} />
                <MediaSlot media={third} title={project.title} />
              </div>
            )}
          </div>
        )}

        {project.subsections && (
          <div className="flex flex-col divide-y divide-ink border-t border-ink px-4 md:px-10">
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
