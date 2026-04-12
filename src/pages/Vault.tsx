import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import VaultItem from "@/components/VaultItem";
import GlitchText from "@/components/GlitchText";

const vaultItems = [
    {
    title: "CO-EVOLUTION: TECHNOLOGY AND HUMANITY",
    medium: "WRITING",
    year: "2026",
    text: "I saw a video discussion on Meta's new Tribe v2 model. Got me thinking about technology and it's trajectory. Wrote about it:)",
    link: "https://fr00tl00p.substack.com/p/co-evolution-technology-and-humanity",
  },
  {
    title: "STORYBOARDING",
    medium: "SKETCH",
    year: "2025",
    media: { type: "image" as const, src: "/vaultItems/storyboard.png" },
    text: "My friend made a song that sparked a conversation about the type of scene he pictured along with the song. This is a storyboard and some rough animations of the idea.",
    secondaryMedia: { type: "video" as const, src: "/vaultItems/animate01.mp4" },
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
    media: { type: "video" as const, src: "/vaultItems/benchClip.mov" },
    text: "While on a walk, I saw a fallen tree stump that inspired an idea for a bark style bench. This is the original log, my vision, and an AI generated 3D render.",
    secondaryMedia: { type: "image" as const, src: "/vaultItems/bench.png" },
  },
  {
    title: "AT THE TRAIN STATION",
    medium: "WRITING",
    year: "2023",
    text: "Setting: A curly haired girl sits on a wooden bench at Union Station, waiting for her train in an hour. The sound of the general public, hustle and bustle of an early Monday morning echos the large Union Station lobby. The crunch of an asian man eating snap peas catches her attention. She's typing furiously in her phone.",
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
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="pt-24 md:pt-28 pb-16">
        <div className="container mx-auto px-4 md:px-8">
          {/* Header */}
          <motion.header
            className="mb-12 md:mb-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <GlitchText
              text="VAULT"
              className="text-5xl md:text-7xl lg:text-8xl"
            />
            <p className="font-mono text-muted-foreground mt-4 max-w-lg text-sm">
              A weird collection of some of my creative chaos, scrapped projects or explorations.
            </p>
          </motion.header>

          {/* List */}
          <motion.section
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {vaultItems.map((item, index) => (
              <VaultItem
                key={item.title}
                index={index}
                title={item.title}
                medium={item.medium}
                year={item.year}
                media={"media" in item ? item.media : undefined}
                text={"text" in item ? item.text : undefined}
                link={"link" in item ? item.link : undefined}
                secondaryMedia={"secondaryMedia" in item ? item.secondaryMedia as { type: "image" | "video"; src: string } : undefined}
              />
            ))}
            <div className="border-t border-foreground/20" />
          </motion.section>

          {/* Info bar */}
          <motion.div
            className="mt-12 flex justify-between items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <span className="font-mono text-xs text-muted-foreground">
              {vaultItems.length} ARTIFACTS
            </span>
            <span className="font-mono text-xs text-muted-foreground">
              CLICK TO EXPAND
            </span>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Vault;
