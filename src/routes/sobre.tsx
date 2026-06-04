import { createFileRoute } from "@tanstack/react-router";
import { Layout, PageHeader } from "@/components/Layout";

export const Route = createFileRoute("/sobre")({
  head: () => ({ meta: [
    { title: "Sobre — Copa Álbum Digital" },
    { name: "description", content: "Sobre o projeto e sua conexão com os ODS da ONU." },
  ]}),
  component: About,
});

const ods = [
  { n: 4, title: "Educação de Qualidade", desc: "Promove o aprendizado sobre a história, geografia e cultura através do esporte." },
  { n: 9, title: "Inovação e Infraestrutura", desc: "Usa tecnologias web modernas (TanStack Start, Tailwind, React) para entregar uma experiência acessível." },
  { n: 10, title: "Redução das Desigualdades", desc: "Conteúdo gratuito, responsivo e acessível em qualquer dispositivo." },
];

function About() {
  return (
    <Layout>
      <PageHeader title="Sobre o app" subtitle="Um álbum digital que reúne seleções, história, jogos e quiz da Copa." />
      <div className="rounded-2xl border bg-card p-5 sm:p-6 md:p-8 mb-6">
        <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
          Este aplicativo foi desenvolvido para celebrar a Copa do Mundo combinando informação,
          interatividade e design acessível. Explore as 12 seleções organizadas em 3 classes,
          conheça jogadores e técnicos, revise a história das Copas desde 1930 e
          teste seus conhecimentos com o quiz.
        </p>
      </div>

      <h2 className="text-lg font-semibold mb-3">Conexão com os ODS da ONU</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {ods.map(o => (
          <div key={o.n} className="rounded-xl border bg-card p-4 sm:p-5">
            <div className="size-10 rounded-lg bg-accent text-accent-foreground inline-flex items-center justify-center font-bold">{o.n}</div>
            <div className="font-semibold mt-3">{o.title}</div>
            <p className="text-sm text-muted-foreground mt-2">{o.desc}</p>
          </div>
        ))}
      </div>
    </Layout>
  );
}
