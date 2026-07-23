import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import heroBridge from "@/assets/hero-bridge.jpg";

// Distance, in pixels, that WORK and VAULT sit from the waterline —
// kept identical on both sides so the two signs stay equidistant.
const SIGN_OFFSET_PX = 20;

interface SourceRect {
  sx: number;
  sy: number;
  sw: number;
  sh: number;
}

// Fraction down the *original* (non-flipped) photo where the bridge
// rails converge to their vanishing point. Tuned by eye.
const VANISHING_POINT_FRACTION = 0.58;
// How far down the visible box that vanishing point should land —
// 1.0 would put it exactly on the waterline; leaving a hair of slack
// keeps a sliver of soft canopy right at the seam.
const VP_SCREEN_FRACTION = 0.96;

// Same displacement used to ripple each canvas row, reused so the VAULT
// sign sways in sync with the reflection at its own vertical position.
// The slow fourth term is a low, wide undulation — like the swell of a
// real lake surface — layered under the tighter ripples.
const rippleAt = (y: number, time: number) =>
  Math.sin(y * 0.028 + time) * 9 +
  Math.sin(y * 0.011 - time * 1.35) * 5 +
  Math.sin(y * 0.006 + time * 0.6) * 4 +
  Math.sin(y * 0.002 + time * 0.15) * 6;

