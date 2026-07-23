import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BridgeWaterScene from "@/components/BridgeWaterScene";
import WorkSection from "@/components/WorkSection";
import VaultSection from "@/components/VaultSection";

const PATH_FOR_ID: Record<string, string> = {
  home: "/",
  work: "/work",
  vault: "/vault",
};

const Index = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const hasJumped = useRef(false);

  // Direct links to /work or /vault land on this same scrollable page —
  // jump straight to that section on first mount, no animation.
  useEffect(() => {
    if (hasJumped.current) return;
    hasJumped.current = true;
    const id =
      location.pathname === "/work"
        ? "work"
        : location.pathname === "/vault"
        ? "vault"
        : null;
    if (id) {
      document.getElementById(id)?.scrollIntoView({ block: "start" });
    }
    // Only ever runs once, on mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Scroll-spy: keep the URL — and therefore the nav breadcrumb — in sync
  // with whichever section is actually in view, whether the user clicked
  // WORK/VAULT or just scrolled down on their own. Sections are much
  // taller than one viewport, so this tracks whichever section's top has
  // most recently crossed a reference line near the top of the screen,
  // rather than an IntersectionObserver ratio (which is relative to each
  // section's own height and would rarely cross 50% for tall sections).
  useEffect(() => {
    const ids = Object.keys(PATH_FOR_ID);
    const REFERENCE_Y = 120;

    let ticking = false;
    const updateActiveSection = () => {
      ticking = false;
      let activeId = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= REFERENCE_Y) {
          activeId = id;
        }
      }
      const path = PATH_FOR_ID[activeId];
      if (path && path !== window.location.pathname) {
        navigate(path, { replace: true });
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
    <div className="relative w-full bg-[#08090d]">
      <BridgeWaterScene />
      {/* Pulled up to sit directly behind the hero (which is pinned via
          position: sticky for one viewport-height of scroll slack), so
          the panels splitting off-screen reveal Work/Vault in place
          rather than scrolling them into view from below. */}
      <div className="relative" style={{ marginTop: "-100vh" }}>
        <WorkSection />
        <VaultSection />
      </div>
    </div>
  );
};

export default Index;
