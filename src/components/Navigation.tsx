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
          <button
            type="button"
            onClick={() => setMobileMenuOpen((open) => !open)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            className="text-foreground/70 transition-colors hover:text-foreground md:hidden"
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
            className="overflow-hidden border-t border-white/10 bg-[#08090d] md:hidden"
          >
            <div className="container mx-auto flex flex-col px-4">
              {externalLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="border-b border-white/5 py-4 last:border-b-0"
                >
                  <span
                    className={`font-nav text-xs uppercase tracking-widest ${
                      link.accent ? "" : "text-muted-foreground"
                    }`}
                    style={link.accent ? { color: "#E1306C" } : undefined}
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
