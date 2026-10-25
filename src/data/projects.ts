import type { WorkProject } from "@/components/WorkProjectRow";

export const workProjects: WorkProject[] = [
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

export const vaultProjects: WorkProject[] = [
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
    title: "ConneQ",
    date: "MARCH 2026",
    category: "Affective Computing x Haptics",
    description:
      "A wearable system that analyzes biometric data to output a named emotion and frequency of vibration.",
    link: "#",
    layout: "row",
    media: [
      { type: "image", src: "/ConneQThumnbail.png" },
      { type: "image", src: "/conneQ/conneQmedia3.JPG" },
      { type: "image", src: "/conneQ/conneQ.jpeg" },
    ],
    mediaColumns: [
      [
        { type: "image", src: "/ConneQThumnbail.png" },
        { type: "image", src: "/conneQ/conneQmedia3.JPG" },
      ],
      [{ type: "image", src: "/conneQ/conneQ.jpeg" }],
    ],
  },
];

// Anchor id for a project's spread — shared by the rows themselves and the
// cover page's table of contents that links to them.
export const projectSlug = (title: string) =>
  title.toLowerCase().replace(/[^a-z0-9]+/g, "-");

// Page-style numbering ("01", "02"…) running continuously across Work then
// Vault, the way the PDF numbers its spreads.
export const projectNumber = (title: string) => {
  const i = [...workProjects, ...vaultProjects].findIndex((p) => p.title === title);
  return String(i + 1).padStart(2, "0");
};
