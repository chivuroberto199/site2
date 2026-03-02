import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { WaveSimulator } from '@/components/WaveSimulator';
import { VirtualSeismograph } from '@/components/VirtualSeismograph';
import { SeismicMap } from '@/components/SeismicMap';
import { Waves, Radio, Play, MapPin } from 'lucide-react';

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };
const stagger = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };

const videos = [
  { id: 'rspUJRjoCQs', title: 'Propagarea undelor seismice prin Pamant', desc: 'Simulare interactiva IRIS - vizualizarea modului in care undele P, S si de suprafata se propaga prin interiorul Pamantului.' },
  { id: 'L3-myjAVYv0', title: 'Undele seismice explicate simplu', desc: 'Demonstratie practica a traseelor undelor seismice, cu exemple de seismograme reale.' },
  { id: 'TCtdGGMrgvI', title: 'Formarea cutremurelor si undele seismice', desc: 'Documentar despre generarea undelor, functionarea seismometrelor si retelele de detectie.' },
];

export default function ApplicationsPage() {
  return (
    <div className="relative z-10 py-24 lg:py-32" data-testid="applications-page">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.05 }} variants={stagger}>

          {/* Header */}
          <motion.div variants={fadeUp} className="mb-20">
            <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 font-mono text-xs tracking-widest mb-6">PAGINA 4</Badge>
            <h1 className="font-outfit font-bold text-4xl md:text-5xl lg:text-6xl tracking-tight mb-4">Aplicatii Virtuale</h1>
            <p className="text-muted-foreground text-base md:text-lg max-w-2xl">
              Simulari interactive, seismograf virtual si videoclipuri educationale pentru intelegerea practica a undelor seismice.
            </p>
            <div className="w-20 h-1 bg-emerald-500 rounded-full mt-6" />
          </motion.div>

          {/* Wave Simulator */}
          <motion.div variants={fadeUp} className="mb-20">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center">
                <Waves className="w-5 h-5 text-cyan-400" />
              </div>
              <div>
                <h2 className="font-outfit font-bold text-2xl">Simulare Unda</h2>
                <p className="text-muted-foreground text-sm">Ajusteaza amplitudinea, frecventa si tipul undei</p>
              </div>
            </div>
            <WaveSimulator />
          </motion.div>

          {/* Seismograph */}
          <motion.div variants={fadeUp} className="mb-20">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                <Radio className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <h2 className="font-outfit font-bold text-2xl">Seismograf Virtual</h2>
                <p className="text-muted-foreground text-sm">Simuleaza cutremure de diferite intensitati si observa inregistrarea in timp real</p>
              </div>
            </div>
            <VirtualSeismograph />
          </motion.div>

          {/* Seismic Map */}
          <motion.div variants={fadeUp} className="mb-20">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
                <MapPin className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <h2 className="font-outfit font-bold text-2xl">Harta Zonelor Seismice</h2>
                <p className="text-muted-foreground text-sm">Exploreaza principalele zone seismice ale lumii — click pe un punct pentru detalii</p>
              </div>
            </div>
            <SeismicMap />
          </motion.div>

          {/* YouTube Videos */}
          <motion.div variants={fadeUp}>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center">
                <Play className="w-5 h-5 text-red-400" />
              </div>
              <div>
                <h2 className="font-outfit font-bold text-2xl">Videoclipuri Educationale</h2>
                <p className="text-muted-foreground text-sm">Materiale video pentru o intelegere mai profunda</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6" data-testid="videos-grid">
              {videos.map((v, i) => (
                <Card key={i} className="glass-card overflow-hidden" data-testid={`video-card-${i}`}>
                  <div className="relative aspect-video">
                    <iframe
                      src={`https://www.youtube.com/embed/${v.id}`}
                      title={v.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="absolute inset-0 w-full h-full"
                      loading="lazy"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-outfit font-bold text-sm mb-1">{v.title}</h3>
                    <p className="text-muted-foreground text-xs leading-relaxed">{v.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
