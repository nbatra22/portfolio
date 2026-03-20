import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import HeroPortal from "@/components/HeroPortal";
import Marquee from "@/components/Marquee";
import GlitchText from "@/components/GlitchText";

const Index = () => {
  const portals = [
    {
      title: "CHAT WITH AI",
      subtitle: "Talk to my AI. Ask anything about my work, process, or just say hi.",
      link: "/chat"
    },
    {
      title: "WORK",
      subtitle: "Selected projects in tech, design, and creative computation.",
      link: "/work"
    },
    {
      title: "VAULT",
      subtitle: "Sketches, experiments, poetry, and unreleased fragments.",
      link: "/vault"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <main className="pt-24 md:pt-32 pb-12">
        <div className="container mx-auto px-4 md:px-8">
          {/* Header */}
          <motion.header
            className="mb-16 md:mb-24"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="max-w-4xl">
              <Link to="/about" className="inline-block cursor-pointer">
                <GlitchText
                  text="NAVYA BATRA"
                  className="text-6xl md:text-8xl lg:text-[10rem] leading-none"
                />
              </Link>
              <motion.p
                className="font-mono text-muted-foreground mt-6 max-w-lg text-sm md:text-base"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Creative technologist crafting at the intersection of computation and
                design.
              </motion.p>
            </div>
          </motion.header>

          {/* Portal Grid */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {portals.map((portal, index) => (
              <HeroPortal
                key={portal.title}
                title={portal.title}
                subtitle={portal.subtitle}
                link={portal.link}
                index={index}
              />
            ))}
          </section>
        </div>

        {/* Marquee */}
        <div className="mt-16 md:mt-24">
          <Marquee text="DESIGN • CODE • CREATE • EXPLORE" />
        </div>

        {/* Footer info */}
        <motion.footer 
          className="container mx-auto px-4 md:px-8 mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <div className="flex py-8 border-t border-border">
            <p className="font-mono text-xs text-muted-foreground">
              © 2026 NAVYA BATRA — ALL RIGHTS RESERVED
            </p>
          </div>
        </motion.footer>
      </main>
    </div>
  );
};

export default Index;