import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '@/contexts/ThemeContext';
import { useSound } from '@/contexts/SoundContext';
import { Sun, Moon, Volume2, VolumeX, Menu, X, Activity } from 'lucide-react';

const navLinks = [
  { path: '/', label: 'Acasa' },
  { path: '/teorie', label: 'Teorie' },
  { path: '/tipuri-unde', label: 'Tipuri de Unde' },
  { path: '/aplicatii', label: 'Aplicatii' },
  { path: '/quiz', label: 'Quiz' },
  { path: '/bibliografie', label: 'Bibliografie' },
];

export default function Layout({ children }) {
  const { isDark, toggleTheme } = useTheme();
  const { isMuted, toggleMute } = useSound();
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b border-white/5 dark:border-white/5 border-slate-200/50 bg-white/80 dark:bg-slate-950/80" data-testid="navbar">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2 group" data-testid="nav-logo">
              <Activity className="w-6 h-6 text-cyan-500 group-hover:text-cyan-400 transition-colors" />
              <span className="font-outfit font-bold text-lg tracking-tight hidden sm:block">
                Unde Seismice
              </span>
            </Link>

            <nav className="hidden lg:flex items-center gap-1" data-testid="desktop-nav">
              {navLinks.map(({ path, label }) => (
                <Link
                  key={path}
                  to={path}
                  className={`font-outfit font-medium text-xs px-3 py-2 rounded-md uppercase tracking-wider transition-colors duration-200 ${
                    location.pathname === path
                      ? 'text-cyan-400 bg-cyan-500/10'
                      : 'text-muted-foreground hover:text-cyan-400 hover:bg-cyan-500/5'
                  }`}
                  data-testid={`nav-link-${path.replace('/', '') || 'home'}`}
                >
                  {label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-1">
              <button
                onClick={toggleMute}
                className="p-2 rounded-md hover:bg-muted transition-colors duration-200"
                data-testid="sound-toggle"
                aria-label={isMuted ? 'Activare sunet' : 'Dezactivare sunet'}
              >
                {isMuted
                  ? <VolumeX className="w-4 h-4 text-muted-foreground" />
                  : <Volume2 className="w-4 h-4 text-cyan-400" />
                }
              </button>
              <button
                onClick={toggleTheme}
                className="p-2 rounded-md hover:bg-muted transition-colors duration-200"
                data-testid="theme-toggle"
                aria-label={isDark ? 'Mod luminos' : 'Mod întunecat'}
              >
                {isDark
                  ? <Sun className="w-4 h-4 text-amber-400" />
                  : <Moon className="w-4 h-4 text-slate-600" />
                }
              </button>
              <button
                className="lg:hidden p-2 rounded-md hover:bg-muted transition-colors duration-200"
                onClick={() => setMobileOpen(!mobileOpen)}
                data-testid="mobile-menu-toggle"
                aria-label="Meniu"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {mobileOpen && (
          <div className="lg:hidden backdrop-blur-xl bg-background/95 border-t border-border py-4" data-testid="mobile-nav">
            <nav className="flex flex-col gap-1 px-4">
              {navLinks.map(({ path, label }) => (
                <Link
                  key={path}
                  to={path}
                  onClick={() => setMobileOpen(false)}
                  className={`font-outfit font-medium text-sm px-3 py-2.5 rounded-md uppercase tracking-wider transition-colors duration-200 ${
                    location.pathname === path
                      ? 'text-cyan-400 bg-cyan-500/10'
                      : 'text-muted-foreground hover:text-cyan-400'
                  }`}
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>

      <main className="pt-16">{children}</main>

      <footer className="border-t border-border py-12 bg-card" data-testid="footer">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Activity className="w-5 h-5 text-cyan-500" />
                <span className="font-outfit font-bold text-lg">Unde Seismice</span>
              </div>
              <p className="text-muted-foreground text-sm">
                După un cutremur foarte puternic, undele seismice pot face Pământul să vibreze ca un clopot, iar aceste vibrații pot dura chiar și câteva zile! 🌍
              </p>
            </div>
            <div>
              <h4 className="font-outfit font-bold mb-4 uppercase text-sm tracking-wider">Navigare</h4>
              <div className="flex flex-col gap-2">
                {navLinks.map(({ path, label }) => (
                  <Link key={path} to={path} className="text-muted-foreground hover:text-cyan-400 text-sm transition-colors duration-200">
                    {label}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-outfit font-bold mb-4 uppercase text-sm tracking-wider">Echipa</h4>
              <p className="text-muted-foreground text-sm">Chivu Roberto Alexandru</p>
              <p className="text-muted-foreground text-sm">Iorga Alexandru Cristian</p>
              <p className="text-muted-foreground text-sm">Alexe Andrei Claudiu</p>
              <p className="text-cyan-500 text-sm mt-3 font-medium">
                Colegiul National „Tudor Vladimirescu"
              </p>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center">
            <p className="text-muted-foreground text-xs">
              &copy; 2026 Unde Seismice — Proiect Fizica
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
