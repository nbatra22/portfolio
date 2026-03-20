import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

const externalLinks = [
  { href: "https://www.linkedin.com/in/navya-batra/", label: "LINKEDIN" },
  { href: "https://github.com/nbatra22", label: "GITHUB" },
  { href: "https://www.navyabatra.com/resume.pdf", label: "RESUME" },
];

const navLinks = [
  { path: "/", label: "HOME" },
  { path: "/chat", label: "CHAT" },
  { path: "/work", label: "WORK" },
  { path: "/vault", label: "VAULT" },
];

const Navigation = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex items-center justify-end h-16">
          <div className="flex items-center gap-6 md:gap-10">
            {isHome ? (
              externalLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <motion.span
                    className="font-mono text-xs uppercase tracking-widest text-muted-foreground"
                    whileHover={{ color: "hsl(var(--foreground))" }}
                  >
                    {link.label}
                  </motion.span>
                </a>
              ))
            ) : (
              navLinks.map((link) => (
                <Link key={link.path} to={link.path}>
                  <motion.span
                    className={`font-mono text-xs uppercase tracking-widest relative ${
                      location.pathname === link.path ? "text-accent" : "text-muted-foreground"
                    }`}
                    whileHover={{ color: "hsl(var(--foreground))" }}
                  >
                    {link.label}
                    {location.pathname === link.path && (
                      <motion.div
                        className="absolute -bottom-1 left-0 right-0 h-px bg-accent"
                        layoutId="navIndicator"
                      />
                    )}
                  </motion.span>
                </Link>
              ))
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navigation;