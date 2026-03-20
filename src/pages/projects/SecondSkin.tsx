import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import GlitchText from "@/components/GlitchText";

interface MediaItem {
  type: "image" | "video";
  src: string;
}

interface Phase {
  number: string;
  title: string;
  text: string;
  media: MediaItem[];
  align: "left" | "right";
  layout?: "stacked" | "diagonal";
}

const phases: Phase[] = [
  {
    number: "01",
    title: "Planning",
    text: `The inspiration for this project came from a moment of friction at a fashion tech event. This event marketed itself as the intersection of fashion and technology and integrated augmented reality throughout the show. By the halfway mark, the entire audience had abandoned their VR headsets and post show feedback was largely negative. The technology was said to not integrate well with the show, and headsets were uncomfortable for long periods of time.

I decided I wanted to try integrating technology, animation, and graphics using my computer science background and my interest in fashion and design. My initial plan was to project dynamic visuals directly onto a performer's body using depth perception.`,
    media: [
      { type: "image", src: "/secondSkin/phase0_pic1.jpg" },
      { type: "image", src: "/secondSkin/phase0_pic2.jpg" },
    ],
    align: "left",
    layout: "stacked",
  },
  {
    number: "02",
    title: "First Build",
    text: "I used MediaPipe and OpenCV in Python to extract a bare-bone live-feed skeleton of the user. I tried using DensePose first to extract a 3D render, but my hardware didn't support 3D mapping software. This first iteration gave me a working skeleton tracker but needed artistic refinement.",
    media: [{ type: "image", src: "/secondSkin/phase2.png" }],
    align: "right",
  },
  {
    number: "03",
    title: "Animate + Logic",
    text: `To gain more artistic control, I integrated TouchDesigner. This allowed me to experiment with "cyber-glitch core" aesthetics that respond fluidly to the MediaPipe coordinates. It also gave me more freedom to explore counterfunctional design as a concept.

I could deliberately use unconventional graphics and styles in order to enhance the feeling of technology and give a glitch, futuristic vibe.`,
    media: [],
    align: "left",
  },
  {
    number: "04",
    title: "Projection",
    text: "After encountering depth-perception roadblocks when trying to project onto a moving body, I pivoted to a high-contrast, projection system backdrop. This gave a more \"technical minimalism\" feel to the project and allowed the animations to read cleanly against the performer.",
    media: [
      { type: "video", src: "/secondSkin/phase4_media0.mov" },
      { type: "video", src: "/secondSkin/phase4_media1.mov" },
    ],
    align: "right",
    layout: "diagonal",
  },
  {
    number: "05",
    title: "Onward",
    text: "Knowing this roadblock, I feel my journey with Second Skin has actually just started. I am currently working toward my long-term goal of projecting directly onto the body itself. By enabling CUDA on the Jetson Nano and combining DensePose with TouchDesigner, I aim to achieve the depth perception necessary for projecting animations on top of the moving body.",
    media: [],
    align: "left",
  },
];

const MediaLoader = () => (
  <div className="absolute inset-0 flex items-center justify-center bg-muted">
    <div className="flex gap-1">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-1 h-4 bg-foreground/30"
          animate={{ scaleY: [1, 2, 1] }}
          transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
        />
      ))}
    </div>
  </div>
);

const RenderMedia = ({ item }: { item: MediaItem }) => {
  const [loaded, setLoaded] = useState(false);
  if (item.type === "video") {
    return (
      <div className="relative w-full h-full">
        {!loaded && <MediaLoader />}
        <video
          className="w-full h-full object-cover"
          src={item.src}
          autoPlay
          loop
          muted
          playsInline
          onCanPlay={() => setLoaded(true)}
        />
      </div>
    );
  }
  return (
    <div className="relative w-full h-full">
      {!loaded && <MediaLoader />}
      <img
        src={item.src}
        alt=""
        className="w-full h-full object-cover"
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
};

const renderMedia = (item: MediaItem, key: string) => (
  <RenderMedia key={key} item={item} />
);

const VimeoEmbed = () => {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className="bg-muted overflow-hidden aspect-[3/4] md:aspect-auto relative">
      {!loaded && <MediaLoader />}
      <iframe
        src="https://player.vimeo.com/video/1175379862?background=1&autopause=0&player_id=0&app_id=58479"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ border: "none", width: "calc(100% + 200px)", height: "calc(100% + 200px)" }}
        allow="autoplay; fullscreen; picture-in-picture"
        title="SecondSkin-It1"
        onLoad={() => setLoaded(true)}
      />
      <div className="absolute inset-0 pointer-events-none" />
    </div>
  );
};

