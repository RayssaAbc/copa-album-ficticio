import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Lock } from "lucide-react";
import { Layout, PageHeader, FavoriteButton } from "@/components/Layout";
import { PhotoPlaceholder } from "@/components/PhotoPlaceholder";
import { teamById, classes } from "@/lib/data";
import { useApp } from "@/lib/app-context";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/album/time/$teamId")({
  loader: ({ params }) => {
    const team = teamById(params.teamId);
    if (!team) throw notFound();
    return { team };
  },
  head: ({ loaderData }) => ({ meta: [
    { title: `${loaderData?.team.name} — Seleção` },
    { name: "description", content: `Jogadores e técnico da seleção ${loaderData?.team.name}.` },
  ]}),
  component: TeamPage,
  notFoundComponent: () => <Layout><PageHeader title="Time não encontrado" back={{ to: "/album", label: "Álbum" }} /></Layout>,
});

function TeamPage() {
  const { team } = Route.useLoaderData();
  const { isUnlocked } = useApp();
  const cls = classes.find(c => c.id === team.classId)!;
  const coachUnlocked = isUnlocked("coach", team.id);

  return (
    <Layout>
      <div className="mb-6 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <Link to="/album/$classId" params={{ classId: team.classId }} className="text-sm text-muted-foreground hover:text-foreground mb-2 inline-block">← {cls.name}</Link>
          <div className="flex items-center gap-3">
            <PhotoPlaceholder src={team.photo} alt={team.name} size="xl" shape="rounded" />
            <div className="min-w-0">
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">{team.name}</h1>
              <div className="text-sm text-accent font-semibold uppercase tracking-widest mt-1">{cls.name}</div>
            </div>
          </div>
        </div>
        <FavoriteButton type="team" id={team.id} />
      </div>

      <h2 className="text-lg font-semibold mb-3">Técnico</h2>
      <div className={cn(
        "rounded-xl border p-4 flex items-start gap-4 mb-8",
        coachUnlocked ? "bg-card" : "bg-neutral-900 border-neutral-800",
      )}>
        <PhotoPlaceholder
          src={coachUnlocked ? team.coach.photo : undefined}
          alt={team.coach.name}
          size="lg"
          shape="circle"
          label="Foto"
          locked={!coachUnlocked}
        />
        <div className="min-w-0">
          <div className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Técnico</div>
          {coachUnlocked ? (
            <>
              <div className="text-lg font-semibold mt-1">{team.coach.name}</div>
              <p className="text-sm text-muted-foreground mt-1">{team.coach.description}</p>
            </>
          ) : (
            <>
              <div className="text-lg font-semibold mt-1 text-neutral-500 flex items-center gap-2">
                <Lock className="size-4" /> Figurinha bloqueada
              </div>
              <p className="text-sm text-neutral-500 mt-1">Acerte todas as perguntas do quiz para desbloquear.</p>
            </>
          )}
        </div>
      </div>

      <h2 className="text-lg font-semibold mb-3">Principais jogadores</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {team.players.map((p: typeof team.players[number]) => {
          const u = isUnlocked("player", p.id);
          if (!u) {
            return (
              <div key={p.id} className="rounded-xl border border-neutral-800 bg-neutral-900 p-4 flex items-start gap-3 select-none">
                <PhotoPlaceholder locked size="md" shape="circle" />
                <div className="min-w-0 flex-1 ml-1">
                  <div className="text-xs uppercase tracking-widest text-neutral-600 font-semibold">??????</div>
                  <div className="text-base font-bold mt-1 text-neutral-500 flex items-center gap-2">
                    <Lock className="size-4" /> Bloqueado
                  </div>
                  <div className="text-xs text-neutral-600 mt-1">Ganhe no quiz</div>
                </div>
              </div>
            );
          }
          return (
            <div key={p.id} className="rounded-xl border bg-card p-4 hover:border-accent relative flex items-start gap-3">
              <div className="absolute top-3 right-3"><FavoriteButton type="player" id={p.id} /></div>
              <PhotoPlaceholder src={p.photo} alt={p.name} size="md" shape="circle" />
              <Link to="/album/jogador/$playerId" params={{ playerId: p.id }} className="block min-w-0 flex-1 ml-1">
                <div className="text-xs uppercase tracking-widest text-accent font-semibold">{p.position}</div>
                <div className="text-base font-bold mt-1 truncate">{p.name}</div>
                <div className="text-sm text-muted-foreground mt-1">{p.age} anos · {p.experience}</div>
              </Link>
            </div>
          );
        })}
      </div>
    </Layout>
  );
}
