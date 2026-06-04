import { Link, useRouterState } from "@tanstack/react-router";
import { Home, Trophy, History, Calendar, HelpCircle, Settings, Info, Moon, Sun, Menu, X } from "lucide-react";
import { useState, type ReactNode } from "react";
import { useApp } from "@/lib/app-context";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/", label: "Início", icon: Home },
  { to: "/album", label: "Álbum", icon: Trophy },
  { to: "/jogos", label: "Jogos", icon: Calendar },
  { to: "/historico", label: "Histórico", icon: History },
  { to: "/quiz", label: "Quiz", icon: HelpCircle },
  { to: "/sobre", label: "Sobre", icon: Info },
  { to: "/configuracoes", label: "Configurações", icon: Settings },
] as const;

export function Layout({ children }: { children: ReactNode }) {
  const path = useRouterState({ select: s => s.location.pathname });
  const { theme, toggleTheme } = useApp();
  const [open, setOpen] = useState(false);
  const onQuiz = path === "/quiz";

  return (
    <div className="min-h-dvh flex flex-col md:flex-row bg-background text-foreground">
      {/* Mobile header */}
      <header className="md:hidden sticky top-0 z-30 flex items-center justify-between px-4 h-14 border-b bg-background/80 backdrop-blur">
      <Link to="/" className="flex items-center gap-2 font-bold text-xl tracking-tight">
          <img 
            src="/img/logo/logoBola.png" 
            alt="Logo" 
            className="w-9 h-9 rounded-full object-cover brightness-110 contrast-125"
          />
           <span className="text-emerald-400">ChuteCerto</span>
            {/* <span className="text-accent">.</span> */}
      </Link>
        <div className="flex items-center gap-1">
          <button onClick={toggleTheme} aria-label="Alternar tema" className="min-h-11 min-w-11 inline-flex items-center justify-center rounded-md hover:bg-secondary">
            {theme === "dark" ? <Sun className="size-5" /> : <Moon className="size-5" />}
          </button>
          <button onClick={() => setOpen(v => !v)} aria-label="Menu" className="min-h-11 min-w-11 inline-flex items-center justify-center rounded-md hover:bg-secondary">
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </header>

      {/* Sidebar (desktop) / drawer (mobile) */}
      <aside
        className={cn(
          "md:sticky md:top-0 md:h-dvh md:w-60 md:flex md:flex-col border-r bg-card",
          "fixed inset-x-0 top-14 z-20 md:translate-y-0 transition-transform",
          open ? "translate-y-0" : "-translate-y-[150%] md:translate-y-0"
        )}
      >
        <div className="hidden md:flex items-center justify-between px-5 h-16 border-b">
         <Link to="/" className="flex items-center gap-2 font-bold text-xl tracking-tight">
           < img 
                  src="/img/logo/logoBola.png" 
                  alt="Logo" 
                  className="w-9 h-9 rounded-full object-cover brightness-110 contrast-125"
                  />
           <span className="text-emerald-400">ChuteCerto</span>
           {/* <span className="text-accent">.</span> */}
          </Link>
          <button onClick={toggleTheme} aria-label="Alternar tema" className="min-h-11 min-w-11 inline-flex items-center justify-center rounded-md hover:bg-secondary">
            {theme === "dark" ? <Sun className="size-5" /> : <Moon className="size-5" />}
          </button>
        </div>
        <nav className="p-3 flex flex-col gap-1">
          {navItems.map(({ to, label, icon: Icon }) => {
            const active = to === "/" ? path === "/" : path.startsWith(to);
            return (
              <Link
                key={to} to={to} onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium min-h-11",
                  active ? "bg-primary text-primary-foreground" : "hover:bg-secondary text-foreground"
                )}
              >
                <Icon className="size-5" />
                <span>{label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      <main className="flex-1 min-w-0">
        <div className="mx-auto max-w-6xl px-3 sm:px-4 py-4 sm:py-6 md:py-10">{children}</div>
      </main>

      {/* Floating Quiz button */}
      {!onQuiz && (
        <Link
          to="/quiz"
          aria-label="Ir para o Quiz"
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 inline-flex items-center gap-2 rounded-full bg-accent text-accent-foreground shadow-lg px-4 sm:px-5 py-3 min-h-12 font-semibold hover:scale-105 active:scale-95"
        >
          <HelpCircle className="size-5" />
          <span className="hidden sm:inline">Quiz</span>
        </Link>
      )}
    </div>
  );
}

export function PageHeader({ title, subtitle, back }: { title: string; subtitle?: string; back?: { to: string; label: string } }) {
  return (
    <div className="mb-6">
      {back && (
        <Link to={back.to} className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-1 mb-2">
          ← {back.label}
        </Link>
      )}
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">{title}</h1>
      {subtitle && <p className="text-muted-foreground mt-2 max-w-2xl text-sm sm:text-base">{subtitle}</p>}
    </div>
  );
}

export function FavoriteButton({ type, id, label = "Favoritar" }: { type: "player" | "team" | "match"; id: string; label?: string }) {
  const { isFavorite, toggleFavorite } = useApp();
  const fav = isFavorite(type, id);
  return (
    <button
      onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleFavorite(type, id); }}
      aria-label={fav ? "Remover dos favoritos" : label}
      aria-pressed={fav}
      className={cn(
        "min-h-11 min-w-11 inline-flex items-center justify-center rounded-full text-lg",
        fav ? "bg-accent text-accent-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"
      )}
    >
      {fav ? "★" : "☆"}
    </button>
  );
}
