import { motion } from "framer-motion";
import { useParams, Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import GlitchText from "@/components/GlitchText";

const projectData: Record<string, {
  title: string;
  category: string;
  year: string;
  description: string;
  details?: string[];
  tech: string[];
  article?: Array<{
    header: string;
    content: string;
  }>;

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
      "A projection-mapping system that uses computer vision to turn body movement into  digital art.",
    article: [
      {
        header: "What Was Built",
        content: "Second Skin is a projection-mapping system that utilizes computer vision to turn real-time body tracking into responsive visuals. It uses live camera feed to extract the user's skeleton and then projects dynamic animations that respond to their movements. The goal was to create an immersive experience where technology enhances a performer's presence."
      },
      {
        header: "Background",
        content: "The inspiration for this project came from a moment of friction at a fashion tech event. This event marketed itself as the intersection of fashion and technology and integrated augmented reality throughout the show. By the halfway mark, the entire audience had abandoned their VR headsets and post show feedback was largely negative. The technology was said to not integrate well with the show, and headsets were uncomfortable for long periods of time. \n\nI decided I wanted to try integrating technology, animation, and graphics using my computer science background and my interest in fashion and design."
      },
            {
        header: "Process",
        content: "Phase 1: The Skeleton: I used MediaPipe and OpenCV in Python to extract a bare-bone live-feed skeleton of the user. I tried using DensePose first to extract a 3D render, but my hardware didn't support 3D mapping software. \n\nPhase 2: Animation & Logic: To gain more artistic control, I integrated TouchDesigner. This allowed me to experiment with \"cyber-glitch core\" aesthetics that respond fluidly to the MediaPipe coordinates. It also gave me more freedom to explore counterfunctional design as a concept. I could delibertly use unconventional graphics and styles in order to enhance the feeling of technology and give a glitch, futuristic vibe.\n\nPhase 3: The Backdrop: After encountering depth-perception roadblocks when trying to project onto a moving body, I pivoted to a high-contrast, projection system backdrop. This gave a more \"technical minimalism\" feel to the project. I think this issue is related to not having a 3D render of the model and space."
      },
      {
        header: "Future Steps",
        content: "Knowing this roadblock, I feel my journey with Second Skin has actually just started. I am currently working toward my long-term goal of projecting directly onto the body itself. By enabling CUDA on the Jetson Nano and combining DensePose with TouchDesigner, I aim to achieve the depth perception necessary for projecting animations on top of the moving body"
      }
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
      "An industry deployed AI agent that handles complex IT support through voice conversation.",
    article: [
      {
        header: "What Was Built",
        content: "VoiceIQ is a production-grade AI voice assistant designed to handle large-scale IT support workflows. It utilizes an empathetic voice interface to classify user intent, manage support tickets, and resolve issues in real-time. The system was developed as an additional tool for RezolveAI, an AI startup focused on providing Agentic IT Support for our clients."
      },
      {
        header: "Background",
        content: "I was brought onto the team to support the transition of VoiceIQ from a  a single-flow prototype to a production-ready platform. The primary challenge was moving beyond a 'happy path' demo to a system that could withstand the unpredictability of real-world callers, high volume, and varied client needs and ticketing platforms. I worked alongside a team of 3 to turn VoiceIQ from a proof-of-concept to a scalable industry tool."
      },
      {
        header: "Process",
        content: "Phase 1: Error Handling: To prevent abrupt call terminations when ticket creation failed, I implemented a transfer functionality and graceful recovery logic to ensure a seamless user experience even during technical friction. \n\nPhase 2: Multi-Tenant Architecture: The platform initially supported only one client with hardcoded API configurations. To enable multi-tenancy, I integrated a PostgreSQL database to store API URLs and schema structures dynamically. By replacing hardcoded logic with database fetches, I made the system entirely dynamic, allowing ticket creation across multiple different tenants and API endpoints. \n\nPhase 3: Multi-Template & Hallucination Prevention: Handling different ticketing platforms meant managing varying required fields and inconsistent schemas. The AI was hallucinating because it was overwhelmed by massive, irrelevant API data. I solved this by adding an intermediate layer that simplified API responses to only the relevant JSON fields with self-added requirement tags. I then moved schema creation to a separate OpenAI API call—decoupling it from the Realtime API—to minimize the data load and drastically improve accuracy. \n\nPhase 4: Modular Codebase: I restructured the codebase into use-case-specific directories, moving away from a monolithic main.py to a modular, production-standard architecture."
      },
            {
        header: "Future Steps",
        content: "The next phase is the development of a client configuration dashboard. This will allow clients to select specific use cases and prompting styles for their voice agent. The system will then dynamically concatenate these selections into a single initial system prompt for the Realtime API. This strategy limits prompt size in real-time, further reducing latency and preventing hallucinations during live interactions."
      }
    ],
    tech: ["Python", "FastAPI", "React", "WebRTC", "OpenAI API", "Redis", "RealTime API"],
    hero: {
      type: "video",
      src: "/waveform.mp4"
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
            className="mb-6"
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
              className="bg-secondary mb-12 relative overflow-hidden"
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

              {project.article && project.article.map((section, i) => (
                <div key={i}>
                  <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground mt-8 mb-4">
                    // {section.header.toUpperCase()}
                  </h2>
                  <p className="font-mono text-sm md:text-base leading-relaxed whitespace-pre-line">
                    {section.content}
                  </p>
                </div>
              ))}

              {project.details && (
                <>
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
                </>
              )}
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