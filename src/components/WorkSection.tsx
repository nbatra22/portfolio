import WorkProjectRow from "@/components/WorkProjectRow";
import SectionHeader from "@/components/SectionHeader";
import { workProjects } from "@/data/projects";

const WorkSection = () => {
  return (
    <section id="work" className="bg-paper">
      <SectionHeader
        title="Work"
        caption="Industry projects in AI, data visualizations, and immersive technical experiences."
        count={workProjects.length}
      />
      {workProjects.map((project) => (
        <WorkProjectRow key={project.title} project={project} />
      ))}
    </section>
  );
};

export default WorkSection;
