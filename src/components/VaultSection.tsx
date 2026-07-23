import WorkProjectRow, { WorkProject } from "@/components/WorkProjectRow";

const projects: WorkProject[] = [
  {
    title: "Second Skin",
    date: "NOV 2025 - PRESENT",
    category: "Computer Vision x Fashion Tech",
    description:
      "A projection-mapping system that uses computer vision to turn body movement into responsive digital art.",
    link: "#",
    layout: "grid",
    media: [
      { type: "video", src: "/secondSkin/secondSkin2.mov" },
      { type: "image", src: "/secondSkinthumbnail.jpeg" },
      { type: "image", src: "/secondSkin/phase2.png" },
      { type: "video", src: "/secondSkin/phase4_media0.mov" },
    ],
  },
  {
    title: "AI Visual Jockey",
    date: "APRIL 2026",
    category: "Generative AI x Live Visuals",
    description: "Placeholder description — details coming soon.",
    link: "https://visual-jockey.vercel.app",
    layout: "staggered",
    media: [
      { type: "video", src: "/visualJockey1.mp4", hasSound: true },
      { type: "video", src: "/visualJockey2.mp4", hasSound: true },
    ],
  },
  {
    title: "ConneQ",
    date: "MARCH 2026",
    category: "Affective Computing x Haptics",
    description:
      "A wearable system that analyzes biometric data to output a named emotion and frequency of vibration.",
    link: "#",
    layout: "staggered",
    media: [
      { type: "image", src: "/ConneQThumnbail.png" },
      { type: "image", src: "/conneQ/conneQ.jpeg" },
    ],
  },
];

const VaultSection = () => {
  return (
    <section
      id="vault"
      className="bg-[#08090d] pt-24 pb-24 md:pt-28"
    >
      <div className="container mx-auto px-4 md:px-8">
        <p className="font-nav max-w-lg text-sm text-muted-foreground">
          Further projects and experiments across computer vision, wearables,
          and generative systems.
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
