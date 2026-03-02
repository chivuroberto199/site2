import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, BookOpen, Video, FileText } from 'lucide-react';

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };
const stagger = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };

const mainSources = [
  {
    title: 'Caracteristicile cutremurelor — INFP Mobee',
    url: 'https://mobee.infp.ro/despre-cutremure/caracteristicile-cutremurelor',
    desc: 'Institutul National de Cercetare-Dezvoltare pentru Fizica Pamantului — informatii despre caracteristicile cutremurelor, tipuri de unde seismice si mecanisme de producere.',
    type: 'web',
  },
  {
    title: 'Undele seismice — FizicHim.ro',
    url: 'https://www.fizichim.ro/docs/fizica/clasa7/capitolul6-unde-mecanice-sunetul/VI-3-undele-seismice/',
    desc: 'Resursa educationala cu explicatii detaliate despre undele seismice, clasificarea lor si efectele cutremurelor, adaptata pentru nivelul liceal.',
    type: 'web',
  },
];

const additionalSources = [
  {
    title: 'Manual de Fizica, clasa a XI-a',
    desc: 'Capitolele despre unde mecanice, propagarea undelor si undele seismice din manualele aprobate de Ministerul Educatiei.',
    type: 'book',
  },
  {
    title: 'IRIS — Incorporated Research Institutions for Seismology',
    url: 'https://www.iris.edu',
    desc: 'Resurse educationale internationale despre seismologie, inclusiv simulari interactive si baze de date seismice.',
    type: 'web',
  },
  {
    title: 'USGS Earthquake Hazards Program',
    url: 'https://earthquake.usgs.gov',
    desc: 'Serviciul Geologic al Statelor Unite — date in timp real despre cutremure, harti si resurse educationale.',
    type: 'web',
  },
  {
    title: 'How do seismic waves move across and thru the Earth (YouTube)',
    url: 'https://www.youtube.com/watch?v=rspUJRjoCQs',
    desc: 'Simulare vizuala a propagarii undelor seismice prin interiorul Pamantului, cu instrumente de analiza interactiva.',
    type: 'video',
  },
  {
    title: 'Earth Seismic Wave Propagation Made Simple (YouTube)',
    url: 'https://www.youtube.com/watch?v=L3-myjAVYv0',
    desc: 'Explicatie accesibila a traseelor undelor seismice, cu exemple de seismograme reale.',
    type: 'video',
  },
  {
    title: 'The Formation of Earthquakes and Seismic Waves (YouTube)',
    url: 'https://www.youtube.com/watch?v=TCtdGGMrgvI',
    desc: 'Documentar Open University despre generarea cutremurelor si propagarea undelor seismice.',
    type: 'video',
  },
];

const typeIcons = { web: ExternalLink, book: FileText, video: Video };

export default function BibliographyPage() {
  return (
    <div className="relative z-10 py-24 lg:py-32" data-testid="bibliography-page">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={stagger}>

          <motion.div variants={fadeUp} className="mb-16">
            <Badge className="bg-slate-500/10 text-slate-400 border-slate-500/20 font-mono text-xs tracking-widest mb-6">PAGINA 6</Badge>
            <h1 className="font-outfit font-bold text-4xl md:text-5xl lg:text-6xl tracking-tight mb-4">Bibliografie</h1>
            <p className="text-muted-foreground text-base md:text-lg max-w-2xl">
              Sursele utilizate in realizarea acestui proiect educational.
            </p>
            <div className="w-20 h-1 bg-slate-500 rounded-full mt-6" />
          </motion.div>

          {/* Main sources */}
          <motion.div variants={fadeUp} className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-cyan-400" />
              </div>
              <h2 className="font-outfit font-bold text-2xl">Surse Principale</h2>
            </div>

            <div className="space-y-4">
              {mainSources.map((s, i) => {
                const Icon = typeIcons[s.type];
                return (
                  <Card key={i} className="glass-card border-cyan-500/10" data-testid={`main-source-${i}`}>
                    <CardContent className="p-5">
                      <div className="flex items-start gap-4">
                        <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center shrink-0 mt-0.5">
                          <Icon className="w-4 h-4 text-cyan-400" />
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <h3 className="font-outfit font-bold text-sm">{s.title}</h3>
                            <Badge variant="outline" className="text-[10px] font-mono">SURSE PRINCIPALE</Badge>
                          </div>
                          <p className="text-muted-foreground text-xs leading-relaxed mb-2">{s.desc}</p>
                          {s.url && (
                            <a href={s.url} target="_blank" rel="noopener noreferrer"
                              className="text-cyan-400 hover:text-cyan-300 text-xs font-mono break-all transition-colors inline-flex items-center gap-1">
                              {s.url} <ExternalLink className="w-3 h-3 shrink-0" />
                            </a>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </motion.div>

          {/* Additional sources */}
          <motion.div variants={fadeUp}>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-lg bg-violet-500/10 flex items-center justify-center">
                <FileText className="w-5 h-5 text-violet-400" />
              </div>
              <h2 className="font-outfit font-bold text-2xl">Resurse Suplimentare</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {additionalSources.map((s, i) => {
                const Icon = typeIcons[s.type];
                return (
                  <Card key={i} className="glass-card" data-testid={`additional-source-${i}`}>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="w-7 h-7 rounded-md bg-violet-500/10 flex items-center justify-center shrink-0 mt-0.5">
                          <Icon className="w-3.5 h-3.5 text-violet-400" />
                        </div>
                        <div className="min-w-0">
                          <h3 className="font-outfit font-bold text-xs mb-1">{s.title}</h3>
                          <p className="text-muted-foreground text-[11px] leading-relaxed mb-1.5">{s.desc}</p>
                          {s.url && (
                            <a href={s.url} target="_blank" rel="noopener noreferrer"
                              className="text-violet-400 hover:text-violet-300 text-[10px] font-mono break-all transition-colors inline-flex items-center gap-1">
                              {s.url} <ExternalLink className="w-2.5 h-2.5 shrink-0" />
                            </a>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