const BridgeWaterScene = () => {
  const topBoxRef = useRef<HTMLDivElement>(null);
  const bottomBoxRef = useRef<HTMLDivElement>(null);
  const topCanvasRef = useRef<HTMLCanvasElement>(null);
  const bottomCanvasRef = useRef<HTMLCanvasElement>(null);
  const flippedRef = useRef<HTMLCanvasElement | null>(null);
  const vaultRippleRef = useRef<HTMLDivElement>(null);

  // The hero is pinned (sticky) for one extra viewport-height of scroll —
  // during that "slack", the page itself doesn't go anywhere; the scroll
  // delta directly scrubs the panel split instead. Only once the panels
  // are fully off-screen does the pin release and normal scrolling carry
  // you into Work (and further, Vault), which sit pulled up directly
  // behind the hero the whole time (see the -100vh wrapper in Index.tsx).
  const [slackPx, setSlackPx] = useState(
    () => (typeof window !== "undefined" ? window.innerHeight : 900)
  );
  const scrollY = useMotionValue(
    typeof window !== "undefined" ? window.scrollY : 0
  );

  useEffect(() => {
    const onScroll = () => scrollY.set(window.scrollY);
    const onResize = () => setSlackPx(window.innerHeight);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [scrollY]);

  // 0 = fully closed (at the very top), 1 = fully open (scrolled through
  // one viewport-height of pin slack).
  const foldProgress = useTransform(scrollY, (y) =>
    Math.min(1, Math.max(0, y / slackPx))
  );

  // Matches the panels' own opacity pacing (holds, then fades late) so the
  // backdrop doesn't reveal Work/Vault in the margins before the panels
  // themselves have actually started sliding away.
  const backdropOpacity = useTransform(foldProgress, [0, 0.7, 1], [1, 1, 0]);
  const topY = useTransform(foldProgress, [0, 1], ["0%", "-100%"]);
  const topOpacity = useTransform(foldProgress, [0, 0.7, 1], [1, 1, 0]);
  const bottomY = useTransform(foldProgress, [0, 1], ["0%", "100%"]);
  const bottomOpacity = useTransform(foldProgress, [0, 0.7, 1], [1, 1, 0]);

  const scrollToSection = (target: "work" | "vault") => (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById(target)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    const topBox = topBoxRef.current;
    const bottomBox = bottomBoxRef.current;
    const topCanvas = topCanvasRef.current;
    const bottomCanvas = bottomCanvasRef.current;
    if (!topBox || !bottomBox || !topCanvas || !bottomCanvas) return;

    const topCtx = topCanvas.getContext("2d");
    const bottomCtx = bottomCanvas.getContext("2d");
    if (!topCtx || !bottomCtx) return;

    const img = new Image();
    img.src = heroBridge;

    let source: SourceRect | null = null;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let time = Math.random() * 1000;
    let rafId = 0;

    // Flip the photo upside down once into an offscreen buffer — the
    // chunky near-foreground railings that were at the bottom of the
    // original shot end up at the top of the scene, and the soft
    // canopy that was at the top ends up meeting the waterline, which
    // reads as a much more natural thing for water to reflect.
    const buildFlipped = () => {
      const flipped = document.createElement("canvas");
      flipped.width = img.naturalWidth;
      flipped.height = img.naturalHeight;
      const fctx = flipped.getContext("2d");
      if (!fctx) return null;
      fctx.translate(0, flipped.height);
      fctx.scale(1, -1);
      fctx.drawImage(img, 0, 0);
      return flipped;
    };

    const computeSourceRect = (
      flipped: HTMLCanvasElement,
      boxW: number,
      boxH: number
    ): SourceRect => {
      const cropW = flipped.width;
      const cropH = flipped.height;
      const vpY = cropH * (1 - VANISHING_POINT_FRACTION);

      // Zoom in just enough (beyond the plain "cover" minimum, if needed)
      // that the vanishing point lands near the bottom of the box — i.e.
      // near the waterline / center of the whole screen — while still
      // covering the box's full width and height.
      const coverScale = Math.max(boxW / cropW, boxH / cropH);
      const targetScale = boxH / (vpY / VP_SCREEN_FRACTION);
      const scale = Math.max(coverScale, targetScale);

      const sw = boxW / scale;
      const sh = boxH / scale;
      const sx = Math.min(Math.max((cropW - sw) / 2, 0), cropW - sw);
      const sy = Math.min(Math.max(vpY - sh, 0), cropH - sh);

      return { sx, sy, sw, sh };
    };

    const drawTop = (flipped: HTMLCanvasElement) => {
      if (!source) return;
      const rect = topBox.getBoundingClientRect();
      topCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
      topCtx.clearRect(0, 0, rect.width, rect.height);
      topCtx.drawImage(
        flipped,
        source.sx,
        source.sy,
        source.sw,
        source.sh,
        0,
        0,
        rect.width,
        rect.height
      );
    };

    const drawReflection = (flipped: HTMLCanvasElement) => {
      if (!source) return;
      const rect = bottomBox.getBoundingClientRect();
      bottomCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
      bottomCtx.clearRect(0, 0, rect.width, rect.height);

      const rowH = 2;
      const rows = Math.ceil(rect.height / rowH);

      for (let i = 0; i < rows; i++) {
        const y = i * rowH;
        const t = y / rect.height;
        // Flip again: reflection's top row samples the flipped source's
        // bottom (the canopy at the waterline), deeper rows sample
        // further up — which un-flips back to the photo's original,
        // right-side-up orientation.
        const srcY = source.sy + source.sh * (1 - t);
        const srcRowH = source.sh / rows;
        const ripple = rippleAt(y, time);

        bottomCtx.drawImage(
          flipped,
          source.sx,
          srcY,
          source.sw,
          srcRowH,
          ripple,
          y,
          rect.width,
          rowH + 1
        );
      }
    };

    const layout = () => {
      if (!img.naturalWidth) return;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      if (!flippedRef.current) flippedRef.current = buildFlipped();
      const flipped = flippedRef.current;
      if (!flipped) return;

      const topRect = topBox.getBoundingClientRect();
      const bottomRect = bottomBox.getBoundingClientRect();

      topCanvas.width = topRect.width * dpr;
      topCanvas.height = topRect.height * dpr;
      topCanvas.style.width = `${topRect.width}px`;
      topCanvas.style.height = `${topRect.height}px`;

      bottomCanvas.width = bottomRect.width * dpr;
      bottomCanvas.height = bottomRect.height * dpr;
      bottomCanvas.style.width = `${bottomRect.width}px`;
      bottomCanvas.style.height = `${bottomRect.height}px`;

      source = computeSourceRect(flipped, topRect.width, topRect.height);
      drawTop(flipped);
    };

    const render = () => {
      time += 0.016;
      const flipped = flippedRef.current;
      if (flipped) drawReflection(flipped);
      if (vaultRippleRef.current) {
        const offset = rippleAt(SIGN_OFFSET_PX, time);
        vaultRippleRef.current.style.transform = `translateX(${offset}px)`;
      }
      rafId = requestAnimationFrame(render);
    };

    const start = () => {
      layout();
      if (!rafId) render();
    };

    if (img.complete && img.naturalWidth) {
      start();
    } else {
      img.onload = start;
    }

    window.addEventListener("resize", layout);
    return () => {
      window.removeEventListener("resize", layout);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="relative w-full" style={{ height: `calc(100vh + ${slackPx}px)` }}>
      <div
        id="home"
        className="sticky top-0 z-10 h-screen w-full overflow-hidden"
      >
        <div className="absolute inset-0 flex flex-col">
          {/* Opaque backdrop for the closed state — the canvases are only
              70vw wide, so without this the side margins would already
              show Work/Vault (pulled up directly behind the hero) before
              any scrolling has happened. Fades out with the fold. */}
          <motion.div
            className="pointer-events-none absolute inset-0 z-0"
            style={{ background: "#08090d", opacity: backdropOpacity }}
          />

          {/* Full-scene vignette — quiet, empty-room unease at the edges */}
          <motion.div
            className="pointer-events-none absolute inset-0 z-30"
            style={{
              background:
                "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 55%, #08090d 100%)",
              opacity: backdropOpacity,
            }}
          />

          {/* Top: the bridge, upside down — canopy at the waterline. Slides
              straight up off-screen, scrubbed by scroll position. */}
          <motion.div
            className="relative"
            style={{
              height: "50%",
              y: topY,
              opacity: topOpacity,
            }}
          >
            <div ref={topBoxRef} className="relative flex h-full w-full justify-center">
              <canvas
                ref={topCanvasRef}
                className="h-full"
                style={{
                  width: "70vw",
                  maxWidth: "1400px",
                  filter: "brightness(0.55) saturate(1.15) contrast(1.05)",
                }}
              />
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "radial-gradient(ellipse 60% 90% at 50% 20%, transparent 40%, #08090d 100%)",
                }}
              />

              {/* WORK — close above the waterline */}
              <a
                href="#work"
                onClick={scrollToSection("work")}
                className="absolute z-20 left-1/2 -translate-x-1/2"
                style={{ bottom: `${SIGN_OFFSET_PX}px` }}
              >
                <motion.span
                  className="flex items-center justify-center gap-2 border border-white/25 bg-[#08090d]/60 px-5 py-2 font-nav text-[11px] uppercase tracking-[0.3em] text-foreground/90 backdrop-blur-[2px]"
                  whileHover={{
                    color: "hsl(var(--accent))",
                    borderColor: "hsl(var(--accent) / 0.7)",
                    boxShadow: "0 0 18px hsl(var(--accent) / 0.35)",
                  }}
                >
                  Work
                  <motion.svg
                    aria-hidden="true"
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    animate={{ y: [0, 3, 0] }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <path d="M2 3.5 5 7 8 3.5" />
                  </motion.svg>
                </motion.span>
              </a>
            </div>
          </motion.div>

          {/* Waterline — the hinge line the two doors fold along */}
          <motion.div
            className="relative z-10 h-px w-full bg-white/10"
            style={{ opacity: backdropOpacity }}
          />

          {/* Bottom: rippling reflection — softer, cooler, murkier than the
              object it reflects, like a real lake instead of a flipped photo.
              Slides straight down off-screen in sync with the top. */}
          <motion.div
            className="relative flex-1"
            style={{
              y: bottomY,
              opacity: bottomOpacity,
            }}
          >
            <div ref={bottomBoxRef} className="relative flex h-full w-full justify-center">
              <canvas
                ref={bottomCanvasRef}
                className="h-full"
                style={{
                  width: "70vw",
                  maxWidth: "1400px",
                  filter:
                    "blur(1.4px) brightness(0.28) saturate(0.75) contrast(0.9) hue-rotate(-8deg)",
                }}
              />
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "radial-gradient(ellipse 65% 130% at 50% -10%, hsl(200 30% 20% / 0.18) 0%, transparent 55%), radial-gradient(ellipse 65% 130% at 50% -10%, transparent 55%, #08090d 100%)",
                }}
              />

              {/* VAULT — sits in the reflection but reads right-side up */}
              <a
                href="#vault"
                onClick={scrollToSection("vault")}
                className="absolute z-20 left-1/2 -translate-x-1/2"
                style={{ top: `${SIGN_OFFSET_PX}px` }}
              >
                <div ref={vaultRippleRef}>
                  <motion.span
                    className="flex items-center justify-center border border-white/15 bg-[#08090d]/50 px-5 py-2 font-nav text-[11px] uppercase tracking-[0.3em] text-foreground/60 backdrop-blur-[2px]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0.5, 0.7, 0.55, 0.7] }}
                    transition={{
                      opacity: {
                        delay: 1,
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                      },
                    }}
                    whileHover={{
                      color: "hsl(var(--accent))",
                      borderColor: "hsl(var(--accent) / 0.6)",
                      boxShadow: "0 0 18px hsl(var(--accent) / 0.3)",
                      opacity: 1,
                    }}
                  >
                    Vault
                  </motion.span>
                </div>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default BridgeWaterScene;
