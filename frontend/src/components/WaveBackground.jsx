import { useRef, useEffect } from 'react';

export const WaveBackground = () => {
  const canvasRef = useRef(null);
  const animRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const drawWave = (yOff, amp, freq, speed, color, lw) => {
      ctx.beginPath();
      ctx.strokeStyle = color;
      ctx.lineWidth = lw;
      for (let x = 0; x <= canvas.width; x += 2) {
        const y = yOff + Math.sin((x * freq) / 100 + time * speed) * amp
          + Math.sin((x * freq * 0.5) / 100 + time * speed * 1.3) * amp * 0.3;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawWave(canvas.height * 0.25, 25, 1.8, 0.012, 'rgba(6, 182, 212, 0.07)', 1.5);
      drawWave(canvas.height * 0.40, 30, 1.4, 0.018, 'rgba(139, 92, 246, 0.05)', 1);
      drawWave(canvas.height * 0.55, 20, 2.2, 0.015, 'rgba(6, 182, 212, 0.06)', 1.2);
      drawWave(canvas.height * 0.70, 35, 1.0, 0.010, 'rgba(139, 92, 246, 0.04)', 1);
      drawWave(canvas.height * 0.85, 28, 1.6, 0.020, 'rgba(6, 182, 212, 0.05)', 1);
      time += 1;
      animRef.current = requestAnimationFrame(animate);
    };

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!mq.matches) animate();

    return () => {
      window.removeEventListener('resize', resize);
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0, opacity: 0.7 }}
      aria-hidden="true"
    />
  );
};
