import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout, PageHeader } from "@/components/Layout";
import { classes, teams } from "@/lib/data";

export const Route = createFileRoute("/album/")({
  head: () => ({ meta: [
    { title: "Álbum Digital — Classes e Seleções" },
    { name: "description", content: "12 seleções organizadas em 3 classes." },
  ]}),
  component: AlbumIndex,
});

function AlbumIndex() {
  return (
    <Layout>
      <PageHeader title="Álbum Digital" subtitle="Escolha uma classe para ver as seleções." />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {classes.map(c => {
          const list = teams.filter(t => t.classId === c.id);
          return (
            <Link key={c.id} to="/album/$classId" params={{ classId: c.id }} className="rounded-xl border bg-card p-5 hover:border-accent group">
              <div className="text-xs uppercase tracking-widest text-accent font-semibold">{c.name}</div>
              <div className="text-2xl mt-2 flex flex-wrap gap-1">
                {list.map(t => <span key={t.id} aria-hidden>{t.flag}</span>)}
              </div>
              <p className="text-sm text-muted-foreground mt-2">{c.description}</p>
              <div className="text-sm font-medium mt-3 group-hover:text-accent">Ver {list.length} seleções →</div>
            </Link>
          );
        })}
      </div>
    </Layout>
  );
}
