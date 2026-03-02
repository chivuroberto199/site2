import { useRef, useEffect, useState, useCallback } from 'react';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Play, Pause, RotateCcw } from 'lucide-react';

export const WaveSimulator = () => {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const [amplitude, setAmplitude] = useState([50]);
  const [frequency, setFrequency] = useState([2]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [waveType, setWaveType] = useState('p');
  const timeRef = useRef(0);

  const colors = { p: '#06b6d4', s: '#8b5cf6', love: '#f43f5e', rayleigh: '#10b981' };

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;
    const amp = amplitude[0];
    const freq = frequency[0];
    const t = timeRef.current;

    ctx.clearRect(0, 0, w, h);

    // Grid lines
    ctx.strokeStyle = 'rgba(148, 163, 184, 0.08)';
    ctx.lineWidth = 1;
    for (let y = 0; y < h; y += 30) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
    }
    for (let x = 0; x < w; x += 30) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
    }

    // Center line
    ctx.strokeStyle = 'rgba(148, 163, 184, 0.2)';
    ctx.setLineDash([5, 5]);
    ctx.beginPath(); ctx.moveTo(0, h / 2); ctx.lineTo(w, h / 2); ctx.stroke();
    ctx.setLineDash([]);

    const color = colors[waveType];

    // Main wave
    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    ctx.shadowColor = color;
    ctx.shadowBlur = 12;
    ctx.beginPath();

    for (let x = 0; x <= w; x++) {
      const nx = (x / w) * Math.PI * 2 * freq;
      let y;
      switch (waveType) {
        case 's':
          y = h / 2 + Math.sin(nx - t * 0.04) * amp * Math.cos(t * 0.008);
          break;
        case 'love':
          y = h / 2 + Math.sin(nx - t * 0.03) * amp * Math.exp(-x / w * 0.4);
          break;
        case 'rayleigh':
          y = h / 2 + Math.cos(nx - t * 0.035) * amp * Math.exp(-x / w * 0.25);
          break;
        default:
          y = h / 2 + Math.sin(nx - t * 0.05) * amp;
      }
      if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    }
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Particles
    const particleCount = 25;
    for (let i = 0; i < particleCount; i++) {
      const px = (i / particleCount) * w;
      const nx = (px / w) * Math.PI * 2 * freq;
      let py, ppx = px;

      switch (waveType) {
        case 'p':
          ppx = px + Math.cos(nx - t * 0.05) * amp * 0.3;
          py = h / 2;
          break;
        case 's':
          py = h / 2 + Math.sin(nx - t * 0.04) * amp * 0.5 * Math.cos(t * 0.008);
          break;
        case 'love':
          ppx = px + Math.sin(nx - t * 0.03) * amp * 0.25;
          py = h / 2;
          break;
        case 'rayleigh':
          ppx = px + Math.sin(nx - t * 0.035) * amp * 0.2;
          py = h / 2 + Math.cos(nx - t * 0.035) * amp * 0.4;
          break;
        default:
          py = h / 2;
      }

      ctx.beginPath();
      ctx.arc(ppx, py, 4, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.beginPath();
      ctx.arc(ppx, py, 7, 0, Math.PI * 2);
      ctx.strokeStyle = color + '30';
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    // Labels
    ctx.font = '12px JetBrains Mono';
    ctx.fillStyle = 'rgba(148, 163, 184, 0.5)';
    ctx.fillText(`A = ${amp}`, 10, 20);
    ctx.fillText(`f = ${freq} Hz`, 10, 36);

    timeRef.current += 1;
    animRef.current = requestAnimationFrame(draw);
  }, [amplitude, frequency, waveType]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      const ctx = canvas.getContext('2d');
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      canvas.style.width = canvas.offsetWidth + 'px';
      canvas.style.height = canvas.offsetHeight + 'px';
    };
    // Simple resize
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }, []);

  useEffect(() => {
    if (isPlaying) {
      draw();
    } else if (animRef.current) {
      cancelAnimationFrame(animRef.current);
    }
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current); };
  }, [isPlaying, draw]);

  const reset = () => {
    setIsPlaying(false);
    timeRef.current = 0;
    setAmplitude([50]);
    setFrequency([2]);
    const c = canvasRef.current;
    if (c) c.getContext('2d').clearRect(0, 0, c.width, c.height);
  };

  const waveNames = { p: 'Unda P', s: 'Unda S', love: 'Love', rayleigh: 'Rayleigh' };

  return (
    <div data-testid="wave-simulator">
      <div className="glass-card rounded-xl overflow-hidden">
        <canvas ref={canvasRef} className="w-full" style={{ height: '350px' }} data-testid="wave-canvas" />
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-5">
          <div>
            <label className="font-outfit text-sm text-muted-foreground uppercase tracking-wider mb-3 block">
              Amplitudine: <span className="text-foreground font-bold">{amplitude[0]}</span>
            </label>
            <Slider value={amplitude} onValueChange={setAmplitude} min={5} max={100} step={1}
              className="[&_[role=slider]]:bg-cyan-500" data-testid="amplitude-slider" />
          </div>
          <div>
            <label className="font-outfit text-sm text-muted-foreground uppercase tracking-wider mb-3 block">
              Frecventa: <span className="text-foreground font-bold">{frequency[0]} Hz</span>
            </label>
            <Slider value={frequency} onValueChange={setFrequency} min={0.5} max={8} step={0.5}
              className="[&_[role=slider]]:bg-violet-500" data-testid="frequency-slider" />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="font-outfit text-sm text-muted-foreground uppercase tracking-wider mb-3 block">
              Tip unda: <span className="font-bold" style={{ color: colors[waveType] }}>{waveNames[waveType]}</span>
            </label>
            <Tabs value={waveType} onValueChange={setWaveType}>
              <TabsList className="grid grid-cols-4 w-full bg-muted/50">
                <TabsTrigger value="p" className="text-xs font-outfit" data-testid="tab-p">P</TabsTrigger>
                <TabsTrigger value="s" className="text-xs font-outfit" data-testid="tab-s">S</TabsTrigger>
                <TabsTrigger value="love" className="text-xs font-outfit" data-testid="tab-love">Love</TabsTrigger>
                <TabsTrigger value="rayleigh" className="text-xs font-outfit" data-testid="tab-rayleigh">Rayleigh</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="flex gap-3">
            <Button onClick={() => setIsPlaying(!isPlaying)}
              className="flex-1 bg-cyan-600 hover:bg-cyan-700 text-white font-outfit uppercase tracking-wider text-xs glow-cyan"
              data-testid="play-pause-btn">
              {isPlaying ? <><Pause className="w-4 h-4 mr-2" /> Opreste</> : <><Play className="w-4 h-4 mr-2" /> Start</>}
            </Button>
            <Button onClick={reset} variant="outline" className="font-outfit uppercase tracking-wider text-xs"
              data-testid="reset-btn">
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
