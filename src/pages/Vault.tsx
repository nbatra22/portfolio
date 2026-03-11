import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import VaultItem from "@/components/VaultItem";
import GlitchText from "@/components/GlitchText";

const Vault = () => {
const vaultItems = [
  {
    title: "TREE CHAIR",
    medium: "GENERATIVE 3D RENDER",
    year: "2024",
    media: { type: "image" as const, src: "/vaultItems/tree-chair.jpg" }
  },
  {
    title: "LOVE IN SILENCE",
    medium: "WRITING",
    year: "2025",
    media: { type: "image" as const, src: "/vaultItems/love-in-silence.jpg" }
  },
  {
    title: "MOTHER NATURE",
    medium: "POETRY",
    year: "2021",
    media: { type: "image" as const, src: "/vaultItems/mother-nature.jpg" }
  },
  {
    title: "AN OLD WOMAN I DIDN'T KNOW",
    medium: "WRITING",
    year: "2022",
    media: { type: "image" as const, src: "/public/vaultItems/oldWoman.png" }
  },
  {
    title: "THE MAN AT THE TRAIN STATION",
    medium: "WRITING",
    year: "2023",
    media: { type: "image" as const, src: "/vaultItems/train-station.jpg" }
  },
  {
    title: "STORYBOARDING",
    medium: "SKETCH",
    year: "2025",
    media: { type: "image" as const, src: "/public/vaultItems/storyboard.png" }
  },
  {
    title: "ANIMATED MOCK UP",
    medium: "ROUGH ANIMATE",
    year: "2025",
    media: { type: "video" as const, src: "/vaultItems/animated-mockup.mp4" }
  },
];


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

          {/* Gallery Grid */}
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              {vaultItems.map((item, index) => (
                <VaultItem
                  key={item.title}
                  title={item.title}
                  medium={item.medium}
                  year={item.year}
                  index={index}
                  media={item.media}
                  modalContent={
                    <p className="font-mono text-sm text-muted-foreground">Placeholder</p>
                  }
                />
              ))}
            </div>
          </motion.section>

          {/* Info bar */}
          <motion.div 
            className="mt-12 py-4 border-t border-border flex justify-between items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <span className="font-mono text-xs text-muted-foreground">
              {vaultItems.length} ARTIFACTS
            </span>
            <span className="font-mono text-xs text-muted-foreground">
              HOVER TO EXPLORE
            </span>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Vault;