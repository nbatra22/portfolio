import { useEffect, useRef, useState } from "react";
import p5 from "p5";

interface AudioWaveformProps {
  src: string;
  className?: string;
}

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

        const ch = decoded.getChannelData(0);
        const POINTS = 256;
        const block = Math.floor(ch.length / POINTS);
        const wave = new Float32Array(POINTS);
        for (let i = 0; i < POINTS; i++) {
          let sum = 0;
          for (let j = 0; j < block; j++) sum += ch[i * block + j];
          wave[i] = sum / block;
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

  // ── Intersection Observer: auto-play / stop ───────────────────────────────
  useEffect(() => {
    if (!loaded) return;

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
    };

    const stop = () => {
      const ctx = audioCtxRef.current;
      if (!isPlayingRef.current || !ctx || !bufferRef.current) return;
      const elapsed = ctx.currentTime - playStartTimeRef.current;
      pauseOffsetRef.current = (pauseOffsetRef.current + elapsed) % bufferRef.current.duration;
      sourceRef.current?.stop();
      sourceRef.current = null;
      isPlayingRef.current = false;
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            play();
          } else {
            stop();
          }
        });
      },
      { threshold: 0.3 }
    );

    if (wrapperRef.current) observer.observe(wrapperRef.current);

    return () => observer.disconnect();
  }, [loaded]);

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

      p.setup = () => {
        const el = containerRef.current!;
        const w = el.offsetWidth || el.clientWidth || 800;
        const h = el.offsetHeight || el.clientHeight || 300;
        p.createCanvas(w, h).parent(el);
        p.frameRate(60);
      };

      p.draw = () => {
        p.background(0);

        const isPlaying = isPlayingRef.current;
        const analyser = analyserRef.current;
        const staticWave = staticWaveRef.current;

        if (isPlaying && analyser) {
          analyser.getFloatTimeDomainData(timeDomain);
        }

        let rms = 0;
        if (isPlaying) {
          for (let i = 0; i < FFT; i++) rms += timeDomain[i] * timeDomain[i];
          rms = Math.sqrt(rms / FFT);
        }
        const target = isPlaying ? Math.min(rms * 4, 1) : 0;
        envelope += (target - envelope) * (target > envelope ? 0.25 : 0.05);

        if (staticWave) {
          const idleScale = 0.25 * (1 - envelope);
          if (idleScale > 0.01) {
            drawWave(staticWave, staticWave.length, 140 * idleScale / 0.25, idleScale, 0);
          }
        }

        if (isPlaying || envelope > 0.005) {
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

    return () => {
      p5Ref.current?.remove();
      p5Ref.current = null;
    };
  }, []);

  return (
    <div ref={wrapperRef} className={`relative ${className ?? ""}`}>
      <div ref={containerRef} style={{ width: "100%", height: "100%" }} />
    </div>
  );
};

export default AudioWaveform;
