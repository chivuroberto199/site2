import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { WaveBackground } from '@/components/WaveBackground';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Activity, Waves, Globe, BookOpen, Users, GraduationCap } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};
const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } }
};

export default function HomePage() {
  return (
    <div className="relative">
      <WaveBackground />

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden" data-testid="hero-section">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at center, rgba(6,182,212,0.12) 0%, transparent 70%)' }} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <motion.div initial="hidden" animate="visible" variants={stagger} className="text-center">
            <motion.div variants={fadeUp}>
              <Badge className="bg-cyan-500/10 text-cyan-400 border-cyan-500/20 mb-8 font-mono text-xs tracking-widest px-4 py-1.5" data-testid="project-badge">
                PROIECT FIZICA — Clasa a XI-a A
              </Badge>
            </motion.div>

            <motion.h1 variants={fadeUp} className="font-outfit font-black text-5xl sm:text-6xl lg:text-8xl tracking-tighter uppercase leading-[0.9] mb-8" data-testid="hero-title">
              <span className="block">UNDE</span>
              <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(135deg, #06b6d4 0%, #8b5cf6 100%)' }}>
                SEISMICE
              </span>
            </motion.h1>

            <motion.p variants={fadeUp} className="font-manrope text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              Studiul Cutremurelor si al Propagarii Vibratiilor in Pamant
            </motion.p>

            <motion.div variants={fadeUp}>
              <Link to="/teorie" className="inline-flex items-center gap-3 bg-cyan-600 hover:bg-cyan-700 text-white font-outfit font-bold uppercase tracking-widest text-sm py-4 px-10 rounded-md glow-cyan transition-all duration-300" data-testid="explore-btn">
                Exploreaza Proiectul <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </motion.div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
          <span className="text-xs font-mono tracking-widest">SCROLL</span>
          <div className="w-px h-10 bg-gradient-to-b from-cyan-500/50 to-transparent" />
        </div>
      </section>

      {/* Team */}
      <section className="relative z-10 py-24 lg:py-32" data-testid="team-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={stagger}>
            <motion.div variants={fadeUp} className="mb-16">
              <h2 className="font-outfit font-bold text-4xl md:text-5xl mb-4">Echipa Proiectului</h2>
              <div className="w-20 h-1 bg-cyan-500 rounded-full" />
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              {['Chivu Roberto Alexandru', 'Iorga Alexandru Cristian', 'Alexe Andrei Claudiu'].map((name, i) => (
                <motion.div key={i} variants={fadeUp}>
                  <Card className="glass-card transition-all duration-300 hover:-translate-y-1" data-testid={`author-card-${i}`}>
                    <CardContent className="p-6 text-center">
                      <div className="w-14 h-14 rounded-full bg-cyan-500/10 flex items-center justify-center mx-auto mb-4">
                        <Users className="w-6 h-6 text-cyan-400" />
                      </div>
                      <h3 className="font-outfit font-bold text-lg">{name}</h3>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <motion.div variants={fadeUp}>
              <Card className="glass-card max-w-md mx-auto" data-testid="school-card">
                <CardContent className="p-6 text-center">
                  <GraduationCap className="w-8 h-8 text-violet-400 mx-auto mb-3" />
                  <h3 className="font-outfit font-bold text-lg">Colegiul National „Tudor Vladimirescu"</h3>
                  <p className="text-muted-foreground text-sm mt-1">Anul scolar 2025–2026</p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Intro */}
      <section className="relative z-10 py-24 lg:py-32" data-testid="intro-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={stagger}>
            <motion.div variants={fadeUp} className="mb-16">
              <h2 className="font-outfit font-bold text-4xl md:text-5xl mb-4">Ce sunt Undele Seismice?</h2>
              <div className="w-20 h-1 bg-violet-500 rounded-full" />
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              <motion.div variants={fadeUp} className="space-y-6">
                <p className="text-muted-foreground leading-relaxed">
                  <strong className="text-cyan-400 font-semibold">Undele seismice</strong> sunt vibratii care se propaga prin interiorul si pe suprafata Pamantului, generate de eliberarea brusca de energie din scoarta terestra. Acestea sunt principalul mecanism prin care cutremurele isi transmit energia.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Studiul undelor seismice este esential pentru intelegerea structurii interne a Pamantului, pentru predictia si monitorizarea activitatii seismice, si pentru protejarea populatiei impotriva dezastrelor naturale.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Prin analiza modului in care aceste unde calatoresc prin diferite straturi ale Pamantului, oamenii de stiinta au reusit sa cartografieze structura interna a planetei noastre — de la scoarta si manta, pana la nucleul extern lichid si nucleul intern solid.
                </p>

                <div className="relative overflow-hidden rounded-xl mt-8">
                  <img
                    src="https://images.unsplash.com/photo-1582617012849-36e9c476245a?auto=format&fit=crop&w=800&q=80"
                    alt="Efectele cutremurelor"
                    className="w-full h-48 object-cover rounded-xl"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                  <p className="absolute bottom-3 left-3 text-xs text-muted-foreground font-mono">Efectele cutremurelor asupra cladirilor</p>
                </div>
              </motion.div>

              <motion.div variants={fadeUp}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { icon: Activity, title: 'Monitorizare', desc: 'Detectarea si inregistrarea cutremurelor in timp real', color: 'text-cyan-400' },
                    { icon: Globe, title: 'Structura Pamantului', desc: 'Cartografierea straturilor interne ale planetei', color: 'text-violet-400' },
                    { icon: Waves, title: 'Propagare', desc: 'Studiul vitezei si directiei undelor seismice', color: 'text-rose-400' },
                    { icon: BookOpen, title: 'Educatie', desc: 'Intelegerea fenomenelor naturale si prevenirea dezastrelor', color: 'text-emerald-400' },
                  ].map((item, i) => (
                    <Card key={i} className="glass-card transition-all duration-300">
                      <CardContent className="p-5">
                        <item.icon className={`w-6 h-6 mb-3 ${item.color}`} />
                        <h4 className="font-outfit font-bold text-sm mb-1">{item.title}</h4>
                        <p className="text-muted-foreground text-xs leading-relaxed">{item.desc}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative z-10 py-20 border-t border-border" data-testid="stats-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '500,000+', label: 'Cutremure detectate anual' },
              { value: '~8 km/s', label: 'Viteza undelor P' },
              { value: '6,371 km', label: 'Raza Pamantului' },
              { value: '4 tipuri', label: 'Unde seismice principale' },
            ].map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center">
                <div className="font-outfit font-black text-2xl sm:text-3xl md:text-4xl text-transparent bg-clip-text mb-2" style={{ backgroundImage: 'linear-gradient(135deg, #06b6d4, #8b5cf6)' }}>
                  {s.value}
                </div>
                <p className="text-muted-foreground text-xs sm:text-sm">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
