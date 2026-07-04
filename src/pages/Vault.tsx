import { motion } from "framer-motion";
import VaultTile, { VaultTileData } from "@/components/VaultTile";

const vaultItems: VaultTileData[] = [
  {
    title: "CO-EVOLUTION: TECHNOLOGY AND HUMANITY",
    medium: "WRITING",
    year: "2026",
    text: "I saw a video discussion on Meta's new Tribe v2 model. Got me thinking about technology and its trajectory. Wrote about it:)",
    link: "https://fr00tl00p.substack.com/p/co-evolution-technology-and-humanity",
  },
  {
    title: "STORYBOARDING",
    medium: "SKETCH",
    year: "2025",
    media: { type: "image", src: "/vaultItems/storyboard.png" },
    text: "My friend made a song that sparked a conversation about the type of scene he pictured along with the song. This is a storyboard and some rough animations of the idea.",
  },
  // DO NOT DELETE
  // {
  //   title: "LOVE IN SILENCE",
  //   medium: "WRITING",
  //   year: "2025",
  //   text: "",
  // },
  {
    title: "TREE CHAIR",
    medium: "GENERATIVE 3D RENDER",
    year: "2024",
    media: { type: "video", src: "/vaultItems/benchClip.mov" },
    text: "While on a walk, I saw a fallen tree stump that inspired an idea for a bark style bench. This is the original log, my vision, and an AI generated 3D render.",
  },
  {
    title: "AT THE TRAIN STATION",
    medium: "WRITING",
    year: "2023",
    text: "Setting: A curly haired girl sits on a wooden bench at Union Station, waiting for her train in an hour. The sound of the general public, hustle and bustle of an early Monday morning echos the large Union Station lobby.",
    link: "https://substack.com/@fr00tl00p/note/c-229415147?r=45xfi0&utm_source=notes-share-action&utm_medium=web",
  },
  // DO NOT DELETE
  // {
  //   title: "MOTHER NATURE",
  //   medium: "POETRY",
  //   year: "2021",
  //   text: "",
  // },
];

const Vault = () => {
  return (
    <div className="min-h-screen bg-[#08090d]">
      <main className="pt-28 pb-24 md:pt-36">
        <div className="container mx-auto px-4 md:px-8">
          <motion.p
            className="font-nav max-w-lg text-sm text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            A weird collection of some of my creative chaos, scrapped
            projects or explorations.
          </motion.p>

          <section className="mt-8 grid grid-cols-2 gap-3 md:mt-10 md:grid-cols-3 md:gap-4">
            {vaultItems.map((item, index) => (
              <VaultTile key={item.title} item={item} index={index} />
            ))}
          </section>

          <motion.div
            className="mt-10 flex items-center justify-between"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <span className="font-nav text-xs text-muted-foreground">
              {vaultItems.length} ARTIFACTS
            </span>
            <span className="font-nav text-xs text-muted-foreground">
              HOVER TO EXPAND
            </span>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Vault;
