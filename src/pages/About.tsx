import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, FileText, Briefcase } from "lucide-react";
import Navigation from "@/components/Navigation";
import GlitchText from "@/components/GlitchText";
import Marquee from "@/components/Marquee";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="pt-24 md:pt-32 pb-12">
        <div className="container mx-auto px-4 md:px-8">
          {/* Back Link */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 font-mono text-sm text-muted-foreground hover:text-accent transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              BACK TO HOME
            </Link>
          </motion.div>

          {/* Header */}
          <motion.header
            className="mb-8 md:mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="max-w-4xl">
              <GlitchText
                text="ABOUT ME"
                className="text-5xl md:text-7xl lg:text-8xl leading-none"
              />
            </div>
          </motion.header>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 mb-16">
            {/* Bio Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-6"
            >
              <h2 className="font-display text-2xl md:text-3xl">
                Designer & Creative Technologist
              </h2>
              <div className="font-mono text-muted-foreground text-sm md:text-base space-y-4">
                <p>
                  I'm a creative technologist working at the intersection of art and
                  code. My practice explores how technology can
                  be functional, poetic, and impactful.
                </p>
                <p>
                  As an engineer, I have experience building and scaling production-level systems. Within industry I've helped in transitioning AI prototypes into robust production level platforms. I've worked across optimization, user research, system design, and full stack engineering to make scalable and impactful products.
                </p>
                <p>
                  As an artist, I've practiced generative art, interactive installations, and prioritized immersive user experiences across eveery tech project. Explore my works through my portfolio and case studies.
                </p>
              </div>
            </motion.div>

            {/* Documents Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-6"
            >
              {/* Portfolio Link */}
              <a
                href="/pdfPort.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="group block p-6 border border-border hover:border-accent transition-colors bg-background/50 backdrop-blur"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-accent/10 rounded group-hover:bg-accent/20 transition-colors">
                    <Briefcase className="w-6 h-6 text-accent" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display text-xl mb-2 group-hover:text-accent transition-colors">
                      PORTFOLIO PDF
                    </h3>
                    <p className="font-mono text-sm text-muted-foreground">
                      View an abridged PDF version of highlighted case studies.
                    </p>
                  </div>
                </div>
              </a>

              {/* Resume Link */}
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="group block p-6 border border-border hover:border-accent transition-colors bg-background/50 backdrop-blur"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-accent/10 rounded group-hover:bg-accent/20 transition-colors">
                    <FileText className="w-6 h-6 text-accent" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display text-xl mb-2 group-hover:text-accent transition-colors">
                      RESUME
                    </h3>
                    <p className="font-mono text-sm text-muted-foreground">
                      Download my resume for a detailed overview of my experience and skills.
                    </p>
                  </div>
                </div>
              </a>
            </motion.div>
          </div>
        </div>

        {/* Marquee */}
        <div className="mt-16 md:mt-24">
          <Marquee text="DESIGN • CODE • CREATE • EXPLORE " />
        </div>

        {/* Footer */}
        <motion.footer
          className="container mx-auto px-4 md:px-8 mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 py-8 border-t border-border">
            <p className="font-mono text-xs text-muted-foreground">
              © 2025 NAVYA BATRA — ALL RIGHTS RESERVED
            </p>
            <div className="flex gap-6">
              <a
                href="https://www.linkedin.com/in/navya-batra/"
                className="font-mono text-xs text-muted-foreground hover:text-accent transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                LINKEDIN
              </a>
              <a
                href="https://github.com/nbatra22"
                className="font-mono text-xs text-muted-foreground hover:text-accent transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                GITHUB
              </a>
              <a
                href="mailto:navya.batra@gmail.com"
                className="font-mono text-xs text-muted-foreground hover:text-accent transition-colors"
              >
                EMAIL
              </a>
            </div>
          </div>
        </motion.footer>
      </main>
    </div>
  );
};

export default About;
