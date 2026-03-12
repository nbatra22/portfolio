import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import VaultItem from "@/components/VaultItem";
import GlitchText from "@/components/GlitchText";

const vaultItems = [
  {
    title: "TREE CHAIR",
    medium: "GENERATIVE 3D RENDER",
    year: "2024",
    media: { type: "image" as const, src: "/vaultItems/tree-chair.jpg" },
  },
  {
    title: "AN OLD WOMAN I DIDN'T KNOW",
    medium: "WRITING",
    year: "2022",
    media: { type: "image" as const, src: "/vaultItems/oldWoman.png" },
  },
  {
    title: "STORYBOARDING",
    medium: "SKETCH",
    year: "2025",
    media: { type: "image" as const, src: "/vaultItems/storyboard.png" },
  },
  {
    title: "LOVE IN SILENCE",
    medium: "WRITING",
    year: "2025",
    text: "",
  },
  {
    title: "MOTHER NATURE",
    medium: "POETRY",
    year: "2021",
    text: "",
  },
  {
    title: "THE MAN AT THE TRAIN STATION",
    medium: "WRITING",
    year: "2023",
    text: "",
  },
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
              Fragments, experiments, and unreleased work.
              A curated chaos of creative exploration.
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
