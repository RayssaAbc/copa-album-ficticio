import { createFileRoute, Link } from "@tanstack/react-router";
import { Trophy, Calendar, History, HelpCircle, ArrowRight } from "lucide-react";
import { Layout } from "@/components/Layout";
import { classes, teams, matches } from "@/lib/data";
import { fmtDateBR } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Copa — Álbum Digital de Seleções" },
      { name: "description", content: "Explore times, jogadores, histórico das Copas e teste seus conhecimentos." },
    ],
  }),
  component: Index,
});

const shortcuts = [
  { to: "/album", label: "Álbum Digital", desc: "12 seleções em 3 classes", icon: Trophy },
  { to: "/jogos", label: "Jogos da Copa", desc: "Tabela da fase de grupos", icon: Calendar },
  { to: "/historico", label: "Histórico", desc: "Todas as Copas, 1930–2022", icon: History },
  { to: "/quiz", label: "Quiz Interativo", desc: "12 perguntas para testar", icon: HelpCircle },
] as const;

function Index() {
  return (
    <Layout>
      <section className="rounded-2xl border bg-card p-5 sm:p-8 md:p-12 mb-8 relative overflow-hidden">
        <div className="absolute -right-10 -top-10 size-48 rounded-full bg-accent/10 blur-3xl" />
        <p className="relative text-sm uppercase tracking-widest text-accent font-semibold mb-3 pb-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-accent">Álbum Chute Certo</p>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight max-w-2xl">A Copa do Mundo em um só lugar.</h1>
        <p className="text-muted-foreground mt-4 max-w-xl text-sm sm:text-base">Conheça seleções, jogadores e técnicos. Acompanhe os jogos, revisite a história e desbloqueie figurinhas no quiz.</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link to="/album" className="inline-flex items-center gap-2 rounded-lg bg-primary text-primary-foreground px-5 py-3 font-medium min-h-11 text-sm sm:text-base">
            Explorar álbum <ArrowRight className="size-4" />
          </Link>
          <Link to="/quiz" className="inline-flex items-center gap-2 rounded-lg bg-accent text-accent-foreground px-5 py-3 font-medium min-h-11 text-sm sm:text-base">
            Jogar quiz
          </Link>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-lg font-semibold mb-3">Acesso rápido</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {shortcuts.map(({ to, label, desc, icon: Icon }) => (
            <Link key={to} to={to} className="group rounded-xl border bg-card p-4 sm:p-5 hover:border-accent transition-colors">
              <Icon className="size-5 sm:size-6 text-accent mb-2 sm:mb-3" />
              <div className="font-semibold text-sm sm:text-base">{label}</div>
              <div className="text-xs text-muted-foreground mt-1">{desc}</div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <div className="flex items-baseline justify-between mb-3">
          <h2 className="text-lg font-semibold">Classes</h2>
          <Link to="/album" className="text-sm text-muted-foreground hover:text-foreground">Ver todas →</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {classes.map(c => (
            <Link key={c.id} to="/album/$classId" params={{ classId: c.id }} className="rounded-xl border bg-card p-5 hover:border-accent">
              <div className="text-xs uppercase tracking-widest text-accent font-semibold">{c.name}</div>
              <div className="text-xl sm:text-2xl font-bold mt-2">{teams.filter(t => t.classId === c.id).length} seleções</div>
              <p className="text-sm text-muted-foreground mt-2">{c.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-3">Próximos jogos</h2>
        <div className="space-y-2">
          {matches.slice(0, 4).map(m => {
            const home = teams.find(t => t.id === m.home)!;
            const away = teams.find(t => t.id === m.away)!;
            return (
              <Link key={m.id} to="/jogos" className="flex flex-col sm:flex-row sm:items-center justify-between rounded-lg border bg-card px-4 py-3 hover:border-accent gap-2 sm:gap-0">
                <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                  <span className="text-xl sm:text-2xl shrink-0" aria-hidden>{home.flag}</span>
                  <span className="font-medium text-sm sm:text-base">{home.name}</span>
                  <span className="text-muted-foreground text-sm shrink-0">×</span>
                  <span className="font-medium text-sm sm:text-base">{away.name}</span>
                  <span className="text-xl sm:text-2xl shrink-0" aria-hidden>{away.flag}</span>
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground">{fmtDateBR(m.date)} · {m.time} BRT</div>
              </Link>
            );
          })}
        </div>
      </section>
    </Layout>
  );
}
