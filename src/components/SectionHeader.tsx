// Chapter opener in the PDF's style: an oversized word set tight against a
// hairline rule, with a short caption sitting on the right of the spread.
const SectionHeader = ({
  title,
  caption,
  count,
}: {
  title: string;
  caption: string;
  count: number;
}) => (
  <div className="grid grid-cols-1 border-b border-ink md:grid-cols-2">
    <div className="border-ink px-4 pb-6 pt-24 md:border-r md:px-10 md:pt-32">
      <h2 className="text-[22vw] font-bold uppercase leading-[0.8] tracking-[-0.05em] md:text-[11vw]">
        {title}
      </h2>
    </div>
    <div className="flex flex-col justify-end gap-3 px-4 pb-6 md:px-10">
      <span className="text-xs uppercase tracking-[0.2em]">
        {String(count).padStart(2, "0")} {count === 1 ? "Project" : "Projects"}
      </span>
      <p className="max-w-sm text-lg leading-snug md:text-xl">{caption}</p>
    </div>
  </div>
);

export default SectionHeader;
