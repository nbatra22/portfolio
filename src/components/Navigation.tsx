import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const breadcrumb = location.pathname.startsWith("/work")
    ? "/WORK"
    : location.pathname.startsWith("/vault")
    ? "/VAULT"
    : "";

  // "/", "/work", and "/vault" are all the same scrollable page — if
  // we're already on it, going "home" means scrolling to the top rather
  // than a route change (which the scroll-spy would just override).
  const handleWordmarkClick = (e: React.MouseEvent) => {
    setMobileMenuOpen(false);
    if (SCROLL_PAGE_PATHS.includes(location.pathname)) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 border-b border-ink bg-paper"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="px-4 md:px-10">
        <div className="flex h-14 items-center justify-between">
          <Link
            to="/"
            onClick={handleWordmarkClick}
            className="group flex items-baseline gap-0.5"
          >
            <span className="text-sm font-bold uppercase tracking-[0.02em] transition-colors group-hover:text-accent md:text-base">
              Navya Batra
            </span>
            <AnimatePresence mode="wait">
              {breadcrumb && (
                <motion.span
                  key={breadcrumb}
                  className="text-sm uppercase tracking-[0.02em] md:text-base"
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
          {/* Desktop: links inline. Mobile: a hamburger toggling the panel below. */}
          <div className="hidden items-center gap-10 md:flex">
            {externalLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <motion.span
                  className={`text-xs uppercase tracking-[0.15em] underline-offset-4 hover:underline ${
                    link.accent ? "text-accent" : ""
                  }`}
                >
                  {link.label}
                </motion.span>
              </a>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setMobileMenuOpen((open) => !open)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            className="transition-colors hover:text-accent md:hidden"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="overflow-hidden border-t border-ink bg-paper md:hidden"
          >
            <div className="flex flex-col px-4">
              {externalLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="border-b border-ink py-4 last:border-b-0"
                >
                  <span
                    className={`text-sm uppercase tracking-[0.15em] ${
                      link.accent ? "text-accent" : ""
                    }`}
                  >
                    {link.label}
                  </span>
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navigation;
