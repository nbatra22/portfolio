import { useParams, Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import SecondSkin from "./projects/SecondSkin";
import VoiceIQ from "./projects/VoiceIQ";

const NotFound = () => (
  <div className="min-h-screen bg-background">
    <Navigation />
    <div className="pt-32 container mx-auto px-4 text-center">
      <h1 className="font-display text-4xl">PROJECT NOT FOUND</h1>
      <Link to="/work" className="font-mono text-accent mt-4 inline-block">
        ← BACK TO WORK
      </Link>
    </div>
  </div>
);

const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();

  switch (slug) {
    case "projection-mapping": return <SecondSkin />;
    case "voiceiq":            return <VoiceIQ />;
    default:                   return <NotFound />;
  }
};

export default ProjectDetail;
