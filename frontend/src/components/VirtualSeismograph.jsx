import { useState, useRef, useCallback, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useSound } from '@/contexts/SoundContext';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { RotateCcw, Radio } from 'lucide-react';

export const VirtualSeismograph = () => {
  const [data, setData] = useState([]);
  const [magnitude, setMagnitude] = useState(0);
  const [shakeClass, setShakeClass] = useState('');
  const { playEarthquakeSound } = useSound();
  const intervalRef = useRef(null);
  const timeRef = useRef(0);
  const quakeRef = useRef({ active: false, intensity: 0, duration: 0 });

  const generatePoint = useCallback(() => {
    timeRef.current += 1;
    const t = timeRef.current;
    const q = quakeRef.current;
    let value = (Math.random() - 0.5) * 1.5;

    if (q.active && q.duration > 0) {
      const decay = q.duration / 100;
      value += Math.sin(t * 0.5) * q.intensity * decay;
      value += Math.sin(t * 1.3) * q.intensity * 0.5 * decay;
      value += Math.sin(t * 2.7) * q.intensity * 0.3 * decay;
      value += (Math.random() - 0.5) * q.intensity * 0.4 * decay;
      q.duration -= 1;
      if (q.duration <= 0) q.active = false;
    }

    return { time: t, value: Math.max(-10, Math.min(10, value)) };
  }, []);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setData(prev => [...prev, generatePoint()].slice(-250));
    }, 50);
    return () => clearInterval(intervalRef.current);
  }, [generatePoint]);

  const triggerQuake = (level) => {
    const cfg = {
      weak: { intensity: 2, duration: 40, mag: 3.2, shake: 'animate-shake' },
      medium: { intensity: 5, duration: 80, mag: 5.7, shake: 'animate-shake' },
      strong: { intensity: 9, duration: 120, mag: 8.1, shake: 'animate-shake-strong' },
    };
    const c = cfg[level];
    quakeRef.current = { active: true, intensity: c.intensity, duration: c.duration };
    setMagnitude(c.mag);
    playEarthquakeSound(c.intensity / 10);
    setShakeClass(c.shake);
    setTimeout(() => setShakeClass(''), level === 'strong' ? 800 : 500);
  };

  const reset = () => {
    setData([]);
    setMagnitude(0);
    timeRef.current = 0;
    quakeRef.current = { active: false, intensity: 0, duration: 0 };
  };

  const magColor = magnitude > 7 ? 'text-red-400' : magnitude > 4 ? 'text-amber-400' : magnitude > 0 ? 'text-emerald-400' : 'text-muted-foreground';
  const magBg = magnitude > 7 ? 'bg-red-500/10 border-red-500/20' : magnitude > 4 ? 'bg-amber-500/10 border-amber-500/20' : magnitude > 0 ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-muted/50 border-border';

  return (
    <div className={shakeClass} data-testid="seismograph">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <Radio className="w-4 h-4 text-cyan-500" />
          <span className="font-outfit text-sm text-muted-foreground uppercase tracking-wider">Scara Richter:</span>
          <Badge className={`font-mono text-lg px-3 py-1 ${magBg} ${magColor}`} data-testid="richter-badge">
            {magnitude > 0 ? magnitude.toFixed(1) : '—'}
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground font-mono">LIVE</span>
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
        </div>
      </div>

      <div className="glass-card rounded-xl p-4">
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={data}>
            <XAxis dataKey="time" hide />
            <YAxis domain={[-10, 10]} hide />
            <Line type="monotone" dataKey="value" stroke="#06b6d4" strokeWidth={1.5} dot={false} isAnimationActive={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="flex flex-wrap gap-3 mt-4">
        <Button onClick={() => triggerQuake('weak')}
          className="bg-emerald-600/80 hover:bg-emerald-600 text-white font-outfit uppercase tracking-wider text-xs"
          data-testid="quake-weak">
          Cutremur Slab
        </Button>
        <Button onClick={() => triggerQuake('medium')}
          className="bg-amber-600/80 hover:bg-amber-600 text-white font-outfit uppercase tracking-wider text-xs"
          data-testid="quake-medium">
          Cutremur Mediu
        </Button>
        <Button onClick={() => triggerQuake('strong')}
          className="bg-red-600/80 hover:bg-red-600 text-white font-outfit uppercase tracking-wider text-xs"
          data-testid="quake-strong">
          Cutremur Puternic
        </Button>
        <Button onClick={reset} variant="outline" className="ml-auto font-outfit uppercase tracking-wider text-xs"
          data-testid="seismo-reset">
          <RotateCcw className="w-4 h-4 mr-1" /> Reset
        </Button>
      </div>
    </div>
  );
};
