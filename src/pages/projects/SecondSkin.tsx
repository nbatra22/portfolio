import { motion } from "framer-motion";
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
  },
  {
    number: "05",
    title: "Onward",
    text: "Knowing this roadblock, I feel my journey with Second Skin has actually just started. I am currently working toward my long-term goal of projecting directly onto the body itself. By enabling CUDA on the Jetson Nano and combining DensePose with TouchDesigner, I aim to achieve the depth perception necessary for projecting animations on top of the moving body.",
    media: [],
    align: "left",
  },
];

const renderMedia = (item: MediaItem, key: string) => {
  if (item.type === "video") {
    return (
      <video
        key={key}
        className="w-full h-full object-cover"
        src={item.src}
        autoPlay
        loop
        muted
        playsInline
      />
    );
  }
  return (
    <img
      key={key}
      src={item.src}
      alt=""
      className="w-full h-full object-cover"
    />
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
          <div className="space-y-4">
            {/* First row: media + text */}
            <div className="grid grid-cols-2 gap-5">
              <div className="aspect-[4/3] bg-muted overflow-hidden">
                {renderMedia(phase.media[0], "media-0")}
              </div>
              <p className="font-mono text-xs leading-relaxed whitespace-pre-line">
                {phase.text}
              </p>
            </div>
            {/* Second media if exists */}
            {phase.media.length > 1 && (
              <div className="flex justify-end">
                <div className="aspect-[4/3] w-1/2 bg-muted overflow-hidden">
                  {renderMedia(phase.media[1], "media-1")}
                </div>
              </div>
            )}
          </div>
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
            </div>

            {/* Center thumbnail media */}
            <div className="bg-muted overflow-hidden aspect-[3/4] md:aspect-auto">
              <video
                className="w-full h-full object-cover"
                src="/secondSkin/SecondSkin-It1.mov"
                autoPlay
                loop
                muted
                playsInline
              />
            </div>

            {/* Background */}
            <div className="space-y-3">
              <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                // Background
              </h2>
              <div className="border border-foreground/20 p-4">
                <p className="font-mono text-xs leading-relaxed">
                  The inspiration came from a fashion tech event where the entire audience abandoned their VR headsets halfway through. The technology didn't integrate with the show. I wanted to explore a different model — one where the tech is invisible.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Tech Stack */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground mr-4">
              Tech Stack:
            </span>
            <div className="inline-flex flex-wrap gap-2 mt-2">
              {["Python", "Computer Vision", "OpenCV", "MediaPipe", "TouchDesigner"].map((tech) => (
                <span key={tech} className="font-mono text-xs border-brutal px-3 py-1 bg-secondary">
                  {tech}
                </span>
              ))}
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
