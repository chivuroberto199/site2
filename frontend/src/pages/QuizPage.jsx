import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, XCircle, RotateCcw, Trophy, ExternalLink, Gamepad2 } from 'lucide-react';

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };
const stagger = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };

const questions = [
  {
    q: 'Ce tip de unda seismica ajunge primul la un seismograf?',
    options: ['Unde S', 'Unde Love', 'Unde P', 'Unde Rayleigh'],
    correct: 2,
    explanation: 'Undele P (primare) sunt cele mai rapide unde seismice, cu viteze de 5-8 km/s in scoarta.'
  },
  {
    q: 'Care tip de unde seismice NU se propaga prin lichide?',
    options: ['Unde P', 'Unde S', 'Unde Love', 'Toate se propaga prin lichide'],
    correct: 1,
    explanation: 'Undele S (transversale) nu se propaga prin lichide. Aceasta proprietate a demonstrat ca nucleul extern al Pamantului este lichid.'
  },
  {
    q: 'Ce instrument masoara intensitatea cutremurelor?',
    options: ['Barometru', 'Termometru', 'Seismograf', 'Anemometru'],
    correct: 2,
    explanation: 'Seismograful (sau seismometrul) este instrumentul folosit pentru detectarea si inregistrarea undelor seismice.'
  },
  {
    q: 'Ce este epicentrul unui cutremur?',
    options: [
      'Punctul din interiorul Pamantului unde se initiaza ruptura',
      'Punctul de pe suprafata situat deasupra hipocentrului',
      'Cel mai indepartat punct afectat de cutremur',
      'Centrul scoartei terestre'
    ],
    correct: 1,
    explanation: 'Epicentrul este punctul de pe suprafata Pamantului situat exact deasupra hipocentrului (focarului seismic).'
  },
  {
    q: 'Care este formula vitezei unei unde?',
    options: ['v = f / lambda', 'v = lambda * f', 'v = lambda / f', 'v = f * T'],
    correct: 1,
    explanation: 'Viteza undei se calculeaza cu formula v = lambda * f, unde lambda este lungimea de unda si f este frecventa.'
  },
  {
    q: 'Cum se numeste punctul de origine al cutremurului din interiorul Pamantului?',
    options: ['Epicentru', 'Hipocentru (Focar)', 'Centru seismic', 'Nodul tectonic'],
    correct: 1,
    explanation: 'Hipocentrul sau focarul seismic este punctul din interiorul Pamantului unde incepe ruptura si se elibereaza energia.'
  },
  {
    q: 'Ce tip de miscare produc undele Rayleigh?',
    options: ['Liniara', 'Circulara', 'Eliptica retrograda', 'Longitudinala'],
    correct: 2,
    explanation: 'Undele Rayleigh produc o miscare eliptica retrograda, combinand deplasarea verticala cu cea orizontala.'
  },
  {
    q: 'Ce scara se foloseste pentru masurarea magnitudinii cutremurelor?',
    options: ['Scara Beaufort', 'Scara Richter', 'Scara Celsius', 'Scara Mohs'],
    correct: 1,
    explanation: 'Scara Richter (sau scara magnitudinii locale) masoara magnitudinea cutremurelor pe baza amplitudinii undelor seismice inregistrate.'
  },
  {
    q: 'Cine a descoperit undele de suprafata cu miscare orizontala?',
    options: ['Lord Rayleigh', 'A.E.H. Love', 'Charles Richter', 'Alfred Wegener'],
    correct: 1,
    explanation: 'Matematicianul britanic A.E.H. Love a descris matematic aceste unde de suprafata in 1911.'
  },
  {
    q: 'De ce sunt undele de suprafata mai distructive decat undele de volum?',
    options: [
      'Au frecventa mai mare',
      'Se propaga mai repede',
      'Au amplitudine mai mare si se atenueaza mai lent',
      'Sunt mai calde'
    ],
    correct: 2,
    explanation: 'Undele de suprafata au amplitudini mai mari si se atenueaza mai lent cu distanta, producand cele mai puternice miscari la suprafata.'
  },
];

