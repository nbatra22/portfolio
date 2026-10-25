const concepts: [string, string][] = [
  ["Computer Vision", "Second Skin"],
  ["Real-Time Tracking", "Second Skin"],
  ["Projection-Mapping", "Second Skin"],
  ["Voice AI Agents", "VoiceIQ"],
  ["Large Language Models", "VoiceIQ, Portfolio Chatbot"],
  ["Affective Computing", "ConneQ"],
  ["Hardware Exploration", "Second Skin, ConneQ"],
  ["Counterfunctional Design", "Second Skin, Portfolio"],
  ["Process-Driven Design", "VoiceIQ, Second Skin, ConneQ"],
];

const contact: [string, string][] = [
  ["Email", "mailto:navya.batra@gmail.com"],
  ["LinkedIn", "https://www.linkedin.com/in/navya-batra/"],
  ["GitHub", "https://github.com/nbatra22"],
  ["Resume", "https://www.navyabatra.com/resume.pdf"],
];

// A dotted leader between a label and its page/reference, like the PDF's
// index — the dots stretch to fill whatever width is left.
const LeaderRow = ({ label, value }: { label: string; value: string }) => (
  <li className="flex items-baseline gap-2 py-0.5">
    <span className="shrink-0">{label}</span>
    <span className="min-w-4 flex-1 translate-y-[-0.25em] border-b-2 border-dotted border-ink" />
    <span className="shrink-0 text-right">{value}</span>
  </li>
);

const IndexSection = () => (
  <section id="index" className="bg-paper px-4 pb-32 pt-24 md:px-10 md:pt-32">
    <h2 className="text-[26vw] font-normal leading-[0.8] tracking-[-0.05em] md:text-[14vw]">
      Index
    </h2>

    <div className="mt-16 grid grid-cols-1 gap-16 md:grid-cols-2 md:gap-x-20">
      <div>
        <h3 className="text-4xl font-medium tracking-[-0.02em] md:text-5xl">
          Message from the author
        </h3>
        <p className="mt-3 max-w-xl text-base leading-snug">
          A few questions I have gotten during portfolio reviews have been,
          “Why is your cover page blank?” or “Is this first page not done?” The
          wireframe design of my cover page is an intentional decision. I see
          my career in design to forever be in the “wireframe” stage. I view
          the creation of my portfolio and the exploration of what it means to
          be a designer as forever a journey. In order to get where I am now,
          it was an evolution and I imagine it to be that way as long as I
          pursue this career.
        </p>
        <p className="mt-6 max-w-xl text-base leading-snug">
          Refik Anadol, the exhibits of TeamLab, and Tina Taraghian largely
          inspire my projects and style. I’ve drawn inspiration from each of
          these designers’ use of brutalism, technical minimalism, and
          cyber-glitch core.
        </p>
      </div>

      <div className="flex flex-col gap-16">
        <div>
          <h3 className="text-4xl font-medium tracking-[-0.02em] md:text-5xl">
            Explored Concepts
          </h3>
          <ul className="mt-3 text-sm md:text-base">
            {concepts.map(([label, value]) => (
              <LeaderRow key={label} label={label} value={value} />
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-4xl font-medium tracking-[-0.02em] md:text-5xl">
            Contact
          </h3>
          <ul className="mt-3 text-sm md:text-base">
            {contact.map(([label, href]) => (
              <li key={label} className="flex items-baseline gap-2 py-0.5">
                <span className="shrink-0">{label}</span>
                <span className="min-w-4 flex-1 translate-y-[-0.25em] border-b-2 border-dotted border-ink" />
                <a
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="shrink-0 underline decoration-2 underline-offset-4 transition-colors hover:text-accent"
                >
                  {href.replace(/^mailto:|^https?:\/\/(www\.)?/g, "").replace(/\/$/, "")}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>

    <p className="mt-24 flex justify-between border-t border-ink pt-3 text-xs uppercase tracking-[0.2em]">
      <span>Navya Batra</span>
      <span>© {new Date().getFullYear()}</span>
    </p>
  </section>
);

export default IndexSection;
