import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import GlitchText from "@/components/GlitchText";
import AudioWaveform from "@/components/AudioWaveform";

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
            className="mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="mb-3">
              <span className="font-mono text-xs uppercase tracking-widest border border-foreground/40 px-2 py-1">
                AI / ML
              </span>
            </div>
            <GlitchText text="VOICEIQ" className="text-4xl md:text-6xl lg:text-7xl" />
          </motion.header>

          {/* Three-column hero */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {/* Left: What Was Built + Tech Stack */}
            <div className="space-y-3">
              <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                // What Was Built
              </h2>
              <div className="border border-foreground/20 p-4">
                <p className="font-mono text-xs leading-relaxed">
                  VoiceIQ is a production-grade AI voice assistant designed to handle large-scale IT support workflows. It utilizes an empathetic voice interface to classify user intent, manage support tickets, and resolve issues in real-time. The system was developed as an additional tool for RezolveAI, an AI startup focused on providing Agentic IT Support for our clients.
                </p>
              </div>
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  Tech Stack:
                </span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {["Python", "FastAPI", "React", "WebRTC", "OpenAI API", "Redis", "RealTime API"].map((tech) => (
                    <span key={tech} className="font-mono text-xs border-brutal px-3 py-1 bg-secondary">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Center: Audio Waveform */}
            <div className="bg-muted overflow-hidden aspect-[3/4] md:aspect-auto">
              <AudioWaveform src="/voiceIQ/voiceIQFlow2.mp3" className="w-full h-full" />
            </div>

            {/* Right: Background */}
            <div className="space-y-3">
              <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                // Background
              </h2>
              <div className="border border-foreground/20 p-4">
                <p className="font-mono text-xs leading-relaxed">
                  I was brought onto the team to support the transition of VoiceIQ from a single-flow prototype to a production-ready platform. The primary challenge was moving beyond a 'happy path' demo to a system that could withstand the unpredictability of real-world callers, high volume, and varied client needs and ticketing platforms.
                </p>
                <p className="font-mono text-xs leading-relaxed mt-3">
                  I worked alongside a team of 3 to turn VoiceIQ from a proof-of-concept to a scalable industry tool.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Divider */}
          <div className="border-t border-foreground/20 mb-10" />

          {/* Process + Future Steps */}
          <motion.div
            className="space-y-8 max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div>
              <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-4">
                // Process
              </h2>
              <p className="font-mono text-sm leading-relaxed whitespace-pre-line">
                {`Phase 1: Error Handling: To prevent abrupt call terminations when ticket creation failed, I implemented a transfer functionality and graceful recovery logic to ensure a seamless user experience even during technical friction.

Phase 2: Multi-Tenant Architecture: The platform initially supported only one client with hardcoded API configurations. To enable multi-tenancy, I integrated a PostgreSQL database to store API URLs and schema structures dynamically. By replacing hardcoded logic with database fetches, I made the system entirely dynamic, allowing ticket creation across multiple different tenants and API endpoints.

Phase 3: Multi-Template: Handling different ticketing platforms meant managing varying required fields and inconsistent payload schemas. During this schema creation step, our AI was hallucinating because it was overwhelmed by massive, irrelevant API data. I solved this by adding an intermediate layer that simplified API responses to only the relevant JSON fields with self-added requirement tags. I then moved schema creation to a separate OpenAI API call—decoupling it from the Realtime API—to minimize the data load and drastically improve accuracy.

Phase 4: Modular Codebase: I restructured the codebase into use-case-specific directories, moving away from a monolithic main.py to a modular, production-standard architecture.`}
              </p>
            </div>

            <div>
              <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-4">
                // Future Steps
              </h2>
              <p className="font-mono text-sm leading-relaxed">
                The next phase is the development of a client configuration dashboard. This will allow clients to select specific use cases and prompting styles for their voice agent. The system will then dynamically concatenate these selections into a single initial system prompt for the Realtime API. This strategy limits prompt size in real-time, further reducing latency and preventing hallucinations during live interactions.
              </p>
            </div>
          </motion.div>

        </div>
      </main>
    </div>
  );
};

export default VoiceIQ;
