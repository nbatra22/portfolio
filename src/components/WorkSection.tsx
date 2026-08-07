import WorkProjectRow, { WorkProject } from "@/components/WorkProjectRow";

const projects: WorkProject[] = [
  // Syntrillo Health — commented out for now.
  // {
  //   title: "Syntrillo Health",
  //   date: "JAN 2026 - PRESENT",
  //   category: "Data Viz",
  //   description:
  //     "A re-design of a physician facing data dashboard for a health-tech startup.",
  //   link: "https://www.figma.com/deck/PiXudvsd2WousaS7yn8VeJ/DataDashboard-Redesign?node-id=32-66&t=r1LQYNQg3hHL0zSi-1",
  //   media: [],
  //   subsections: [
  //     { title: "Alert System" },
  //     { title: "Stroke Risk Score System" },
  //     { title: "System Migration" },
  //   ],
  // },
  {
    title: "VoiceIQ",
    date: "SEPT 2025 - DEC 2025",
    category: "AI / ML",
    description:
      "An industry level AI agent that handles complex IT support through voice conversation.",
    link: "#",
    media: [{ type: "audio", src: "/voiceIQ/voiceIQFlow2.mp3" }],
  },
];

const WorkSection = () => {
  return (
    <section
      id="work"
      className="bg-[#08090d] pb-24"
    >
      {/* Full-width backdrop so nothing shows through beside the nav links
          as rows scroll underneath — mirrors Navigation's own full-bleed +
          inner-container pattern. */}
      <div className="sticky top-0 z-10 w-full bg-[#08090d] pt-20 pb-6">
        <div className="container mx-auto px-4 md:px-8">
          <p className="font-nav max-w-lg text-sm text-muted-foreground">
            Industry projects in AI, data visualizations, and immersive
            technical experiences.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8">
        {projects.map((project) => (
          <WorkProjectRow key={project.title} project={project} />
        ))}
        <div className="border-t border-white/10" />
      </div>
    </section>
  );
};

export default WorkSection;
