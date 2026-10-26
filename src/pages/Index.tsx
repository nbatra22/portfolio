import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CoverSpread from "@/components/CoverSpread";
import WorkProjectRow from "@/components/WorkProjectRow";
import IndexSection from "@/components/IndexSection";
import { PAGE_STOPS, projects } from "@/data/projects";

const Index = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const hasJumped = useRef(false);

  // Direct links to a project (/second-skin) or /index land on this same
  // scrollable page — jump straight to that spread on first mount, no
  // animation.
  useEffect(() => {
    if (hasJumped.current) return;
    hasJumped.current = true;
    const stop = PAGE_STOPS.find((s) => s.path === location.pathname);
    if (stop && stop.id !== "home") {
      document.getElementById(stop.id)?.scrollIntoView({ block: "start" });
    }
    // Only ever runs once, on mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Scroll-spy: keep the URL — and therefore the nav breadcrumb — in sync
  // with whichever project is actually in view. Spreads can be taller than
  // one viewport, so this tracks whichever one's top has most recently
  // crossed a reference line near the top of the screen, rather than an
  // IntersectionObserver ratio (which is relative to each element's own
  // height and would rarely cross 50% for tall spreads).
  useEffect(() => {
    const REFERENCE_Y = 120;

    let ticking = false;
    const updateActiveSection = () => {
      ticking = false;
      let active = PAGE_STOPS[0];
      for (const stop of PAGE_STOPS) {
        const el = document.getElementById(stop.id);
        if (el && el.getBoundingClientRect().top <= REFERENCE_Y) {
          active = stop;
        }
      }
      if (active.path !== window.location.pathname) {
        navigate(active.path, { replace: true });
      }
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(updateActiveSection);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    updateActiveSection();
    return () => window.removeEventListener("scroll", onScroll);
  }, [navigate]);

  return (
    <main className="relative w-full bg-paper text-ink">
      <CoverSpread />
      <section id="projects">
        {projects.map((project) => (
          <WorkProjectRow key={project.title} project={project} />
        ))}
      </section>
      <IndexSection />
    </main>
  );
};

export default Index;
