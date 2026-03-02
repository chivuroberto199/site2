import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ArrowRight, Zap } from 'lucide-react';

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };
const stagger = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };

/* Mini canvas animation for each wave type */
const WaveAnimation = ({ type, color, isActive }) => {
  const canvasRef = useRef(null);
  const animRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    let t = 0;

    const draw = () => {
      const w = canvas.width, h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      // Draw dots grid
      const rows = 8, cols = 20;
      const dx = w / (cols + 1), dy = h / (rows + 1);

      for (let r = 1; r <= rows; r++) {
        for (let c = 1; c <= cols; c++) {
          let x = c * dx, y = r * dy;
          const phase = (c * 0.4) - t * 0.06;

          switch (type) {
            case 'p': // Longitudinal compression
              x += Math.cos(phase) * 8;
              break;
            case 's': // Transverse
              y += Math.sin(phase) * 10;
              break;
            case 'love': // Horizontal shear
              x += Math.sin(phase) * 8 * Math.exp(-r / rows * 0.5);
              break;
            case 'rayleigh': // Retrograde elliptical
              x += Math.sin(phase) * 6 * Math.exp(-r / rows * 0.3);
              y += Math.cos(phase) * 8 * Math.exp(-r / rows * 0.3);
              break;
            default: break;
          }

          ctx.beginPath();
          ctx.arc(x, y, 2.5, 0, Math.PI * 2);
          ctx.fillStyle = color + (r <= 2 ? 'cc' : '66');
          ctx.fill();
        }
      }

      // Direction arrow
      ctx.strokeStyle = color + '40';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(20, h / 2);
      ctx.lineTo(w - 20, h / 2);
      ctx.stroke();
      ctx.setLineDash([]);

      t += 1;
      if (isActive) animRef.current = requestAnimationFrame(draw);
    };

    if (isActive) draw();
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current); };
  }, [type, color, isActive]);

  return <canvas ref={canvasRef} className="w-full h-full" />;
};

const waveData = [
  {
    key: 'p',
    name: 'Unde P',
    fullName: 'Unde Primare (Longitudinale)',
    color: '#06b6d4',
    colorClass: 'text-cyan-400',
    bgClass: 'bg-cyan-500/10',
    borderClass: 'border-cyan-500/20',
    speed: '5–8 km/s (scoarta), pana la 13 km/s (manta)',
    medium: 'Solide, lichide si gazoase',
    motion: 'Compresie si dilatare (paralela cu directia de propagare)',
    characteristics: [
      'Cele mai rapide unde seismice — ajung primele la seismograf',
      'Se propaga prin toate mediile, inclusiv lichide',
      'Produc miscari de compresie/extensie in directia de propagare',
      'Sunt detectabile in umbra seismica a nucleului (refractate)',
    ],
    description: 'Undele P (primare) sunt unde longitudinale — particulele mediului oscileaza in aceeasi directie cu propagarea undei. Sunt cele mai rapide unde seismice si primele care ajung la statiile de inregistrare.',
  },
  {
    key: 's',
    name: 'Unde S',
    fullName: 'Unde Secundare (Transversale)',
    color: '#8b5cf6',
    colorClass: 'text-violet-400',
    bgClass: 'bg-violet-500/10',
    borderClass: 'border-violet-500/20',
    speed: '3–5 km/s (scoarta), ~7 km/s (manta)',
    medium: 'Doar solide',
    motion: 'Perpendiculara pe directia de propagare',
    characteristics: [
      'A doua unda care ajunge la seismograf',
      'NU se propaga prin lichide (de aceea nu trec prin nucleul extern)',
      'Produc miscari de forfecare perpendiculare pe directia de propagare',
      'Absenta lor in umbra seismica a demonstrat ca nucleul extern este lichid',
    ],
    description: 'Undele S (secundare) sunt unde transversale — particulele oscileaza perpendicular pe directia de propagare. Nu pot traversa medii lichide, fapt esential in descoperirea nucleului extern lichid.',
  },
  {
    key: 'love',
    name: 'Unde Love',
    fullName: 'Unde de suprafata Love',
    color: '#f43f5e',
    colorClass: 'text-rose-400',
    bgClass: 'bg-rose-500/10',
    borderClass: 'border-rose-500/20',
    speed: '2–4.5 km/s',
    medium: 'Suprafata solida stratificata',
    motion: 'Orizontala, perpendiculara pe directia de propagare',
    characteristics: [
      'Se propaga doar pe suprafata Pamantului',
      'Produc miscarea orizontala a solului (laterala)',
      'Foarte distructive pentru cladiri (miscare de forfecare orizontala)',
      'Descoperite de matematicianul A.E.H. Love in 1911',
    ],
    description: 'Undele Love sunt unde de suprafata care produc miscari orizontale de forfecare. Sunt extrem de distructive pentru constructii deoarece deplaseaza fundatiile lateral.',
  },
  {
    key: 'rayleigh',
    name: 'Unde Rayleigh',
    fullName: 'Unde de suprafata Rayleigh',
    color: '#10b981',
    colorClass: 'text-emerald-400',
    bgClass: 'bg-emerald-500/10',
    borderClass: 'border-emerald-500/20',
    speed: '2–4 km/s',
    medium: 'Suprafata solida',
    motion: 'Eliptica retrograda (combinatie verticala + orizontala)',
    characteristics: [
      'Cele mai lente dintre toate undele seismice',
      'Produc o miscare „de rulare" similara valurilor oceanice',
      'Traiectoria particulelor este eliptica retrograda',
      'Pot cauza distrugeri semnificative la suprafata',
    ],
    description: 'Undele Rayleigh sunt unde de suprafata cu miscare eliptica retrograda. Particulele se deplaseaza pe traiectorii eliptice, combinand miscarea verticala cu cea orizontala, similar valurilor de pe ocean.',
  },
];