export default function QuizPage() {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [answers, setAnswers] = useState([]);

  const handleSelect = (idx) => {
    if (showResult) return;
    setSelected(idx);
    setShowResult(true);
    const isCorrect = idx === questions[currentQ].correct;
    if (isCorrect) setScore(s => s + 1);
    setAnswers(prev => [...prev, { question: currentQ, selected: idx, correct: questions[currentQ].correct, isCorrect }]);
  };

  const nextQuestion = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ(q => q + 1);
      setSelected(null);
      setShowResult(false);
    } else {
      setFinished(true);
    }
  };

  const restart = () => {
    setCurrentQ(0);
    setSelected(null);
    setShowResult(false);
    setScore(0);
    setFinished(false);
    setAnswers([]);
  };

  const q = questions[currentQ];
  const progress = ((currentQ + (showResult ? 1 : 0)) / questions.length) * 100;

  return (
    <div className="relative z-10 py-24 lg:py-32" data-testid="quiz-page">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={stagger}>

          <motion.div variants={fadeUp} className="mb-16">
            <Badge className="bg-amber-500/10 text-amber-400 border-amber-500/20 font-mono text-xs tracking-widest mb-6">PAGINA 5</Badge>
            <h1 className="font-outfit font-bold text-4xl md:text-5xl lg:text-6xl tracking-tight mb-4">Quiz Interactiv</h1>
            <p className="text-muted-foreground text-base md:text-lg max-w-2xl">
              Testeaza-ti cunostintele despre undele seismice cu 10 intrebari grila.
            </p>
            <div className="w-20 h-1 bg-amber-500 rounded-full mt-6" />
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Quiz */}
            <motion.div variants={fadeUp} className="lg:col-span-2">
              {!finished ? (
                <Card className="glass-card" data-testid="quiz-card">
                  <CardContent className="p-6 md:p-8">
                    {/* Progress */}
                    <div className="mb-6">
                      <div className="flex justify-between text-xs font-mono text-muted-foreground mb-2">
                        <span>Intrebarea {currentQ + 1} / {questions.length}</span>
                        <span>Scor: {score}</span>
                      </div>
                      <Progress value={progress} className="h-1.5" data-testid="quiz-progress" />
                    </div>

                    {/* Question */}
                    <h3 className="font-outfit font-bold text-lg md:text-xl mb-6" data-testid="quiz-question">{q.q}</h3>

                    {/* Options */}
                    <div className="space-y-3">
                      {q.options.map((opt, i) => {
                        let cls = 'glass-card p-4 cursor-pointer transition-all duration-200 border';
                        if (showResult) {
                          if (i === q.correct) cls += ' border-emerald-500/50 bg-emerald-500/10 quiz-correct';
                          else if (i === selected && i !== q.correct) cls += ' border-red-500/50 bg-red-500/10 quiz-wrong';
                          else cls += ' opacity-50';
                        } else {
                          cls += ' hover:border-cyan-500/30 hover:bg-cyan-500/5';
                          if (i === selected) cls += ' border-cyan-500/50 bg-cyan-500/10';
                        }

                        return (
                          <button key={i} onClick={() => handleSelect(i)} className={`w-full text-left rounded-lg ${cls}`}
                            disabled={showResult} data-testid={`quiz-option-${i}`}>
                            <div className="flex items-center gap-3">
                              <span className="w-8 h-8 rounded-full bg-muted/50 flex items-center justify-center font-mono text-sm shrink-0">
                                {String.fromCharCode(65 + i)}
                              </span>
                              <span className="text-sm">{opt}</span>
                              {showResult && i === q.correct && <CheckCircle className="w-5 h-5 text-emerald-400 ml-auto shrink-0" />}
                              {showResult && i === selected && i !== q.correct && <XCircle className="w-5 h-5 text-red-400 ml-auto shrink-0" />}
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    {/* Explanation */}
                    {showResult && (
                      <div className="mt-6 p-4 rounded-lg bg-muted/30 border border-border">
                        <p className="text-sm text-muted-foreground">
                          <strong className="text-foreground">Explicatie:</strong> {q.explanation}
                        </p>
                      </div>
                    )}

                    {/* Next button */}
                    {showResult && (
                      <div className="mt-6 flex justify-end">
                        <Button onClick={nextQuestion}
                          className="bg-cyan-600 hover:bg-cyan-700 text-white font-outfit uppercase tracking-wider text-xs"
                          data-testid="next-question-btn">
                          {currentQ < questions.length - 1 ? 'Urmatoarea' : 'Vezi Rezultatul'}
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ) : (
                /* Results */
                <Card className="glass-card" data-testid="quiz-results">
                  <CardContent className="p-6 md:p-8 text-center">
                    <Trophy className={`w-16 h-16 mx-auto mb-6 ${score >= 8 ? 'text-amber-400' : score >= 5 ? 'text-cyan-400' : 'text-muted-foreground'}`} />
                    <h2 className="font-outfit font-bold text-3xl mb-2">
                      {score >= 8 ? 'Excelent!' : score >= 5 ? 'Bine!' : 'Mai incearca!'}
                    </h2>
                    <p className="text-muted-foreground mb-6">
                      Ai obtinut <span className="text-foreground font-bold">{score}</span> din <span className="text-foreground font-bold">{questions.length}</span> puncte
                    </p>

                    <div className="flex items-center justify-center gap-2 mb-8">
                      {answers.map((a, i) => (
                        <div key={i} className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-mono ${
                          a.isCorrect ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-red-500/20 text-red-400 border border-red-500/30'
                        }`}>
                          {i + 1}
                        </div>
                      ))}
                    </div>

                    <Button onClick={restart}
                      className="bg-cyan-600 hover:bg-cyan-700 text-white font-outfit uppercase tracking-wider text-xs"
                      data-testid="restart-quiz-btn">
                      <RotateCcw className="w-4 h-4 mr-2" /> Reincepe Quizul
                    </Button>
                  </CardContent>
                </Card>
              )}
            </motion.div>

            {/* Kahoot + sidebar */}
            <motion.div variants={fadeUp} className="space-y-6">
              <Card className="glass-card border-violet-500/20" data-testid="kahoot-card">
                <CardContent className="p-6 text-center">
                  <Gamepad2 className="w-10 h-10 text-violet-400 mx-auto mb-4" />
                  <h3 className="font-outfit font-bold text-lg mb-2">Kahoot!</h3>
                  <p className="text-muted-foreground text-sm mb-6">
                    Joaca quizul nostru si pe platforma Kahoot pentru o experienta interactiva in clasa!
                  </p>
                  <a
                    href="https://kahoot.it/challenge/04478283?challenge-id=96500e9d-e3f4-42e0-b688-0fc801dd1b0b_1772464011339"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white font-outfit font-bold uppercase tracking-widest text-xs py-3 px-6 rounded-md glow-violet transition-all duration-300 w-full justify-center"
                    data-testid="kahoot-link"
                  >
                    Acceseaza Kahoot-ul <ExternalLink className="w-4 h-4" />
                  </a>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardContent className="p-5">
                  <h4 className="font-outfit font-bold text-sm mb-3">Statistici Quiz</h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Intrebari:</span>
                      <span className="font-mono">{questions.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Raspunsuri corecte:</span>
                      <span className="font-mono text-emerald-400">{score}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Raspunsuri gresite:</span>
                      <span className="font-mono text-red-400">{answers.length - score}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Procentaj:</span>
                      <span className="font-mono">{answers.length > 0 ? Math.round((score / answers.length) * 100) : 0}%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
