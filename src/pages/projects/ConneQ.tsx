import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import GlitchText from "@/components/GlitchText";

const ConneQ = () => {
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
                Affective Computing x Haptics
              </span>
            </div>
            <GlitchText text="CONNEQ" className="text-4xl md:text-6xl lg:text-7xl" />
          </motion.header>

          {/* Three-column hero */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {/* Left: What Was Built */}
            <div className="space-y-3">
              <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                // What Was Built
              </h2>
              <div className="border border-foreground/20 p-4">
                <p className="font-mono text-xs leading-relaxed">
                  ConneQ is a 1-to-1 wearable system that translates biometric data into a named emotion and tactile haptic feedback. We utilized an AI reasoning layer to interpret physiological signals and interpret that data into meaningful emotional states. We created a tangible interface for virtual communication. 
                </p>
              </div>
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  Tech Stack:
                </span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {["C", "Arduino Uno R4", "Arduino App Lab", "Python", "Claude Sonnet API", "3D Rendering & Printing"].map((tech) => (
                    <span key={tech} className="font-mono text-xs border-brutal px-3 py-1 bg-secondary">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Center: Media placeholder */}
            <div className="bg-muted overflow-hidden aspect-[3/4] md:aspect-auto flex items-center justify-center border border-foreground/20">
              <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                — media coming soon —
              </p>
            </div>

            {/* Right: Background */}
            <div className="space-y-3">
              <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                // Background
              </h2>
              <div className="border border-foreground/20 p-4">
                <p className="font-mono text-xs leading-relaxed">
                  Developed in 24 hours for the MIT Media Lab Hardmode Hackathon, ConneQ was born from a question: How can we communicate feeling virtually beyond an apathetic text or call. I worked alongside a team of 4 other hackers. My role was to design and build the software pipeline that took in biometric data, processed and cleaned that data, and then used an AI reasoning layer to interpret that data into an output that could be read by our haptic actuators.
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
            <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              — coming soon —
            </p>
          </motion.div>

        </div>
      </main>
    </div>
  );
};

export default ConneQ;
