import { motion } from "framer-motion";
import { useParams, Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import GlitchText from "@/components/GlitchText";

const projectData: Record<string, {
  title: string;
  category: string;
  year: string;
  description: string;
  details: string[];
  tech: string[];

  // NEW (optional)
  hero?: {
    type: "image" | "video";
    src: string;
  };
  gallery?: Array<{
    type: "image" | "video";
    src: string;
    caption?: string;
  }>;
  externalUrl?: string;
  figmaEmbed?: string;
}> = {
  "projection-mapping": {
    title: "SECOND SKIN",
    category: "COMPUTER VISION x FASHION TECH",
    year: "2025",
    description:
      "Computer vision–driven fashion projection that transforms the human body into a living canvas.",
    details: [
      "Real-time body and pose tracking to align projections with the subject's form",
      "Generative animations mapped dynamically using computer vision coordinates",
      "Custom workflows for responsive, movement-driven content"
    ],
    tech: ["Python", "Computer Vision", "OpenCV", "Media Pipe"],
    hero: {
      type: "video",
      src: "/DemoPMIteration1.mov"
    },
    gallery: [
      { type: "image", src: "/projects/projection-mapping/gallery/01.jpg" },
      { type: "image", src: "/projects/projection-mapping/gallery/02.jpg" },
      { type: "video", src: "/projects/projection-mapping/gallery/process.mp4" }
    ]
  },

  "voiceiq": {
    title: "VOICEIQ",
    category: "AI / ML",
    year: "2025",
    description:
      "A conversational AI agent that leverages natural language understanding and voice analysis to assist users in task management.",
    details: [
      "Speech emotion recognition with 94% accuracy",
      "Real-time processing under 100ms latency",
      "Privacy-first architecture with on-device processing",
      "Partnered with accessibility advocacy groups"
    ],
    tech: ["Python", "FastAPI", "React", "WebRTC", "OpenAI API", "Redis"],
    figmaEmbed: "https://embed.figma.com/deck/1t1P9KqAj4X7WGpZHU0PYR/NavyaBatra--Selected-Projects?node-id=0-1&embed-host=share",
    hero: {
      type: "image",
      src: "/projects/voiceiq/hero.jpg"
    },
    gallery: [
      { type: "image", src: "/projects/voiceiq/gallery/01.jpg" }
    ]
  },

  "beef-bear": {
    title: "BEEF/BEAR",
    category: "DATA VIZ",
    year: "2023",
    description:
      "Market sentiment analysis through unconventional data sources—from social media to weather patterns. Visualizing the chaos of market psychology.",
    details: [
      "Custom NLP pipeline for sentiment extraction",
      "Interactive D3.js visualizations",
      "Correlation discovery between non-obvious data points"
    ],
    tech: ["D3.js", "Python", "spaCy", "PostgreSQL"],
    externalUrl: "https://beefandbear.com"
  },

  "cv-fashion": {
    title: "CV FASHION",
    category: "CV / ML",
    year: "2023",
    description:
      "Computer vision meets the runway. Real-time analysis of fashion shows, detecting trends, color palettes, and style influences as they emerge.",
    details: [
      "Real-time garment detection and classification",
      "Color extraction and trend analysis",
      "Historical style comparison database"
    ],
    tech: ["YOLO", "OpenCV", "FastAPI", "React"],
    externalUrl: "https://github.com/yourname/cv-fashion"
  },

  "rezolve": {
    title: "REZOLVE",
    category: "PRODUCT",
    year: "2022",
    description:
      "A conflict resolution platform leveraging NLP and behavioral science to facilitate difficult conversations and find common ground.",
    details: [
      "Sentiment-aware conversation threading",
      "De-escalation suggestion engine",
      "User research with 50+ participants"
    ],
    tech: ["React", "Node.js", "GPT-4", "Figma"],
    externalUrl: "https://rezolve.ai"
  }
};

const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? projectData[slug] : null;

  if (!project) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-32 container mx-auto px-4 text-center">
          <h1 className="font-display text-4xl">PROJECT NOT FOUND</h1>
          <Link to="/work" className="font-mono text-accent mt-4 inline-block">
            ← BACK TO WORK
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-24 md:pt-32 pb-16">
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
            className="mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="flex flex-wrap gap-4 items-center mb-4">
              <span className="font-mono text-xs uppercase tracking-widest bg-accent text-background px-2 py-1">
                {project.category}
              </span>
              <span className="font-mono text-xs text-muted-foreground">
                {project.year}
              </span>
            </div>
            <GlitchText 
              text={project.title} 
              className="text-4xl md:text-6xl lg:text-7xl"
            />
          </motion.header>

          {/* Figma Embed or Hero media */}
          {project.figmaEmbed ? (
            <motion.div
              className="w-screen relative left-1/2 right-1/2 -mx-[50vw] mb-12 bg-black"
              style={{ height: '80vh' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <iframe
                style={{ border: 'none' }}
                width="100%"
                height="100%"
                src={`${project.figmaEmbed}&hide-ui=1&scaling=contain`}
                allowFullScreen
              />
            </motion.div>
          ) : (
            <motion.div
              className="border-brutal bg-secondary mb-12 relative overflow-hidden"
              style={{ height: project.figmaEmbed ? '600px' : undefined }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {project.hero ? (
              <div className="h-64 md:h-96">
                {project.hero.type === "video" ? (
                  <video
                    className="w-full h-full object-cover"
                    src={project.hero.src}
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                ) : (
                  <img
                    className="w-full h-full object-cover"
                    src={project.hero.src}
                    alt={project.title}
                  />
                )}
              </div>
            ) : (
              <div className="h-64 md:h-96">
                <div className="absolute inset-0 opacity-20" style={{
                  backgroundImage: `repeating-linear-gradient(
                    45deg,
                    transparent,
                    transparent 20px,
                    hsl(var(--muted-foreground) / 0.1) 20px,
                    hsl(var(--muted-foreground) / 0.1) 40px
                  )`
                }} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-display text-4xl md:text-6xl text-muted-foreground/30">
                    MEDIA
                  </span>
                </div>
              </div>
            )}
            </motion.div>
          )}

          {/* Content grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {/* Description */}
            <motion.div 
              className="md:col-span-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-4">
                // OVERVIEW
              </h2>
              <p className="font-mono text-sm md:text-base leading-relaxed">
                {project.description}
              </p>

              <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground mt-8 mb-4">
                // DETAILS
              </h2>
              <ul className="space-y-2">
                {project.details.map((detail, i) => (
                  <li key={i} className="font-mono text-sm flex items-start gap-3">
                    <span className="text-accent">→</span>
                    {detail}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Tech stack */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-4">
                // TECH STACK
              </h2>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span 
                    key={tech}
                    className="font-mono text-xs border-brutal px-3 py-1 bg-secondary"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProjectDetail;