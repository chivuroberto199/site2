import { createContext, useContext, useState, useRef, useCallback } from 'react';

const SoundContext = createContext();

export function SoundProvider({ children }) {
  const [isMuted, setIsMuted] = useState(false);
  const audioCtxRef = useRef(null);

  const getAudioContext = useCallback(() => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  }, []);

  const playEarthquakeSound = useCallback((intensity = 0.5) => {
    if (isMuted) return;
    try {
      const ctx = getAudioContext();
      const osc = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();
      const gain2 = ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(35 + intensity * 25, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(15, ctx.currentTime + 2);

      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(60 + intensity * 40, ctx.currentTime);
      osc2.frequency.exponentialRampToValueAtTime(25, ctx.currentTime + 1.5);

      gain.gain.setValueAtTime(Math.min(intensity * 0.25, 0.3), ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 2);

      gain2.gain.setValueAtTime(Math.min(intensity * 0.15, 0.2), ctx.currentTime);
      gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.5);

      osc.connect(gain).connect(ctx.destination);
      osc2.connect(gain2).connect(ctx.destination);
      osc.start();
      osc2.start();
      osc.stop(ctx.currentTime + 2);
      osc2.stop(ctx.currentTime + 1.5);
    } catch (e) {
      console.warn('Audio not available:', e);
    }
  }, [isMuted, getAudioContext]);

  const toggleMute = () => setIsMuted(prev => !prev);

  return (
    <SoundContext.Provider value={{ isMuted, toggleMute, playEarthquakeSound }}>
      {children}
    </SoundContext.Provider>
  );
}

export const useSound = () => useContext(SoundContext);
