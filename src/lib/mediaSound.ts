// Global "only one video can have sound at a time" coordinator. Plain
// module-level state (not React context) since videos live in unrelated
// rows/sections that don't share a component tree ancestor worth wiring up.
type Listener = () => void;

let activeVideo: HTMLVideoElement | null = null;
const listeners = new Set<Listener>();

const notify = () => listeners.forEach((listener) => listener());

export const isSoundActive = (video: HTMLVideoElement) => activeVideo === video;

export const requestSound = (video: HTMLVideoElement) => {
  if (activeVideo && activeVideo !== video) {
    activeVideo.muted = true;
  }
  activeVideo = video;
  video.muted = false;
  notify();
};

export const releaseSound = (video: HTMLVideoElement) => {
  video.muted = true;
  if (activeVideo === video) {
    activeVideo = null;
  }
  notify();
};

export const subscribeSound = (listener: Listener) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};
