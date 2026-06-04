import { createFileRoute } from "@tanstack/react-router";
import { Layout, PageHeader, FavoriteButton } from "@/components/Layout";
import { matches, teamById } from "@/lib/data";
import { fmtDateBR } from "@/lib/utils";

export const Route = createFileRoute("/jogos")({
  head: () => ({ meta: [
    { title: "Jogos da Copa — Fase de Grupos" },
    { name: "description", content: "Tabela completa da fase de grupos com horários em Brasília." },
  ]}),
  component: Matches,
});

function Matches() {
  const groups = Array.from(new Set(matches.map(m => m.group)));
  return (
    <Layout>
      <PageHeader title="Jogos da Copa" subtitle="Fase de grupos — horários em Brasília (BRT)." />
      <div className="space-y-8">
        {groups.map(g => (
          <div key={g}>
            <h2 className="text-lg font-semibold mb-3">Grupo {g}</h2>
            <div className="space-y-2">
              {matches.filter(m => m.group === g).map(m => {
                const home = teamById(m.home)!; const away = teamById(m.away)!;
                return (
                  <div key={m.id} className="rounded-xl border bg-card p-4 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                    <div className="text-xs text-muted-foreground sm:w-32">
                      {fmtDateBR(m.date)}
                      <div className="font-semibold text-foreground">{m.time} BRT</div>
                    </div>
                    <div className="flex-1 flex items-center justify-center gap-3 text-center">
                      <div className="flex-1 text-right">
                        <div className="font-semibold">{home.name}</div>
                        <span className="text-2xl" aria-hidden>{home.flag}</span>
                      </div>
                      <div className="text-muted-foreground text-sm font-bold px-2">VS</div>
                      <div className="flex-1 text-left">
                        <span className="text-2xl" aria-hidden>{away.flag}</span>
                        <div className="font-semibold">{away.name}</div>
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground sm:w-48 sm:text-right">
                      <div>{m.stadium}</div>
                      <div>{m.city}</div>
                    </div>
                    <FavoriteButton type="match" id={m.id} />
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}
