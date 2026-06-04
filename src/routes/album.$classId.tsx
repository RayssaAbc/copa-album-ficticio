import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Layout, PageHeader, FavoriteButton } from "@/components/Layout";
import { PhotoPlaceholder } from "@/components/PhotoPlaceholder";
import { classes, teamsByClass } from "@/lib/data";

export const Route = createFileRoute("/album/$classId")({
  loader: ({ params }) => {
    const cls = classes.find(c => c.id === params.classId);
    if (!cls) throw notFound();
    return { cls, teams: teamsByClass(params.classId) };
  },
  head: ({ loaderData }) => ({ meta: [
    { title: `${loaderData?.cls.name} — Álbum` },
    { name: "description", content: loaderData?.cls.description },
  ]}),
  component: ClassPage,
  notFoundComponent: () => <Layout><PageHeader title="Classe não encontrada" back={{ to: "/album", label: "Álbum" }} /></Layout>,
});

function ClassPage() {
  const { cls, teams } = Route.useLoaderData();
  return (
    <Layout>
      <PageHeader title={cls.name} subtitle={cls.description} back={{ to: "/album", label: "Álbum" }} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {teams.map((t: typeof teams[number]) => (
          <div key={t.id} className="rounded-xl border bg-card p-4 hover:border-accent transition-colors relative">
            <div className="absolute top-3 right-3"><FavoriteButton type="team" id={t.id} /></div>
            <Link to="/album/time/$teamId" params={{ teamId: t.id }} className="flex items-center gap-3">
              <PhotoPlaceholder src={t.photo} alt={t.name} size="lg" shape="rounded" />
              <div className="min-w-0">
                <div className="text-lg font-bold truncate">{t.name}</div>
                <div className="text-sm text-muted-foreground truncate">Téc. {t.coach.name}</div>
                <div className="text-xs text-muted-foreground mt-1">{t.players.length} jogadores · Téc. {t.coach.name}</div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </Layout>
  );
}
