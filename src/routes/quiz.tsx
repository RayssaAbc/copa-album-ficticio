import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState, useCallback } from "react";
import { Layout, PageHeader } from "@/components/Layout";
import { PhotoPlaceholder } from "@/components/PhotoPlaceholder";
import { quizQuestions, QUIZ_ROUND_SIZE, playerById, teamById, type QuizQuestion } from "@/lib/data";
import { useApp, type UnlockedItem } from "@/lib/app-context";
import { cn } from "@/lib/utils";
import { Check, X, Sparkles, Trophy, Hand } from "lucide-react";

export const Route = createFileRoute("/quiz")({
  head: () => ({ meta: [
    { title: "Quiz Interativo — Copa do Mundo" },
    { name: "description", content: "5 perguntas aleatórias. Acerte todas e ganhe uma figurinha!" },
  ]}),
  component: Quiz,
  ssr: false,
});

const PACK_CLICKS_NEEDED = 6;

function pickRandom(pool: QuizQuestion[], n: number): QuizQuestion[] {
  const arr = [...pool];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.slice(0, n);
}

function Quiz() {
  const { quizBest, setQuizBest, unlockRandom } = useApp();
  const [seed, setSeed] = useState(0);
  const questions = useMemo(() => pickRandom(quizQuestions, QUIZ_ROUND_SIZE), [seed]);
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [reward, setReward] = useState<UnlockedItem | null>(null);
  const [packPhase, setPackPhase] = useState<"none" | "opening" | "ripped" | "revealed">("none");
  const [clicks, setClicks] = useState(0);

  const q = questions[idx];

  const pick = (i: number) => {
    if (picked !== null) return;
    setPicked(i);
    if (i === q.correct) setScore(s => s + 1);
  };

  const finish = useCallback((finalScore: number) => {
    setDone(true);
    setQuizBest(finalScore);
    if (finalScore === questions.length) {
      const r = unlockRandom();
      setReward(r);
      if (r) setPackPhase("opening");
    }
  }, [questions.length, setQuizBest, unlockRandom]);

  const next = () => {
    if (idx + 1 < questions.length) {
      setIdx(idx + 1);
      setPicked(null);
    } else {
      finish(score);
    }
  };

  const tapPack = () => {
    if (packPhase !== "opening") return;
    const c = clicks + 1;
    setClicks(c);
    if (c >= PACK_CLICKS_NEEDED) {
      setPackPhase("ripped");
      setTimeout(() => setPackPhase("revealed"), 700);
    }
  };

  const restart = () => {
    setIdx(0); setPicked(null); setScore(0); setDone(false); setReward(null);
    setPackPhase("none"); setClicks(0);
    setSeed(s => s + 1);
  };

  if (done) {
    const perfect = score === questions.length;
    const pct = Math.round((score / questions.length) * 100);

    // Pack opening flow (only shown when perfect AND we have a reward)
    if (perfect && reward && packPhase !== "revealed") {
      const progress = Math.min(clicks / PACK_CLICKS_NEEDED, 1);
      const ripped = packPhase === "ripped";
      return (
        <Layout>
          <PageHeader title="Você ganhou um pacote!" subtitle="Toque no pacote para abrir." />
          <div className="flex flex-col items-center justify-center py-4">
            <button
              onClick={tapPack}
              disabled={ripped}
              aria-label="Abrir pacote"
              className={cn(
                "relative outline-none select-none transition-transform duration-150 active:scale-95",
                ripped && "pointer-events-none",
              )}
              style={{
                transform: ripped
                  ? "scale(1.15) rotate(0deg)"
                  : `rotate(${(clicks % 2 === 0 ? -1 : 1) * (4 + clicks * 1.5)}deg) scale(${1 + clicks * 0.02})`,
                transition: "transform 200ms cubic-bezier(.34,1.56,.64,1)",
              }}
            >
              {/* Glow */}
              <div
                className="absolute -inset-6 rounded-full bg-accent/40 blur-3xl -z-10"
                style={{ opacity: 0.3 + progress * 0.7 }}
                aria-hidden
              />
              {/* Pack image, splits when ripped */}
              <div className="relative w-[220px] sm:w-[260px] overflow-hidden rounded-2xl">
               <img
                 src="/img/figurinhaEmbalagem.png"
                 alt="Pacote de figurinhas"
                 draggable={false}
                 className={cn(
                 "w-full h-auto block transition-all duration-500",
                 ripped && "opacity-0 scale-110",
                  )}
                />
                {/* Sparkles bursting */}
                {ripped && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Sparkles className="size-20 text-accent animate-ping" />
                  </div>
                )}
              </div>
            </button>

            {!ripped && (
              <div className="mt-6 w-full max-w-xs">
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div
                    className="h-full bg-accent transition-all duration-200"
                    style={{ width: `${progress * 100}%` }}
                  />
                </div>
                <div className="mt-3 flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <Hand className="size-4" />
                  {clicks}/{PACK_CLICKS_NEEDED} toques
                </div>
              </div>
            )}
            {ripped && (
              <div className="mt-6 text-accent font-bold uppercase tracking-widest text-sm animate-pulse">
                Revelando...
              </div>
            )}
          </div>
        </Layout>
      );
    }

    return (
      <Layout>
        <PageHeader title="Resultado" />
        <div className="rounded-2xl border bg-card p-6 sm:p-8 text-center">
          <div className="text-sm uppercase tracking-widest text-accent font-semibold">Pontuação final</div>
          <div className="text-6xl font-bold mt-3">{score}<span className="text-2xl text-muted-foreground"> / {questions.length}</span></div>
          <div className="text-muted-foreground mt-2">{pct}% de acertos</div>
          <div className="text-sm mt-4">Recorde pessoal: <span className="font-semibold text-accent">{quizBest}</span></div>

          {perfect && reward && <RewardCard item={reward} />}
          {perfect && !reward && (
            <div className="mt-6 rounded-xl border border-accent/40 bg-accent/5 p-5">
              <Trophy className="size-8 text-accent mx-auto" />
              <div className="font-semibold mt-2">Você já desbloqueou todas as figurinhas!</div>
            </div>
          )}
          {!perfect && (
            <div className="mt-6 text-sm text-muted-foreground">Acerte as 5 perguntas para ganhar uma figurinha aleatória.</div>
          )}

          <button onClick={restart} className="mt-6 rounded-lg bg-primary text-primary-foreground px-5 py-3 font-medium min-h-11">Jogar de novo</button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <PageHeader title="Quiz Interativo" subtitle={`Pergunta ${idx + 1} de ${questions.length} · Pontos: ${score}`} />
      <div className="mb-6 h-2 bg-secondary rounded-full overflow-hidden">
        <div className="h-full bg-accent transition-all" style={{ width: `${(idx / questions.length) * 100}%` }} />
      </div>
      <div className="rounded-2xl border bg-card p-5 sm:p-6 md:p-8">
        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold">{q.question}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
          {q.options.map((opt, i) => {
            const isCorrect = i === q.correct;
            const isPicked = picked === i;
            const state = picked === null ? "idle" : isCorrect ? "correct" : isPicked ? "wrong" : "muted";
            return (
              <button
                key={i}
                onClick={() => pick(i)}
                disabled={picked !== null}
                className={cn(
                  "text-left rounded-xl border p-4 min-h-14 font-medium flex items-center justify-between gap-3",
                  state === "idle" && "hover:border-accent hover:bg-secondary",
                  state === "correct" && "border-success bg-success/10 text-foreground",
                  state === "wrong" && "border-destructive bg-destructive/10",
                  state === "muted" && "opacity-50",
                )}
              >
                <span>{opt}</span>
                {state === "correct" && <Check className="size-5 text-success" />}
                {state === "wrong" && <X className="size-5 text-destructive" />}
              </button>
            );
          })}
        </div>
        {picked !== null && (
          <div className="mt-6 flex items-center justify-between gap-3">
            <div className={cn("text-sm font-semibold", picked === q.correct ? "text-success" : "text-destructive")}>
              {picked === q.correct ? "Resposta correta!" : `Resposta certa: ${q.options[q.correct]}`}
            </div>
            <button onClick={next} className="rounded-lg bg-primary text-primary-foreground px-5 py-3 font-medium min-h-11 shrink-0">
              {idx + 1 < questions.length ? "Próxima" : "Ver resultado"}
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
}

function RewardCard({ item }: { item: UnlockedItem }) {
  if (item.type === "player") {
    const r = playerById(item.id);
    if (!r) return null;
    return (
      <div className="mt-6 rounded-2xl border-2 border-accent bg-gradient-to-br from-accent/10 via-card to-secondary p-5 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(115deg,transparent_35%,rgba(255,255,255,0.15)_50%,transparent_65%)] pointer-events-none" aria-hidden />
        <div className="flex items-center gap-2 justify-center text-accent font-bold uppercase tracking-widest text-xs">
          <Sparkles className="size-4" /> Nova figurinha desbloqueada!
        </div>
        <div className="flex items-center gap-4 mt-4">
          <PhotoPlaceholder src={r.player.photo} alt={r.player.name} size="lg" shape="circle" className="ring-4 ring-accent/60" />
          <div className="text-left min-w-0">
            <div className="text-xs uppercase tracking-widest text-accent font-semibold">{r.player.position}</div>
            <div className="text-lg font-bold truncate">{r.player.name}</div>
            <div className="text-sm text-muted-foreground">{r.team.flag} {r.team.name}</div>
          </div>
        </div>
        <Link to="/album/jogador/$playerId" params={{ playerId: r.player.id }} className="mt-4 inline-block text-sm font-semibold text-accent hover:underline">
          Ver figurinha completa →
        </Link>
      </div>
    );
  }
  const team = teamById(item.id);
  if (!team) return null;
  return (
    <div className="mt-6 rounded-2xl border-2 border-accent bg-gradient-to-br from-accent/10 via-card to-secondary p-5 relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(115deg,transparent_35%,rgba(255,255,255,0.15)_50%,transparent_65%)] pointer-events-none" aria-hidden />
      <div className="flex items-center gap-2 justify-center text-accent font-bold uppercase tracking-widest text-xs">
        <Sparkles className="size-4" /> Técnico desbloqueado!
      </div>
      <div className="flex items-center gap-4 mt-4">
        <PhotoPlaceholder src={team.coach.photo} alt={team.coach.name} size="lg" shape="circle" className="ring-4 ring-accent/60" />
        <div className="text-left min-w-0">
          <div className="text-xs uppercase tracking-widest text-accent font-semibold">Técnico</div>
          <div className="text-lg font-bold truncate">{team.coach.name}</div>
          <div className="text-sm text-muted-foreground">{team.flag} {team.name}</div>
        </div>
      </div>
      <Link to="/album/time/$teamId" params={{ teamId: team.id }} className="mt-4 inline-block text-sm font-semibold text-accent hover:underline">
        Ver seleção →
      </Link>
    </div>
  );
}