export default function WaveTypesPage() {
  const [activeTab, setActiveTab] = useState('p');

  return (
    <div className="relative z-10 py-24 lg:py-32" data-testid="wave-types-page">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={stagger}>

          <motion.div variants={fadeUp} className="mb-16">
            <Badge className="bg-rose-500/10 text-rose-400 border-rose-500/20 font-mono text-xs tracking-widest mb-6">PAGINA 3</Badge>
            <h1 className="font-outfit font-bold text-4xl md:text-5xl lg:text-6xl tracking-tight mb-4">Tipuri de Unde Seismice</h1>
            <p className="text-muted-foreground text-base md:text-lg max-w-2xl">
              Exista patru tipuri principale de unde seismice, clasificate in unde de volum (P si S) si unde de suprafata (Love si Rayleigh).
            </p>
            <div className="w-20 h-1 bg-rose-500 rounded-full mt-6" />
          </motion.div>

          {/* Interactive tabs */}
          <motion.div variants={fadeUp}>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-12">
              <TabsList className="grid grid-cols-4 w-full max-w-lg bg-muted/50" data-testid="wave-tabs">
                {waveData.map(w => (
                  <TabsTrigger key={w.key} value={w.key} className="font-outfit text-xs uppercase tracking-wider" data-testid={`wave-tab-${w.key}`}>
                    <span className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: w.color }} />
                    {w.name}
                  </TabsTrigger>
                ))}
              </TabsList>

              {waveData.map(w => (
                <TabsContent key={w.key} value={w.key}>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
                    {/* Animation */}
                    <Card className="glass-card overflow-hidden">
                      <CardContent className="p-0">
                        <div className="h-[280px] relative">
                          <WaveAnimation type={w.key} color={w.color} isActive={activeTab === w.key} />
                          <div className="absolute top-3 left-3">
                            <Badge className={`${w.bgClass} ${w.colorClass} ${w.borderClass} font-mono text-xs`}>
                              {w.name.toUpperCase()}
                            </Badge>
                          </div>
                          <div className="absolute bottom-3 right-3 text-[10px] font-mono text-muted-foreground">
                            Directia de propagare <ArrowRight className="w-3 h-3 inline" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Info */}
                    <div className="space-y-4">
                      <h3 className={`font-outfit font-bold text-2xl ${w.colorClass}`}>{w.fullName}</h3>
                      <p className="text-muted-foreground leading-relaxed text-sm">{w.description}</p>

                      <div className="grid grid-cols-1 gap-3">
                        {[
                          { label: 'Viteza', value: w.speed },
                          { label: 'Mediu', value: w.medium },
                          { label: 'Miscare', value: w.motion },
                        ].map((item, i) => (
                          <div key={i} className="flex gap-3 items-start text-sm">
                            <span className="font-outfit font-bold text-xs uppercase tracking-wider text-muted-foreground w-16 shrink-0 pt-0.5">{item.label}</span>
                            <span className="text-foreground">{item.value}</span>
                          </div>
                        ))}
                      </div>

                      <div className="pt-2">
                        <h4 className="font-outfit font-bold text-sm mb-3 flex items-center gap-2">
                          <Zap className="w-4 h-4" style={{ color: w.color }} />
                          Caracteristici
                        </h4>
                        <ul className="space-y-2">
                          {w.characteristics.map((c, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                              <span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: w.color }} />
                              {c}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </motion.div>

          {/* Comparison table */}
          <motion.div variants={fadeUp}>
            <h2 className="font-outfit font-bold text-2xl mb-6">Comparatie Interactiva</h2>
            <Card className="glass-card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm" data-testid="comparison-table">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left p-4 font-outfit font-bold text-xs uppercase tracking-wider text-muted-foreground">Proprietate</th>
                      {waveData.map(w => (
                        <th key={w.key} className="text-left p-4 font-outfit font-bold text-xs uppercase tracking-wider" style={{ color: w.color }}>
                          {w.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { prop: 'Tip', values: ['Volum (longitudinala)', 'Volum (transversala)', 'Suprafata', 'Suprafata'] },
                      { prop: 'Viteza', values: ['Cea mai rapida', 'A 2-a', 'A 3-a', 'Cea mai lenta'] },
                      { prop: 'Mediu', values: ['Solid + Lichid + Gaz', 'Medii solide', 'Suprafata solida', 'Suprafata solida'] },
                      { prop: 'Miscare particule', values: ['Longitudinala', 'Transversala', 'Orizontala', 'Eliptica'] },
                      { prop: 'Distructivitate', values: ['Moderata', 'Moderata', 'Ridicata', 'Ridicata'] },
                      { prop: 'Detectie', values: ['Prima la seismograf', 'A doua la seismograf', 'Dupa undele P si S', 'Ultima'] },
                    ].map((row, i) => (
                      <tr key={i} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                        <td className="p-4 font-outfit font-bold text-xs text-muted-foreground">{row.prop}</td>
                        {row.values.map((v, j) => (
                          <td key={j} className="p-4 text-xs text-muted-foreground">{v}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
