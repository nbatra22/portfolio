import WorkProjectRow, { WorkProject } from "@/components/WorkProjectRow";

const projects: WorkProject[] = [
  {
    title: "Syntrillo Health",
    date: "JAN 2026 - PRESENT",
    category: "Data Viz",
    description:
      "A re-design of a physician facing data dashboard for a health-tech startup.",
    link: "https://www.figma.com/deck/PiXudvsd2WousaS7yn8VeJ/DataDashboard-Redesign?node-id=32-66&t=r1LQYNQg3hHL0zSi-1",
    media: [],
  },
  {
    title: "VoiceIQ",
    date: "SEPT 2025 - DEC 2025",
    category: "AI / ML",
    description:
      "An industry level AI agent that handles complex IT support through voice conversation.",
    link: "#",
    media: [],
  },
];

const WorkSection = () => {
  return (
    <section
      id="work"
      className="bg-[#08090d] pt-24 pb-24 md:pt-28"
    >
      <div className="container mx-auto px-4 md:px-8">
        <p className="font-nav max-w-lg text-sm text-muted-foreground">
          Selected projects spanning AI, creative coding, and immersive
          experiences.
        </p>

        <div className="mt-4">
          {projects.map((project) => (
            <WorkProjectRow key={project.title} project={project} />
          ))}
          <div className="border-t border-white/10" />
        </div>
      </div>
    </section>
  );
};

export default WorkSection;
