import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { MapPin, X } from 'lucide-react';

const zones = [
  { id: 1, name: 'Centura de Foc a Pacificului', x: 87, y: 42, risk: 'high', info: 'Cea mai activa zona seismica din lume, responsabila pentru ~90% din cutremurele globale. Se intinde pe 40.000 km.' },
  { id: 2, name: 'Centura Alpino-Himalayană', x: 58, y: 32, risk: 'high', info: 'Se intinde din Mediterana pana in Asia de Sud-Est. Include Alpii, Carpatii, Himalaya.' },
  { id: 3, name: 'Dorsala Medio-Atlantică', x: 33, y: 42, risk: 'medium', info: 'Lant muntos submarin de 16.000 km, zona de divergenta a placilor tectonice.' },
  { id: 4, name: 'Vrancea, Romania', x: 52, y: 28, risk: 'high', info: 'Zona seismica cea mai activa din Romania. Sursa cutremurelor intermediare cu magnitudini de pana la 7.9 (1977).' },
  { id: 5, name: 'Riftul Est-African', x: 56, y: 56, risk: 'medium', info: 'Zona de extensie continentala activa, unde Africa se desparte in doua placi separate.' },
  { id: 6, name: 'Zona Sundei (Indonezia)', x: 75, y: 52, risk: 'high', info: 'Intersectia placilor Indo-Australiana si Eurasiatica. Sursa tsunamiului din 2004.' },
  { id: 7, name: 'Falia San Andreas', x: 13, y: 35, risk: 'high', info: 'Falie transformanta de 1.300 km in California. Risc major pentru cutremure devastatoare.' },
  { id: 8, name: 'Zona Japoneză', x: 83, y: 30, risk: 'high', info: 'Punct de convergenta a 4 placi tectonice. Una din cele mai active zone seismice.' },
];

export const SeismicMap = () => {
  const [active, setActive] = useState(null);

  return (
    <div className="relative w-full aspect-[2/1] glass-card rounded-xl overflow-hidden" data-testid="seismic-map">
      {/* Dot grid background */}
      <div className="absolute inset-0" style={{
        backgroundImage: 'radial-gradient(circle, rgba(6,182,212,0.06) 1px, transparent 1px)',
        backgroundSize: '18px 18px',
      }} />

      {/* Simplified world outlines */}
      <svg viewBox="0 0 100 60" className="absolute inset-0 w-full h-full" style={{ opacity: 0.15 }}>
        <path d="M8 15 Q12 10 18 14 L22 18 Q20 28 16 30 L10 26 Q6 20 8 15Z" fill="none" stroke="#06b6d4" strokeWidth="0.4"/>
        <path d="M18 34 Q22 32 24 36 L26 45 Q24 52 21 54 L19 50 Q16 42 18 34Z" fill="none" stroke="#06b6d4" strokeWidth="0.4"/>
        <path d="M42 14 Q48 11 54 16 L52 22 Q48 20 44 18 Q40 16 42 14Z" fill="none" stroke="#06b6d4" strokeWidth="0.4"/>
        <path d="M44 26 Q50 24 56 30 L54 42 Q50 48 46 46 Q42 38 44 26Z" fill="none" stroke="#06b6d4" strokeWidth="0.4"/>
        <path d="M56 12 Q68 8 80 14 L82 24 Q76 28 66 24 Q58 18 56 12Z" fill="none" stroke="#06b6d4" strokeWidth="0.4"/>
        <path d="M78 40 Q84 38 88 42 L86 47 Q82 49 78 46Z" fill="none" stroke="#06b6d4" strokeWidth="0.4"/>
      </svg>

      {/* Tectonic boundary lines */}
      <svg viewBox="0 0 100 60" className="absolute inset-0 w-full h-full" style={{ opacity: 0.2 }}>
        <path d="M85 8 Q90 20 87 35 Q83 48 80 55" fill="none" stroke="#ef4444" strokeWidth="0.5" strokeDasharray="2,2"/>
        <path d="M10 8 Q7 20 10 35 Q14 48 18 55" fill="none" stroke="#ef4444" strokeWidth="0.5" strokeDasharray="2,2"/>
        <path d="M28 5 Q30 20 28 40 Q27 50 30 58" fill="none" stroke="#ef4444" strokeWidth="0.5" strokeDasharray="2,2"/>
        <path d="M38 22 Q50 18 65 22 Q78 26 90 22" fill="none" stroke="#ef4444" strokeWidth="0.5" strokeDasharray="2,2"/>
      </svg>

      {/* Zone markers */}
      {zones.map((z) => (
        <button
          key={z.id}
          className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
          style={{ left: `${z.x}%`, top: `${z.y}%` }}
          onClick={() => setActive(active?.id === z.id ? null : z)}
          data-testid={`zone-${z.id}`}
        >
          <span className={`absolute inset-[-6px] rounded-full animate-ping ${
            z.id === 4 ? 'bg-cyan-400/30' : z.risk === 'high' ? 'bg-red-500/20' : 'bg-amber-500/15'
          }`} />
          <span className={`relative block rounded-full ${
            z.id === 4
              ? 'w-4 h-4 bg-cyan-400 shadow-[0_0_16px_rgba(6,182,212,0.8)]'
              : z.risk === 'high'
                ? 'w-3 h-3 bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.6)]'
                : 'w-2.5 h-2.5 bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.6)]'
          }`} />
          <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block whitespace-nowrap bg-card/95 backdrop-blur-sm text-foreground text-xs px-2.5 py-1.5 rounded-md font-manrope border border-border shadow-lg">
            {z.name}
          </span>
        </button>
      ))}

      {/* Active zone info panel */}
      {active && (
        <div className="absolute bottom-3 left-3 right-3 md:left-auto md:right-3 md:w-80 backdrop-blur-xl bg-card/95 border border-border rounded-xl p-4 z-20 shadow-xl" data-testid="zone-info-panel">
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-cyan-500 shrink-0" />
              <h4 className="font-outfit font-bold text-sm">{active.name}</h4>
            </div>
            <div className="flex items-center gap-2">
              <Badge className={`text-xs ${
                active.risk === 'high' ? 'bg-red-500/10 text-red-400 border-red-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
              }`}>
                {active.risk === 'high' ? 'Risc Ridicat' : 'Risc Mediu'}
              </Badge>
              <button onClick={() => setActive(null)} className="text-muted-foreground hover:text-foreground">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          <p className="text-muted-foreground text-xs leading-relaxed">{active.info}</p>
        </div>
      )}

      {/* Legend */}
      <div className="absolute top-3 right-3 flex flex-col gap-1.5 bg-card/80 backdrop-blur-sm rounded-lg p-2.5 border border-border">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_6px_rgba(239,68,68,0.5)]" />
          <span className="text-[10px] text-muted-foreground font-mono uppercase">Risc ridicat</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_6px_rgba(245,158,11,0.5)]" />
          <span className="text-[10px] text-muted-foreground font-mono uppercase">Risc mediu</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_6px_rgba(6,182,212,0.5)]" />
          <span className="text-[10px] text-muted-foreground font-mono uppercase">Romania</span>
        </div>
      </div>
    </div>
  );
};
