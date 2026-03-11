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

          {/* Coming Soon */}
          <motion.div
            className="border border-foreground/20 p-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
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
