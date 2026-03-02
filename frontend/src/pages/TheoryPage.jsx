import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Lightbulb, Zap, Target, Layers, TrendingUp, Radio } from 'lucide-react';

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };
const stagger = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };

const FactBox = ({ children }) => (
  <div className="fact-box pl-6 py-4 pr-4 bg-cyan-500/5 border border-cyan-500/10 rounded-lg my-6">
    <div className="flex items-start gap-2">
      <Lightbulb className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
      <p className="text-sm text-muted-foreground leading-relaxed">{children}</p>
    </div>
  </div>
);

const Section = ({ title, icon: Icon, iconColor, children }) => (
  <motion.div variants={fadeUp} className="mb-16">
    <div className="flex items-center gap-3 mb-6">
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${iconColor}`}>
        <Icon className="w-5 h-5" />
      </div>
      <h3 className="font-outfit font-bold text-2xl">{title}</h3>
    </div>
    <div className="space-y-4 text-muted-foreground leading-relaxed">{children}</div>
  </motion.div>
);

export default function TheoryPage() {
  return (
    <div className="relative z-10 py-24 lg:py-32" data-testid="theory-page">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={stagger}>

          {/* Header */}
          <motion.div variants={fadeUp} className="mb-20">
            <Badge className="bg-violet-500/10 text-violet-400 border-violet-500/20 font-mono text-xs tracking-widest mb-6">PAGINA 2</Badge>
            <h1 className="font-outfit font-bold text-4xl md:text-5xl lg:text-6xl tracking-tight mb-4">Fundamentare Teoretica</h1>
            <p className="text-muted-foreground text-base md:text-lg max-w-2xl">
              Notiuni fundamentale despre undele mecanice, undele seismice si fenomenele asociate cutremurelor de pamant.
            </p>
            <div className="w-20 h-1 bg-violet-500 rounded-full mt-6" />
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main content */}
            <div className="lg:col-span-2">
              <Section title="Undele Mecanice" icon={Zap} iconColor="bg-cyan-500/10 text-cyan-400">
                <p>
                  <strong className="text-foreground">Undele mecanice</strong> sunt perturbatii care se propaga prin medii materiale (solide, lichide sau gazoase) transportand energie fara a transporta materie. Particulele mediului oscileaza in jurul pozitiei de echilibru, transmitand energia de la o particula la alta.
                </p>
                <p>Undele mecanice se clasifica in:</p>
                <ul className="list-none space-y-2 pl-0">
                  <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 shrink-0" /> <span><strong className="text-foreground">Unde longitudinale</strong> — directia de propagare coincide cu directia de oscilatie a particulelor (ex: unde sonore)</span></li>
                  <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-violet-400 mt-2 shrink-0" /> <span><strong className="text-foreground">Unde transversale</strong> — directia de propagare este perpendiculara pe directia de oscilatie (ex: unde pe o coarda)</span></li>
                </ul>
                <FactBox>
                  Undele mecanice nu se pot propaga in vid! Ele au nevoie obligatoriu de un mediu material. Spre deosebire de ele, undele electromagnetice (lumina) se propaga si in vid.
                </FactBox>
              </Section>

              <Section title="Undele Seismice" icon={Radio} iconColor="bg-violet-500/10 text-violet-400">
                <p>
                  <strong className="text-foreground">Undele seismice</strong> sunt un tip special de unde mecanice generate de eliberarea brusca a energiei acumulate in scoarta terestra. Aceasta energie poate fi eliberata prin:
                </p>
                <ul className="list-none space-y-2 pl-0">
                  <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 shrink-0" /> Miscari tectonice (cutremure naturale)</li>
                  <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 shrink-0" /> Activitate vulcanica</li>
                  <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" /> Explozii (naturale sau artificiale)</li>
                  <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 shrink-0" /> Alunecari de teren</li>
                </ul>
                <p>
                  Studiul undelor seismice se numeste <strong className="text-foreground">seismologie</strong> si a permis oamenilor de stiinta sa descopere structura interna a Pamantului, care nu poate fi observata direct.
                </p>
              </Section>

              <Section title="Cum se Produc Cutremurele" icon={Target} iconColor="bg-red-500/10 text-red-400">
                <p>
                  Cutremurele se produc atunci cand tensiunile acumulate in rocile scoartei terestre depasesc limita de rezistenta a acestora. Scoarta Pamantului este formata din <strong className="text-foreground">placi tectonice</strong> — bucati mari de litosfera care „plutesc" pe astenosfera semi-fluida.
                </p>
                <p>
                  La limitele dintre placi, miscarea relativa a acestora genereaza tensiuni. Cand aceste tensiuni sunt eliberate brusc, energia se propaga sub forma de unde seismice.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
                  <Card className="glass-card">
                    <CardContent className="p-4">
                      <h4 className="font-outfit font-bold text-sm text-red-400 mb-2">Hipocentru (Focar)</h4>
                      <p className="text-xs">Punctul din interiorul Pamantului unde se initiaza ruptura si se elibereaza energia. Se mai numeste si <em>focar seismic</em>. Poate fi la adancimi de 0-700 km.</p>
                    </CardContent>
                  </Card>
                  <Card className="glass-card">
                    <CardContent className="p-4">
                      <h4 className="font-outfit font-bold text-sm text-cyan-400 mb-2">Epicentru</h4>
                      <p className="text-xs">Punctul de pe suprafata Pamantului situat exact deasupra hipocentrului. Este locul unde efectele cutremurului sunt de obicei cele mai puternice.</p>
                    </CardContent>
                  </Card>
                </div>
                <FactBox>
                  Cel mai puternic cutremur inregistrat vreodata a avut magnitudinea de 9.5 pe scara Richter si s-a produs in Chile, pe 22 mai 1960. A generat un tsunami care a traversat intregul Ocean Pacific.
                </FactBox>
              </Section>

              <Section title="Propagarea Undelor in Interiorul Pamantului" icon={Layers} iconColor="bg-emerald-500/10 text-emerald-400">
                <p>
                  Pamantul are o structura stratificata, iar undele seismice se comporta diferit in fiecare strat:
                </p>
                <div className="space-y-3 my-4">
                  {[
                    { name: 'Scoarta', depth: '0–70 km', desc: 'Strat solid, subtire. Undele se propaga relativ lent.', color: 'bg-amber-500' },
                    { name: 'Mantaua', depth: '70–2.900 km', desc: 'Strat vasculos. Viteza undelor creste cu adancimea.', color: 'bg-orange-500' },
                    { name: 'Nucleul Extern', depth: '2.900–5.100 km', desc: 'Lichid! Undele S nu se propaga aici.', color: 'bg-red-500' },
                    { name: 'Nucleul Intern', depth: '5.100–6.371 km', desc: 'Solid, din fier si nichel. Temperatura ~5.500°C.', color: 'bg-red-700' },
                  ].map((layer, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 border border-border">
                      <div className={`w-3 h-3 rounded-full mt-1 shrink-0 ${layer.color}`} />
                      <div>
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="font-outfit font-bold text-sm">{layer.name}</span>
                          <Badge variant="outline" className="text-[10px] font-mono">{layer.depth}</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">{layer.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Section>

              <Section title="Relatii Fizice Fundamentale" icon={TrendingUp} iconColor="bg-amber-500/10 text-amber-400">
                <p>Undele seismice respecta relatiile fundamentale ale undelor mecanice:</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
                  <Card className="glass-card">
                    <CardContent className="p-4">
                      <h4 className="font-outfit font-bold text-sm text-cyan-400 mb-3">Viteza undei</h4>
                      <div className="text-center py-3 px-4 bg-muted/30 rounded-lg font-mono text-lg text-foreground">
                        v = &lambda; &middot; f
                      </div>
                      <p className="text-xs text-muted-foreground mt-3">
                        v = viteza [m/s], &lambda; = lungimea de unda [m], f = frecventa [Hz]
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="glass-card">
                    <CardContent className="p-4">
                      <h4 className="font-outfit font-bold text-sm text-violet-400 mb-3">Perioada si frecventa</h4>
                      <div className="text-center py-3 px-4 bg-muted/30 rounded-lg font-mono text-lg text-foreground">
                        T = 1 / f
                      </div>
                      <p className="text-xs text-muted-foreground mt-3">
                        T = perioada [s], f = frecventa [Hz]. Perioada si frecventa sunt invers proportionale.
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <Card className="glass-card">
                  <CardContent className="p-4">
                    <h4 className="font-outfit font-bold text-sm text-emerald-400 mb-3">Lungimea de unda</h4>
                    <div className="text-center py-3 px-4 bg-muted/30 rounded-lg font-mono text-lg text-foreground">
                      &lambda; = v &middot; T = v / f
                    </div>
                    <p className="text-xs text-muted-foreground mt-3">
                      Lungimea de unda (&lambda;) reprezinta distanta dintre doua puncte consecutive aflate in aceeasi faza de oscilatie. Se masoara in metri [m].
                    </p>
                  </CardContent>
                </Card>

                <FactBox>
                  Undele P au viteze intre 5-8 km/s in scoarta si pana la 13 km/s in manta. Undele S sunt cu aproximativ 40% mai lente decat undele P in acelasi mediu.
                </FactBox>
              </Section>
            </div>

            {/* Sidebar */}
            <div className="hidden lg:block">
              <div className="sticky top-24 space-y-6">
                <Card className="glass-card">
                  <CardContent className="p-5">
                    <h4 className="font-outfit font-bold text-sm mb-4 uppercase tracking-wider">Cuprins</h4>
                    <nav className="space-y-2">
                      {['Undele Mecanice', 'Undele Seismice', 'Producerea Cutremurelor', 'Propagarea in Pamant', 'Relatii Fizice'].map((item, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-cyan-400 transition-colors cursor-pointer">
                          <div className="w-1 h-1 rounded-full bg-muted-foreground" />
                          {item}
                        </div>
                      ))}
                    </nav>
                  </CardContent>
                </Card>

                <div className="relative rounded-xl overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1752503577812-1a98d703cd1c?auto=format&fit=crop&w=400&q=80"
                    alt="Straturi geologice"
                    className="w-full h-48 object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
                  <p className="absolute bottom-3 left-3 text-xs font-mono text-muted-foreground">Straturi geologice vizibile</p>
                </div>

                <Card className="glass-card border-amber-500/20">
                  <CardContent className="p-5">
                    <Lightbulb className="w-5 h-5 text-amber-400 mb-3" />
                    <h4 className="font-outfit font-bold text-sm mb-2">Stiati ca?</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      In fiecare zi, pe Pamant se produc in medie 55 de cutremure pe zi care pot fi simtite de oameni. Cele mai multe sunt de magnitudine mica si trec neobservate.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
