import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Lock, Star } from "lucide-react";
import { Layout, PageHeader, FavoriteButton } from "@/components/Layout";
import { PhotoPlaceholder } from "@/components/PhotoPlaceholder";
import { playerById } from "@/lib/data";
import { useApp } from "@/lib/app-context";

export const Route = createFileRoute("/album/jogador/$playerId")({
  loader: ({ params }) => {
    const r = playerById(params.playerId);
    if (!r) throw notFound();
    return r;
  },
  head: ({ loaderData }) => ({ meta: [
    { title: `${loaderData?.player.name} — ${loaderData?.team.name}` },
    { name: "description", content: loaderData?.player.bio },
  ]}),
  component: PlayerPage,
  notFoundComponent: () => <Layout><PageHeader title="Jogador não encontrado" back={{ to: "/album", label: "Álbum" }} /></Layout>,
});

function PlayerPage() {
  const { player, team } = Route.useLoaderData();
  const { isUnlocked } = useApp();
  const unlocked = isUnlocked("player", player.id);

  if (!unlocked) {
    return (
      <Layout>
        <Link to="/album/time/$teamId" params={{ teamId: team.id }} className="text-sm text-muted-foreground hover:text-foreground mb-3 inline-block">← {team.name}</Link>
        <div className="rounded-3xl border-2 border-neutral-800 bg-neutral-900 p-10 text-center">
          <div className="mx-auto size-24 rounded-full bg-neutral-800 flex items-center justify-center text-neutral-500 mb-5">
            <Lock className="size-10" />
          </div>
          <h1 className="text-2xl font-bold text-neutral-300">Figurinha bloqueada</h1>
          <p className="text-neutral-500 mt-3 max-w-sm mx-auto">Acerte todas as perguntas do quiz para desbloquear esta carta e ver os detalhes do jogador.</p>
          <Link to="/quiz" className="inline-flex items-center gap-2 mt-6 rounded-lg bg-accent text-accent-foreground px-5 py-3 font-semibold min-h-11">
            Jogar quiz
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Link to="/album/time/$teamId" params={{ teamId: team.id }} className="text-sm text-muted-foreground hover:text-foreground mb-3 inline-block">← {team.name}</Link>

      {/* Trading Card */}
      <div className="mx-auto max-w-sm sm:max-w-md relative">
        <div className="absolute -inset-1 rounded-[2rem] bg-[conic-gradient(from_0deg,theme(colors.accent.DEFAULT,#f59e0b),#ec4899,#8b5cf6,#06b6d4,theme(colors.accent.DEFAULT,#f59e0b))] opacity-60 blur-md" aria-hidden />
        <div className="relative rounded-[1.75rem] overflow-hidden border-2 border-accent bg-gradient-to-br from-card via-card to-secondary shadow-2xl">
          {/* Holographic shine overlay */}
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,transparent_30%,rgba(255,255,255,0.18)_45%,transparent_60%)] mix-blend-overlay" aria-hidden />

          {/* Top bar */}
          <div className="flex items-center justify-between px-4 pt-3">
            <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-accent">Copa · Figurinha</div>
            <FavoriteButton type="player" id={player.id} />
          </div>

          {/* Photo with team flag */}
          <div className="px-6 pt-2 pb-4 flex flex-col items-center">
            <div className="relative">
              <div className="absolute -inset-2 rounded-full bg-accent/30 blur-xl" aria-hidden />
              <PhotoPlaceholder src={player.photo} alt={player.name} size="xl" shape="circle" className="relative ring-4 ring-accent/60" />
              <div className="absolute -bottom-1 -right-1 size-10 rounded-full bg-card border-2 border-accent flex items-center justify-center text-xl shadow-lg" aria-hidden>
                {team.flag}
              </div>
            </div>
            <div className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-accent text-accent-foreground px-3 py-1 text-xs font-bold uppercase tracking-widest">
              <Star className="size-3 fill-current" /> {player.position}
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-center mt-3">{player.name}</h1>
            <div className="text-sm text-muted-foreground mt-1">{team.name}</div>
          </div>

          {/* Stats strip */}
          <div className="grid grid-cols-3 border-y border-border bg-secondary/40">
            <Stat label="Idade" value={`${player.age}`} />
            <Stat label="Posição" value={player.position} small />
            <Stat label="Camisa" value={`#${player.id.split("-")[1] ?? "?"}`} />
          </div>

          {/* Bio */}
          <div className="p-5">
            <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-accent mb-2">Sobre o craque</div>
            <p className="text-sm leading-relaxed">{player.bio}</p>
            <div className="mt-4 text-xs text-muted-foreground italic">{player.experience}</div>
          </div>

          {/* Bottom holographic strip */}
          <div className="h-2 bg-gradient-to-r from-accent to-cyan-400" aria-hidden />
        </div>
      </div>
    </Layout>
  );
}

function Stat({ label, value, small }: { label: string; value: string; small?: boolean }) {
  return (
    <div className="text-center py-3 px-2 border-r last:border-r-0 border-border">
      <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">{label}</div>
      <div className={small ? "text-xs font-semibold mt-1 truncate" : "text-lg font-bold mt-1"}>{value}</div>
    </div>
  );
}
