import WorkProjectRow from "@/components/WorkProjectRow";
import SectionHeader from "@/components/SectionHeader";
import { vaultProjects } from "@/data/projects";

const VaultSection = () => {
  return (
    <section id="vault" className="bg-paper">
      <SectionHeader
        title="Vault"
        caption="Personal explorations in computer vision, wearables, and the body as an interface."
        count={vaultProjects.length}
      />
      {vaultProjects.map((project) => (
        <WorkProjectRow key={project.title} project={project} />
      ))}
    </section>
  );
};

export default VaultSection;

// DO NOT DELETE — archived from the old scrap-gallery Vault, kept for
// possible future use elsewhere (e.g. a writing/blog section):
// {
//   title: "CO-EVOLUTION: TECHNOLOGY AND HUMANITY",
//   medium: "WRITING",
//   year: "2026",
//   text: "I saw a video discussion on Meta's new Tribe v2 model. Got me thinking about technology and its trajectory. Wrote about it:)",
//   link: "https://fr00tl00p.substack.com/p/co-evolution-technology-and-humanity",
// },
// {
//   title: "STORYBOARDING",
//   medium: "SKETCH",
//   year: "2025",
//   media: { type: "image", src: "/vaultItems/storyboard.png" },
//   text: "My friend made a song that sparked a conversation about the type of scene he pictured along with the song. This is a storyboard and some rough animations of the idea.",
// },
// {
//   title: "LOVE IN SILENCE",
//   medium: "WRITING",
//   year: "2025",
//   text: "",
// },
// {
//   title: "TREE CHAIR",
//   medium: "GENERATIVE 3D RENDER",
//   year: "2024",
//   media: { type: "video", src: "/vaultItems/benchClip.mov" },
//   text: "While on a walk, I saw a fallen tree stump that inspired an idea for a bark style bench. This is the original log, my vision, and an AI generated 3D render.",
// },
// {
//   title: "AT THE TRAIN STATION",
//   medium: "WRITING",
//   year: "2023",
//   text: "Setting: A curly haired girl sits on a wooden bench at Union Station, waiting for her train in an hour. The sound of the general public, hustle and bustle of an early Monday morning echos the large Union Station lobby.",
//   link: "https://substack.com/@fr00tl00p/note/c-229415147?r=45xfi0&utm_source=notes-share-action&utm_medium=web",
// },
// {
//   title: "MOTHER NATURE",
//   medium: "POETRY",
//   year: "2021",
//   text: "",
// },
