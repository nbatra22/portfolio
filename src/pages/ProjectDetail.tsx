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
      "A projection-mapping system that uses computer vision to turn body movement into responsive digital art.",
    article: [
      {
        header: "Origin",
        content: "The inspiration for this project came from a moment of friction at a fashion tech event. In LA, this event marketed itself as the intersection of fashion and technology by integrating augmented reality throughout the show. By the halfway mark, the entire audience had abandoned their VR headsets and feedback was largely negative. The technology felt like a barrier rather than an enhancement.\n\nI decided I wanted to try integrating technology, animation, and graphics using my computer science background and my interest in fashion and design.\n\nI wanted to explore counterfunctional design as a concept— using unconventional \"bad design\" in order to enhance the feeling of technology and give a glitch, futuristic vibe."
      },
      {
        header: "The Technical Evolution",
        content: "Second Skin is a projection-mapping system that utilizes computer vision to turn real-time body tracking into responsive visuals.\n\nPhase 1: The Skeleton: I used MediaPipe and OpenCV in Python to extract a bare-bone live-feed skeleton of the user.\n\nPhase 2: Animation & Logic: To gain more artistic control, I integrated TouchDesigner. This allowed me to experiment with \"cyber-glitch core\" aesthetics that respond fluidly to the MediaPipe coordinates.\n\nPhase 3: The Backdrop: After encountering depth-perception roadblocks when trying to project onto a moving body, I pivoted to a high-contrast, projection system backdrop. This \"technical minimalism\" ensured the animations blended neatly with the performer's silhouette."
      },
      {
        header: "Future Outlook: DensePose and CUDA",
        content: "My journey with Second Skin has actually just started. I am currently working toward my long-term goal of projecting directly onto the body itself. By enabling CUDA on the Jetson Nano and combining DensePose with TouchDesigner, I aim to achieve the depth perception necessary for projecting animations on top of the moving body"
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
      "An AI agent that handles complex IT support through voice conversation.",
    article: [
      {
        header: "Origin",
        content: "My journey into AI began with a simple experiment: I built a chatbot for the homepage of my personal portfolio. During that project, I learned the \"behind the scenes\" of how AI reads information and uses it to answer specific questions—a process known as Retrieval Augmented Generation (RAG)."
      },
      {
        header: "The Challenge: Chat vs. Voice",
        content: "When I started working as a Software Engineer at Rezolve, I moved from building text bots to building a voice system called VoiceIQ. I quickly realized that talking to an AI is much harder than typing to one.\n\nIn a chat, a user is more forgiving if the AI takes a second to think, and they can always scroll back up to re-read a message. But in a phone call, silence feels like a mistake. If the AI pauses for too long, the person on the other end gets frustrated.\n\nTo fix this, I focused on:\n\nSpeed: I used tools like Redis to \"cache\" or store data temporarily so the AI could respond instantly without a lag.\n\nPersonality: I used what I learned from my portfolio bot to make sure the voice agent felt human and stayed on track, rather than sounding like a rigid robot."
      },
      {
        header: "Growing the System",
        content: "Right now, I am turning VoiceIQ into a tool that can handle thousands of real-world calls at once. To make sure it works perfectly every time, I've been:\n\nSmart Error Checking: Making sure the AI can catch mistakes in real-time and fix them before the user notices\n\nHandling Multiple Jobs: Teaching the system to work for four different types of tasks simultaneously, like opening a support ticket or answering a basic question\n\nPreventing \"Hallucinations\": I designed a way to combine different system prompts for the AI so it doesn't get confused or start making things up\n\nUser-Friendly Controls: Building a simple dashboard so that even someone who isn't a coder can set up the AI for their own needs"
      }
    ],
    tech: ["Python", "FastAPI", "React", "WebRTC", "OpenAI API", "Redis"],
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