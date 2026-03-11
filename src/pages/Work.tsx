import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import ProjectCard from "@/components/ProjectCard";
import GlitchText from "@/components/GlitchText";

const Work = () => {
  const featuredProjects = [
    {
      title: "VOICEIQ",
      description: "An industry level AI agent that handles complex IT support through voice conversation.",
      category: "AI / ML",
      link: "/work/voiceiq",
      featured: true,
      thumbnail: "/voiceIQthumbnail.jpg"
    },
    {
      title: "SECOND SKIN",
      description: "A projection-mapping system that uses computer vision to turn body movement into responsive digital art.",
      category: "COMPUTER VISION x FASHION TECH",
      link: "/work/projection-mapping",
      featured: true,
      thumbnail: "/secondSkinthumbnail.jpeg"
    }
  ];

  const otherProjects = [
    {
      title: "SYNTRILLO",
      description: "A re-design of a physician facing data dashboard for a health-tech startup.",
      category: "DATA VIZ",
      link: "https://www.figma.com/deck/PiXudvsd2WousaS7yn8VeJ/DataDashboard-Redesign?node-id=32-66&t=r1LQYNQg3hHL0zSi-1"
    },
    {
      title: "BEEF/BEAR",
      description: "Full Brand and web app design for FX present's show 'The Bear'.",
      category: "UI/UX CASE STUDY",
      link: "https://www.figma.com/deck/btEu80cUWovPRwntgZ792W/Design-Review?node-id=1-511&t=r7lAE9AILnK0wA85-1"
    },
    {
      title: "ECOSCAN",
      description: "A computer vision system to analyze the native/invasive status of a plant.",
      category: "EDGE COMPUTING",
      link: "https://docs.google.com/presentation/d/1VZ0RL_Qc-703Q1bakiA41BSlc45ncxbo37v02j7vHbw/edit?slide=id.p#slide=id.p"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="pt-24 md:pt-28 pb-16">
        <div className="container mx-auto px-4 md:px-8">
          {/* Header */}
          <motion.header
            className="mb-8 md:mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <GlitchText
              text="WORK"
              className="text-5xl md:text-7xl lg:text-8xl"
            />
            <p className="font-mono text-muted-foreground mt-4 max-w-lg text-sm">
              Selected projects spanning AI, creative coding, and immersive experiences.
            </p>
          </motion.header>

          {/* Featured Projects */}
          <section className="mb-12 md:mb-14">
            <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-5">
              // FEATURED
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {featuredProjects.map((project) => (
                <ProjectCard key={project.title} {...project} />
              ))}
            </div>
          </section>

          {/* Other Projects */}
          <section>
            <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-6">
              // MORE WORK
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              {otherProjects.map((project) => (
                <ProjectCard key={project.title} {...project} />
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Work;