const PhaseCard = ({ phase, index }: { phase: Phase; index: number }) => {
  const hasMedia = phase.media.length > 0;

  return (
    <motion.div
      className={`border border-foreground/30 w-full md:w-[68%] ${
        phase.align === "right" ? "ml-auto" : "mr-auto"
      }`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: index * 0.05 }}
    >
      {/* Card header */}
      <div className="border-b border-foreground/30 px-5 py-3 flex items-baseline gap-3">
        <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest">
          Phase {phase.number}
        </span>
        <span className="font-mono text-xs text-muted-foreground">—</span>
        <h3 className="font-mono text-sm uppercase tracking-wide">{phase.title}</h3>
      </div>

      {/* Card body */}
      <div className="p-5">
        {hasMedia ? (
          phase.layout === "stacked" ? (
            /* Phase 1: image left, text right */
            <div className="grid gap-5" style={{ gridTemplateColumns: "1fr 2fr" }}>
              <div className="bg-muted overflow-hidden">
                <img
                  src={phase.media[0].src}
                  alt=""
                  className="w-full h-auto object-contain"
                />
              </div>
              <p className="font-mono text-xs leading-relaxed whitespace-pre-line">
                {phase.text}
              </p>
            </div>
          ) : phase.layout === "diagonal" ? (
            /* Phase 4: img left, right col = text stacked directly above img2 */
            <div className="grid grid-cols-2 gap-5 items-start">
              <div className="aspect-[4/3] bg-muted overflow-hidden">
                {renderMedia(phase.media[0], "media-0")}
              </div>
              <div className="flex flex-col gap-3">
                <p className="font-mono text-xs leading-relaxed whitespace-pre-line">
                  {phase.text}
                </p>
                <div className="aspect-[4/3] bg-muted overflow-hidden">
                  {renderMedia(phase.media[1], "media-1")}
                </div>
              </div>
            </div>
          ) : (
            /* Default: single media on left, text on right */
            <div className="grid grid-cols-2 gap-5">
              <div className="aspect-[4/3] bg-muted overflow-hidden">
                {renderMedia(phase.media[0], "media-0")}
              </div>
              <p className="font-mono text-xs leading-relaxed whitespace-pre-line">
                {phase.text}
              </p>
            </div>
          )
        ) : (
          <p className="font-mono text-xs leading-relaxed whitespace-pre-line">
            {phase.text}
          </p>
        )}
      </div>
    </motion.div>
  );
};

const SecondSkin = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="pt-20 md:pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-8">

          {/* Back link */}
          <Link to="/work">
            <motion.span
              className="font-mono text-xs text-muted-foreground hover:text-accent inline-block mb-8"
              whileHover={{ x: -4 }}
            >
              ← BACK TO WORK
            </motion.span>
          </Link>

          {/* Header */}
          <motion.header
            className="mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="mb-3">
              <span className="font-mono text-xs uppercase tracking-widest border border-foreground/40 px-2 py-1">
                Computer Vision x FashionTech
              </span>
            </div>
            <GlitchText text="SECOND SKIN" className="text-4xl md:text-6xl lg:text-7xl" />
          </motion.header>

          {/* Three-column overview */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {/* What Was Built */}
            <div className="space-y-3">
              <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                // What Was Built
              </h2>
              <div className="border border-foreground/20 p-4">
                <p className="font-mono text-xs leading-relaxed">
                  Second Skin is a projection-mapping system that utilizes computer vision to turn real-time body tracking into responsive visuals. It uses live camera feed to extract the user's skeleton and then projects dynamic animations that respond to their movements.
                </p>
              </div>
              {/* Tech Stack */}
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  Tech Stack:
                </span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {["Python", "Computer Vision", "OpenCV", "MediaPipe", "TouchDesigner"].map((tech) => (
                    <span key={tech} className="font-mono text-xs border-brutal px-3 py-1 bg-secondary">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Center thumbnail media */}
            <VimeoEmbed />

            {/* Background */}
            <div className="space-y-3">
              <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                // Background
              </h2>
              <div className="border border-foreground/20 p-4">
              <p className="font-mono text-xs leading-relaxed">
                The inspiration for this project came from a moment of friction at a fashion tech event. This event marketed itself as the intersection of fashion and technology and integrated augmented reality throughout the show. By the halfway mark, the entire audience had abandoned their VR headsets and post show feedback was largely negative. The technology was said to not integrate well with the show, and headsets were uncomfortable for long periods of time.
              </p>
                
              <p className="font-mono text-xs leading-relaxed mt-3">
                I decided I wanted to try integrating technology, animation, and graphics using my computer science background and my interest in fashion and design.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Divider */}
          <div className="border-t border-foreground/20 mb-10" />

          {/* Process section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="font-mono text-2xl md:text-3xl uppercase tracking-widest mb-10">
              Process
            </h2>

            <div className="space-y-6">
              {phases.map((phase, index) => (
                <PhaseCard key={phase.number} phase={phase} index={index} />
              ))}
            </div>
          </motion.div>

        </div>
      </main>
    </div>
  );
};

export default SecondSkin;
