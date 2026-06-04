import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout, PageHeader } from "@/components/Layout";
import { useApp } from "@/lib/app-context";
import { Moon, Sun } from "lucide-react";
import { playerById, teamById, matches, teamsByClass } from "@/lib/data";
import { fmtDateBR } from "@/lib/utils";

export const Route = createFileRoute("/configuracoes")({
  head: () => ({ meta: [
    { title: "Configurações" },
    { name: "description", content: "Tema e favoritos." },
  ]}),
  component: Settings,
});

function Settings() {
  const { theme, toggleTheme, favorites, quizBest } = useApp();

  const favPlayers = [...favorites].filter(k => k.startsWith("player:")).map(k => playerById(k.split(":")[1]));
  const favTeams = [...favorites].filter(k => k.startsWith("team:")).map(k => teamById(k.split(":")[1]));
  const favMatches = [...favorites].filter(k => k.startsWith("match:")).map(k => matches.find(m => m.id === k.split(":")[1]));

  return (
    <Layout>
      <PageHeader title="Configurações" />

      <section className="rounded-2xl border bg-card p-5 mb-5">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <div className="font-semibold">Tema</div>
            <div className="text-sm text-muted-foreground">Alterne entre claro e escuro. Sua escolha é salva.</div>
          </div>
          <button onClick={toggleTheme} aria-label="Alternar tema" className="inline-flex items-center gap-2 rounded-lg border px-4 py-3 min-h-11 font-medium hover:bg-secondary shrink-0">
            {theme === "dark" ? <><Sun className="size-4" /> Claro</> : <><Moon className="size-4" /> Escuro</>}
          </button>
        </div>
      </section>

      <section className="rounded-2xl border bg-card p-5 mb-5">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <Metric label="Favoritos" value={favorites.size} />
          <Metric label="Recorde no Quiz" value={quizBest} />
          <Metric label="Seleções no app" value={teamsByClass("a").length + teamsByClass("b").length + teamsByClass("c").length} />
        </div>
      </section>

      <h2 className="text-lg font-semibold mb-3">Seus favoritos</h2>
      {favorites.size === 0 ? (
        <div className="rounded-xl border bg-card p-5 text-sm text-muted-foreground">Nenhum favorito ainda. Toque na estrela em jogadores, times ou jogos.</div>
      ) : (
        <div className="space-y-6">
          {favTeams.length > 0 && (
            <FavGroup title="Times">
              {favTeams.filter(Boolean).map(t => (
                <Link key={t!.id} to="/album/time/$teamId" params={{ teamId: t!.id }} className="rounded-lg border bg-card p-3 hover:border-accent flex items-center gap-2">
                  <span className="text-2xl" aria-hidden>{t!.flag}</span> <span className="font-medium">{t!.name}</span>
                </Link>
              ))}
            </FavGroup>
          )}
          {favPlayers.length > 0 && (
            <FavGroup title="Jogadores">
              {favPlayers.filter(Boolean).map(r => (
                <Link key={r!.player.id} to="/album/jogador/$playerId" params={{ playerId: r!.player.id }} className="rounded-lg border bg-card p-3 hover:border-accent">
                  <div className="font-medium">{r!.player.name}</div>
                  <div className="text-xs text-muted-foreground">{r!.team.name} · {r!.player.position}</div>
                </Link>
              ))}
            </FavGroup>
          )}
          {favMatches.length > 0 && (
            <FavGroup title="Jogos">
              {favMatches.filter(Boolean).map(m => {
                const h = teamById(m!.home)!; const a = teamById(m!.away)!;
                return (
                  <div key={m!.id} className="rounded-lg border bg-card p-3">
                    <div className="font-medium">{h.flag} {h.name} × {a.name} {a.flag}</div>
                    <div className="text-xs text-muted-foreground">{fmtDateBR(m!.date)} · {m!.time} BRT</div>
                  </div>
                );
              })}
            </FavGroup>
          )}
        </div>
      )}
    </Layout>
  );
}

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="text-3xl font-bold">{value}</div>
      <div className="text-xs uppercase tracking-widest text-muted-foreground font-semibold mt-1">{label}</div>
    </div>
  );
}

function FavGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-sm uppercase tracking-widest text-muted-foreground font-semibold mb-2">{title}</h3>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2">{children}</div>
    </div>
  );
}
