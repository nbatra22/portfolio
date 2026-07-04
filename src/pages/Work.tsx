import { motion } from "framer-motion";
import WorkProjectRow, { WorkProject } from "@/components/WorkProjectRow";

const projects: WorkProject[] = [
  {
    title: "Second Skin",
    date: "2025",
    category: "Computer Vision x Fashion Tech",
    description:
      "A projection-mapping system that uses computer vision to turn body movement into responsive digital art.",
    link: "#",
    media: [
      { type: "image", src: "/secondSkinthumbnail.jpeg" },
      { type: "image", src: "/secondSkin/phase2.png" },
      { type: "video", src: "/secondSkin/phase4_media0.mov" },
    ],
  },
  {
    title: "ConneQ",
    date: "2024",
    category: "Affective Computing x Haptics",
    description:
      "A wearable system that analyzes biometric data to output a named emotion and frequency of vibration.",
    link: "#",
    media: [
      { type: "image", src: "/ConneQThumnbail.png" },
      { type: "image", src: "/conneQ/conneQ.jpeg" },
    ],
  },
  {
    title: "VoiceIQ",
    date: "2025",
    category: "AI / ML",
    description:
      "An industry level AI agent that handles complex IT support through voice conversation.",
    link: "#",
    media: [{ type: "image", src: "/voiceIQthumbnail.jpg" }],
  },
  {
    title: "Syntrillo Health",
    date: "2024",
    category: "Data Viz",
    description:
      "A re-design of a physician facing data dashboard for a health-tech startup.",
    link: "https://www.figma.com/deck/PiXudvsd2WousaS7yn8VeJ/DataDashboard-Redesign?node-id=32-66&t=r1LQYNQg3hHL0zSi-1",
    media: [],
  },
  {
    title: "AI Visual Jockey",
    date: "2026",
    category: "Generative AI x Live Visuals",
    description: "Placeholder description — details coming soon.",
    media: [],
  },
];

const Work = () => {
  return (
    <div className="min-h-screen bg-[#08090d]">
      <main className="pt-28 pb-24 md:pt-36">
        <div className="container mx-auto px-4 md:px-8">
          <motion.p
            className="font-nav max-w-lg text-sm text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Selected projects spanning AI, creative coding, and immersive
            experiences.
          </motion.p>

          <section className="mt-4">
            {projects.map((project, index) => (
              <WorkProjectRow
                key={project.title}
                project={project}
                index={index}
              />
            ))}
            <div className="border-t border-white/10" />
          </section>
        </div>
      </main>
    </div>
  );
};

export default Work;
