import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { MapPin, X } from 'lucide-react';

const zones = [
  { id: 1, name: 'Centura de Foc a Pacificului', x: -150, y: 0, risk: 'high', info: 'Cea mai activa zona seismica din lume, responsabila pentru ~90% din cutremurele globale. Se intinde pe 40.000 km.' },
  { id: 2, name: 'Centura Alpino-Himalayană', x: 70, y: 35, risk: 'high', info: 'Se intinde din Mediterana pana in Asia de Sud-Est. Include Alpii, Carpatii, Himalaya.' },
  { id: 3, name: 'Dorsala Medio-Atlantică', x: -30, y: 0, risk: 'medium', info: 'Lant muntos submarin de 16.000 km, zona de divergenta a placilor tectonice.' },
  { id: 4, name: 'Vrancea, Romania', x: 24.5, y: 53, risk: 'high', info: 'Zona seismica cea mai activa din Romania. Sursa cutremurelor intermediare cu magnitudini de pana la 7.9 (1977).' },
  { id: 5, name: 'Riftul Est-African', x: 35, y: -5, risk: 'medium', info: 'Zona de extensie continentala activa, unde Africa se desparte in doua placi separate.' },
  { id: 6, name: 'Zona Sundei (Indonezia)', x: 100, y: -3, risk: 'high', info: 'Intersectia placilor Indo-Australiana si Eurasiatica. Sursa tsunamiului din 2004.' },
  { id: 7, name: 'Falia San Andreas', x: -120, y: 36, risk: 'high', info: 'Falie transformanta de 1.300 km in California. Risc major pentru cutremure devastatoare.' },
  { id: 8, name: 'Zona Japoneză', x: 140, y: 36, risk: 'high', info: 'Punct de convergenta a 4 placi tectonice. Una din cele mai active zone seismice.' },
];

export const SeismicMap = () => {
  const [active, setActive] = useState(null);

  // Projection: converts longitude (x) & latitude (y) to %
  const project = (lng, lat) => {
    const x = ((lng + 180) / 360) * 100;
    const y = ((90 - lat) / 180) * 100;
    return { x, y };
  };

  return (
    <div className="relative w-full aspect-[2/1] glass-card rounded-xl overflow-hidden" data-testid="seismic-map">

      {/* ================= WORLD MAP BACKGROUND ================= */}
      {/* PUT YOUR 2:1 EQUIRECTANGULAR WORLD MAP IMAGE BELOW */}
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/6/6b/Blank_Map_of_The_World_Equirectangular_Projection.png"   // ← replace with your image
        alt="World Map"
        className="absolute inset-0 w-full h-full object-cover opacity-25 pointer-events-none"
      />

      {/* ================= REAL TECTONIC PLATE BOUNDARIES ================= */}
      {/* ================================================================ */}

      {/* Zone markers */}
{zones.map((z) => {
  const projected = project(z.x, z.y);

  return (
    <button
      key={z.id}
      className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
      style={{ left: `${projected.x}%`, top: `${projected.y}%` }}
      onClick={() => setActive(active?.id === z.id ? null : z)}
      data-testid={`zone-${z.id}`}
    >
      {/* Reduced ping area from -6px to -4px */}
      <span className={`absolute inset-[-4px] rounded-full animate-ping ${
        z.id === 4 ? 'bg-cyan-400/30' : z.risk === 'high' ? 'bg-red-500/20' : 'bg-amber-500/15'
      }`} />
      
      {/* Reduced W/H for all three states */}
      <span className={`relative block rounded-full ${
        z.id === 4
          ? 'w-1 h-1 bg-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.8)]' // was w-4 h-4
          : z.risk === 'high'
          ? 'w-1 h-1 bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]'    // was w-3 h-3
          : 'w-1 h-1 bg-amber-500 shadow-[0_0_6px_rgba(245,158,11,0.6)]' // was w-2.5 h-2.5
      }`} />
      
      <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block whitespace-nowrap bg-card/95 backdrop-blur-sm text-foreground text-[10px] px-2 py-1 rounded-md font-manrope border border-border shadow-lg">
        {z.name}
      </span>
    </button>
  );
})}

      {/* Active zone info panel */}
      {active && (
        <div className="absolute bottom-3 left-3 right-3 md:right-auto md:left-3 md:w-80 backdrop-blur-xl bg-card/95 border border-border rounded-xl p-4 z-20 shadow-xl" data-testid="zone-info-panel">
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
