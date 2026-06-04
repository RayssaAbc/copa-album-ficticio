import { createFileRoute } from "@tanstack/react-router";
import { Layout, PageHeader } from "@/components/Layout";
import { cupHistory } from "@/lib/data";

export const Route = createFileRoute("/historico")({
  head: () => ({ meta: [
    { title: "Histórico das Copas — 1930 a 2022" },
    { name: "description", content: "Sedes, campeões, vices, artilheiros e destaques de cada Copa." },
  ]}),
  component: History,
});

function History() {
  return (
    <Layout>
      <PageHeader title="Histórico das Copas" subtitle="Os principais momentos do mundial, de 1930 a 2022." />
      <div className="space-y-3">
        {cupHistory.map(c => (
          <article key={c.year} className="rounded-xl border bg-card p-4 sm:p-5 grid grid-cols-1 md:grid-cols-[100px_1fr] gap-4">
            <div>
              <div className="text-2xl sm:text-3xl font-bold">{c.year}</div>
              <div className="text-xs text-muted-foreground uppercase tracking-widest">{c.host}</div>
            </div>
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
                <Info label="Campeão" value={c.champion} accent />
                <Info label="Vice" value={c.runnerUp} />
                <Info label="Artilheiro" value={c.topScorer} />
              </div>
              <p className="text-sm text-muted-foreground">{c.highlight}</p>
            </div>
          </article>
        ))}
      </div>
    </Layout>
  );
}

function Info({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">{label}</div>
      <div className={`text-sm font-semibold ${accent ? "text-accent" : ""}`}>{value}</div>
    </div>
  );
}
