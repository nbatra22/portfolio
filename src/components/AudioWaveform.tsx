import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Pause, Play } from "lucide-react";
import p5 from "p5";

interface AudioWaveformProps {
  src: string;
  className?: string;
}

// Click-to-play waveform: an idle static waveform (drawn once from the
// decoded buffer) fades into a live, analyser-driven waveform while
// playing. Pauses itself if scrolled out of view, but never autoplays —
// starting playback is always an explicit click.
const AudioWaveform = ({ src, className }: AudioWaveformProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const p5Ref = useRef<p5 | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const bufferRef = useRef<AudioBuffer | null>(null);
  const sourceRef = useRef<AudioBufferSourceNode | null>(null);
  const isPlayingRef = useRef(false);
  const pauseOffsetRef = useRef(0);   // position in buffer (seconds) to resume from
  const playStartTimeRef = useRef(0); // audioCtx.currentTime when playback began
  const staticWaveRef = useRef<Float32Array | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  // ── Load + decode audio ──────────────────────────────────────────────────
  useEffect(() => {
    const audioCtx = new AudioContext();
    audioCtxRef.current = audioCtx;

    const analyser = audioCtx.createAnalyser();
    analyser.fftSize = 2048;
    analyser.smoothingTimeConstant = 0.8;
    analyser.connect(audioCtx.destination);
    analyserRef.current = analyser;

    fetch(src)
      .then((r) => r.arrayBuffer())
      .then((buf) => audioCtx.decodeAudioData(buf))
      .then((decoded) => {
        bufferRef.current = decoded;

        // Peak amplitude per block (not a raw average, which cancels out
        // to a near-flat line for oscillating audio) — gives a proper
        // waveform silhouette for the idle/thumbnail state.
        const ch = decoded.getChannelData(0);
        const POINTS = 256;
        const block = Math.floor(ch.length / POINTS);
        const wave = new Float32Array(POINTS);
        for (let i = 0; i < POINTS; i++) {
          let peak = 0;
          for (let j = 0; j < block; j++) {
            const v = Math.abs(ch[i * block + j]);
            if (v > peak) peak = v;
          }
          wave[i] = peak;
        }
        staticWaveRef.current = wave;
        setLoaded(true);
      })
      .catch(console.error);

    return () => {
      sourceRef.current?.stop();
      audioCtx.close();
    };
  }, [src]);

  const play = () => {
    const ctx = audioCtxRef.current;
    if (!ctx || !bufferRef.current || !analyserRef.current) return;
    if (isPlayingRef.current) return;
    if (ctx.state === "suspended") ctx.resume();

    const source = ctx.createBufferSource();
    source.buffer = bufferRef.current;
    source.connect(analyserRef.current);
    source.loop = true;
    source.start(0, pauseOffsetRef.current);
    playStartTimeRef.current = ctx.currentTime;
    sourceRef.current = source;
    isPlayingRef.current = true;
    setIsPlaying(true);
  };

  const stop = () => {
    const ctx = audioCtxRef.current;
    if (!isPlayingRef.current || !ctx || !bufferRef.current) return;
    const elapsed = ctx.currentTime - playStartTimeRef.current;
    pauseOffsetRef.current = (pauseOffsetRef.current + elapsed) % bufferRef.current.duration;
    sourceRef.current?.stop();
    sourceRef.current = null;
    isPlayingRef.current = false;
    setIsPlaying(false);
  };

  const togglePlay = () => {
    if (!loaded) return;
    if (isPlayingRef.current) stop();
    else play();
  };

  // Pause (never auto-start) once scrolled out of view, so audio doesn't
  // keep playing behind the scenes after the user has moved on.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) stop();
        });
      },
      { threshold: 0.15 }
    );

    if (wrapperRef.current) observer.observe(wrapperRef.current);

    return () => observer.disconnect();
  }, []);

  // ── p5 sketch ────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!containerRef.current) return;

    const sketch = (p: p5) => {
      const FFT = 2048;
      const timeDomain = new Float32Array(FFT);
      let envelope = 0;

      const drawWave = (
        samples: ArrayLike<number>,
        totalPoints: number,
        alpha: number,
        ampScale: number,
        yOff: number
      ) => {
        const w = p.width;
        const h = p.height;

        p.stroke(255, 255, 255, alpha);
        p.strokeWeight(1.5);
        p.noFill();
        p.beginShape();
        for (let i = 0; i < totalPoints; i++) {
          const x = p.map(i, 0, totalPoints - 1, 0, w);
          const v = samples[i] ?? 0;
          const y = h / 2 + yOff + v * (h * 0.42) * ampScale;
          p.vertex(x, y);
        }
        p.endShape();
      };

      // Mirrored amplitude bars — the classic static "this is a waveform"
      // silhouette, used for the idle/thumbnail state.
      const drawBars = (
        samples: ArrayLike<number>,
        totalPoints: number,
        alpha: number,
        ampScale: number
      ) => {
        const w = p.width;
        const h = p.height;
        const barWidth = w / totalPoints;

        p.stroke(255, 255, 255, alpha);
        p.strokeWeight(Math.max(1, barWidth * 0.6));
        for (let i = 0; i < totalPoints; i++) {
          const x = p.map(i, 0, totalPoints - 1, barWidth / 2, w - barWidth / 2);
          const amp = samples[i] ?? 0;
          const barH = Math.max(2, amp * h * 0.85 * ampScale);
          p.line(x, h / 2 - barH / 2, x, h / 2 + barH / 2);
        }
      };

      p.setup = () => {
        const el = containerRef.current!;
        const w = el.offsetWidth || el.clientWidth || 800;
        const h = el.offsetHeight || el.clientHeight || 300;
        p.createCanvas(w, h).parent(el);
        p.frameRate(60);
      };

      p.draw = () => {
        // Matches the site's --background token (hsl(228 24% 4%) = #08090d)
        // so the waveform blends into the page instead of sitting on pure black.
        p.background(8, 9, 13);

        const isPlayingNow = isPlayingRef.current;
        const analyser = analyserRef.current;
        const staticWave = staticWaveRef.current;

        if (isPlayingNow && analyser) {
          analyser.getFloatTimeDomainData(timeDomain);
        }

        let rms = 0;
        if (isPlayingNow) {
          for (let i = 0; i < FFT; i++) rms += timeDomain[i] * timeDomain[i];
          rms = Math.sqrt(rms / FFT);
        }
        const target = isPlayingNow ? Math.min(rms * 4, 1) : 0;
        envelope += (target - envelope) * (target > envelope ? 0.25 : 0.05);

        if (staticWave) {
          const idleScale = Math.max(0, 1 - envelope * 1.2);
          if (idleScale > 0.01) {
            drawBars(staticWave, staticWave.length, 200 * idleScale, idleScale);
          }
        }

        if (isPlayingNow || envelope > 0.005) {
          const layers = [
            { alpha: 220, scale: 1.0,  yOff: 0 },
            { alpha: 100, scale: 0.75, yOff: p.height * 0.03 },
            { alpha:  50, scale: 0.5,  yOff: -p.height * 0.03 },
          ];
          const LIVE = 256;
          const step = Math.floor(FFT / LIVE);
          const liveSlice = new Float32Array(LIVE);
          for (let i = 0; i < LIVE; i++) liveSlice[i] = timeDomain[i * step] * envelope * 3;

          for (const l of layers) {
            drawWave(liveSlice, LIVE, l.alpha * Math.min(envelope / 0.1, 1), l.scale, l.yOff);
          }
        }
      };

      p.windowResized = () => {
        if (!containerRef.current) return;
        const el = containerRef.current;
        p.resizeCanvas(el.offsetWidth || 800, el.offsetHeight || 300);
      };
    };

    p5Ref.current = new p5(sketch);

    // The container's final width can settle after this effect runs (grid /
    // aspect-ratio layout resolving, fonts loading) — a plain window-resize
    // listener misses that, leaving the canvas narrower than its box and
    // left-aligned instead of filling it. Watch the container itself instead.
    const el = containerRef.current;
    const resizeObserver = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      if (width > 0 && height > 0) {
        p5Ref.current?.resizeCanvas(width, height);
      }
    });
    resizeObserver.observe(el);

    return () => {
      resizeObserver.disconnect();
      p5Ref.current?.remove();
      p5Ref.current = null;
    };
  }, []);

  return (
    <button
      type="button"
      ref={wrapperRef}
      onClick={togglePlay}
      disabled={!loaded}
      aria-label={isPlaying ? "Pause audio" : "Play audio"}
      className={`group/wave relative block ${className ?? ""}`}
    >
      {!loaded && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-background">
          <div className="flex gap-1">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-1 h-4 bg-white/30"
                animate={{ scaleY: [1, 2, 1] }}
                transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
              />
            ))}
          </div>
        </div>
      )}
      <div ref={containerRef} style={{ width: "100%", height: "100%" }} />
      {loaded && (
        <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-sm transition-transform duration-200 group-hover/wave:scale-110">
            {isPlaying ? <Pause size={16} /> : <Play size={16} className="ml-0.5" />}
          </span>
        </span>
      )}
    </button>
  );
};

export default AudioWaveform;
