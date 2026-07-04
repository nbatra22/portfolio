import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

const externalLinks = [
  { href: "https://www.linkedin.com/in/navya-batra/", label: "LINKEDIN" },
  { href: "https://github.com/nbatra22", label: "GITHUB" },
  { href: "https://www.navyabatra.com/resume.pdf", label: "RESUME" },
];

const Navigation = () => {
  const location = useLocation();
  const breadcrumb = location.pathname.startsWith("/work")
    ? "/WORK"
    : location.pathname.startsWith("/vault")
    ? "/VAULT"
    : "";

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="group flex items-baseline gap-0.5">
            <span className="font-nav text-xs md:text-sm tracking-[0.2em] uppercase text-foreground/70 transition-colors group-hover:text-foreground">
              navya.batra
            </span>
            {breadcrumb && (
              <span className="font-nav text-xs md:text-sm tracking-[0.2em] uppercase text-muted-foreground">
                {breadcrumb}
              </span>
            )}
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
                  className="font-nav text-xs uppercase tracking-widest text-muted-foreground"
                  whileHover={{ color: "hsl(var(--foreground))" }}
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
