import { AnimatePresence, motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

const externalLinks = [
  { href: "https://www.linkedin.com/in/navya-batra/", label: "LINKEDIN" },
  { href: "https://github.com/nbatra22", label: "GITHUB" },
  { href: "https://www.navyabatra.com/resume.pdf", label: "RESUME" },
  {
    href: "https://www.instagram.com/fruitl0_0p/",
    label: "FUN",
    accent: true,
  },
];

const SCROLL_PAGE_PATHS = ["/", "/work", "/vault"];

const Navigation = () => {
  const location = useLocation();
  const breadcrumb = location.pathname.startsWith("/work")
    ? "/WORK"
    : location.pathname.startsWith("/vault")
    ? "/VAULT"
    : "";

  // "/", "/work", and "/vault" are all the same scrollable page — if
  // we're already on it, going "home" means scrolling to the top rather
  // than a route change (which the scroll-spy would just override).
  const handleWordmarkClick = (e: React.MouseEvent) => {
    if (SCROLL_PAGE_PATHS.includes(location.pathname)) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-16">
          <Link
            to="/"
            onClick={handleWordmarkClick}
            className="group flex items-baseline gap-0.5"
          >
            <span className="font-nav text-xs md:text-sm tracking-[0.2em] uppercase text-foreground/70 transition-colors group-hover:text-foreground">
              navya.batra
            </span>
            <AnimatePresence mode="wait">
              {breadcrumb && (
                <motion.span
                  key={breadcrumb}
                  className="font-nav text-xs md:text-sm tracking-[0.2em] uppercase text-muted-foreground"
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                >
                  {breadcrumb}
                </motion.span>
              )}
            </AnimatePresence>
          </Link>
          <div className="flex items-center gap-6 md:gap-10">
            {externalLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <motion.span
                  className={`font-nav text-xs uppercase tracking-widest ${
                    link.accent ? "" : "text-muted-foreground"
                  }`}
                  style={link.accent ? { color: "#E1306C" } : undefined}
                  whileHover={
                    link.accent
                      ? { color: "#F77737" }
                      : { color: "hsl(var(--foreground))" }
                  }
                >
                  {link.label}
                </motion.span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navigation;
