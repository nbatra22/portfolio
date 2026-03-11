import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import ProjectCard from "@/components/ProjectCard";
import GlitchText from "@/components/GlitchText";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import type { CarouselApi } from "@/components/ui/carousel";

const Work = () => {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!carouselApi) return;
    carouselApi.on("select", () => setCurrentIndex(carouselApi.selectedScrollSnap()));
  }, [carouselApi]);

  const featuredProjects = [
    {
      title: "CONNEQ",
      description: "Placeholder description for ConneQ.",
      category: "PLACEHOLDER",
      link: "#",
      featured: true,
      thumbnail: "/placeholder.svg"
    },
    {
      title: "SECOND SKIN",
      description: "A projection-mapping system that uses computer vision to turn body movement into responsive digital art.",
      category: "COMPUTER VISION x FASHION TECH",
      link: "/work/projection-mapping",
      featured: true,
      video: "/SecondSkin-It1.mov"
    },
    {
      title: "VOICEIQ",
      description: "An industry level AI agent that handles complex IT support through voice conversation.",
      category: "AI / ML",
      link: "/work/voiceiq",
      featured: true,
      video: "/waveform.mp4"
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
          </motion.header>

          {/* Featured Projects */}
          <section className="mb-12 md:mb-14">
            <Carousel opts={{ loop: true, align: "center" }} setApi={setCarouselApi} className="w-full">
              <CarouselContent>
                {featuredProjects.map((project, i) => (
                  <CarouselItem key={project.title} className="basis-[85%] md:basis-[70%]">
                    <div className={`transition-all duration-300 ${i !== currentIndex ? "blur-sm opacity-40 scale-95" : "scale-100"}`}>
                      <ProjectCard {...project} />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-2" />
              <CarouselNext className="right-2" />
            </Carousel>
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
