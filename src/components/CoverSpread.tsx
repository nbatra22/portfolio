import { motion } from "framer-motion";
import { WireframeX } from "@/components/WorkProjectRow";
import { projectNumber, projectSlug, projects } from "@/data/projects";

const scrollTo = (id: string) => (e: React.MouseEvent) => {
  e.preventDefault();
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
};

// The PDF's opening spread: name and an intentionally blank, crossed-out
// wireframe box on the left page; a welcome note and the table of contents
// on the right. The empty box is the point — the portfolio stays a
// wireframe, always in progress (see the author's note in the Index).
const CoverSpread = () => {
  return (
    <section
      id="home"
      className="grid min-h-screen grid-cols-1 border-b border-ink bg-paper pt-14 md:h-screen md:grid-cols-2 md:grid-rows-[minmax(0,1fr)]"
    >
      {/* Left page */}
      <div className="flex flex-col gap-10 border-ink px-4 py-10 md:border-r md:px-10 md:py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-fit"
        >
          <h1 className="text-[24vw] font-bold uppercase leading-[0.82] tracking-[-0.05em] md:text-[min(12vw,19vh)]">
            Navya
            <br />
            Batra
          </h1>
          <p className="mt-3 text-right text-2xl font-medium md:text-[min(2.25rem,4.5vh)]">
            Selected Projects
          </p>
        </motion.div>

        <motion.div
          initial={{ clipPath: "inset(0 100% 0 0)" }}
          animate={{ clipPath: "inset(0 0% 0 0)" }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.65, 0, 0.35, 1] }}
          className="relative aspect-[16/10] w-full border-[5px] border-ink bg-paper shadow-[4px_4px_0_0_rgba(0,0,0,0.25)] md:aspect-auto md:min-h-[120px] md:flex-1"
          aria-hidden="true"
        >
          <WireframeX strokeWidth={5} />
        </motion.div>
      </div>

      {/* Right page */}
      <div className="flex flex-col justify-between gap-10 px-4 py-10 md:px-10 md:py-12">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-md text-3xl font-medium leading-[1.05] tracking-[-0.01em] md:text-[min(3rem,6vh)]"
        >
          Welcome to my personal portfolio.
        </motion.p>

        <nav aria-label="Table of contents" className="flex flex-col">
          {projects.map((p) => (
            <a
              key={p.title}
              href={`#${projectSlug(p.title)}`}
              onClick={scrollTo(projectSlug(p.title))}
              className="group border-t border-ink py-3 lg:py-4"
            >
              <div className="flex items-baseline justify-between gap-4">
                <span className="glitch-hover text-3xl font-medium tracking-[-0.02em] md:text-[min(3rem,5.5vh)]">
                  {p.title}
                </span>
                <span className="shrink-0 text-xs md:text-sm">
                  p. {projectNumber(p.title)}
                </span>
              </div>
              <p className="mt-1 max-w-lg text-xs leading-snug md:text-sm">
                {p.description}
              </p>
            </a>
          ))}
          <a
            href="#index"
            onClick={scrollTo("index")}
            className="group border-y border-ink py-3 lg:py-4"
          >
            <div className="flex items-baseline justify-between gap-4">
              <span className="glitch-hover text-3xl font-medium tracking-[-0.02em] md:text-[min(3rem,5.5vh)]">
                Index
              </span>
              <span className="shrink-0 text-xs md:text-sm">Notes &amp; concepts</span>
            </div>
            <p className="mt-1 max-w-lg text-xs leading-snug md:text-sm">
              A designer's note, my design inspirations, and concepts explored
              throughout these projects
            </p>
          </a>
        </nav>
      </div>
    </section>
  );
};

export default CoverSpread;
