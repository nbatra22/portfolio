import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import GlitchText from "@/components/GlitchText";

const VoiceIQ = () => {
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
                AI / ML
              </span>
              <span className="font-mono text-xs text-muted-foreground">2025</span>
            </div>
            <GlitchText text="VOICEIQ" className="text-4xl md:text-6xl lg:text-7xl" />
          </motion.header>

          {/* Hero */}
          <motion.div
            className="mb-12 overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="h-64 md:h-96">
              <video
                className="w-full h-full object-cover"
                src="/waveform.mp4"
                autoPlay
                loop
                muted
                playsInline
              />
            </div>
          </motion.div>

          {/* Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            <motion.div
              className="md:col-span-2 space-y-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div>
                <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-4">
                  // WHAT WAS BUILT
                </h2>
                <p className="font-mono text-sm md:text-base leading-relaxed">
                  VoiceIQ is a production-grade AI voice assistant designed to handle large-scale IT support workflows. It utilizes an empathetic voice interface to classify user intent, manage support tickets, and resolve issues in real-time. The system was developed as an additional tool for RezolveAI, an AI startup focused on providing Agentic IT Support for our clients.
                </p>
              </div>

              <div>
                <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-4">
                  // BACKGROUND
                </h2>
                <p className="font-mono text-sm md:text-base leading-relaxed">
                  I was brought onto the team to support the transition of VoiceIQ from a single-flow prototype to a production-ready platform. The primary challenge was moving beyond a 'happy path' demo to a system that could withstand the unpredictability of real-world callers, high volume, and varied client needs and ticketing platforms. I worked alongside a team of 3 to turn VoiceIQ from a proof-of-concept to a scalable industry tool.
                </p>
              </div>

              <div>
                <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-4">
                  // PROCESS
                </h2>
                <p className="font-mono text-sm md:text-base leading-relaxed whitespace-pre-line">
                  {`Phase 1: Error Handling: To prevent abrupt call terminations when ticket creation failed, I implemented a transfer functionality and graceful recovery logic to ensure a seamless user experience even during technical friction.

Phase 2: Multi-Tenant Architecture: The platform initially supported only one client with hardcoded API configurations. To enable multi-tenancy, I integrated a PostgreSQL database to store API URLs and schema structures dynamically. By replacing hardcoded logic with database fetches, I made the system entirely dynamic, allowing ticket creation across multiple different tenants and API endpoints.

Phase 3: Multi-Template: Handling different ticketing platforms meant managing varying required fields and inconsistent payload schemas. During this schema creation step, our AI was hallucinating because it was overwhelmed by massive, irrelevant API data. I solved this by adding an intermediate layer that simplified API responses to only the relevant JSON fields with self-added requirement tags. I then moved schema creation to a separate OpenAI API call—decoupling it from the Realtime API—to minimize the data load and drastically improve accuracy.

Phase 4: Modular Codebase: I restructured the codebase into use-case-specific directories, moving away from a monolithic main.py to a modular, production-standard architecture.`}
                </p>
              </div>

              <div>
                <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-4">
                  // FUTURE STEPS
                </h2>
                <p className="font-mono text-sm md:text-base leading-relaxed">
                  The next phase is the development of a client configuration dashboard. This will allow clients to select specific use cases and prompting styles for their voice agent. The system will then dynamically concatenate these selections into a single initial system prompt for the Realtime API. This strategy limits prompt size in real-time, further reducing latency and preventing hallucinations during live interactions.
                </p>
              </div>
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
                {["Python", "FastAPI", "React", "WebRTC", "OpenAI API", "Redis", "RealTime API"].map((tech) => (
                  <span key={tech} className="font-mono text-xs border-brutal px-3 py-1 bg-secondary">
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

export default VoiceIQ;
