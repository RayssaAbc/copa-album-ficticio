import { getPersonPhoto } from "@/routes/PersonPhoto";
import { getCountryFlag } from "@/routes/flags";


export type Photoable = {
  photo?: string;
};

export type Player = {
  id: string;
  name: string;
  age: number;
  team: string;
  experience: string;
  position: string;
  bio: string;
  photo?: string;
};

export type Team = {
  id: string;
  name: string;
  classId: string;
  flag: string;
  photo?: string;
  coach: {
    name: string;
    description: string;
    photo?: string;
  };
  players: Player[];
};

export type ClassInfo = {
  id: string;
  name: string;
  description: string;
  photo?: string;
};

export const classes: ClassInfo[] = [
  { id: "c", name: "Classe C", description: "" },
  { id: "e", name: "Classe E", description: "" },
  { id: "h", name: "Classe H", description: "" },
];

const createTeam = (
  id: string,
  name: string,
  classId: string,
  flag: string,
  photo: string,
  coach: {
    name: string;
    description: string;
    photo?: string;
  },
  players: Omit<Player, "team">[]
): Team => ({
  id,
  name,
  classId,
  flag,
  photo,
  coach,
  players: players.map((p) => ({
    ...p,
    team: name,
  })),
});

export const teams: Team[] = [
  createTeam(
    "bra",
    "Brasil",
    "c",
    "BRA",
    getCountryFlag("brasil"),
    {
      name: "Carlo Ancelotti",
      description:
        "Técnico multicampeão, contratado para liderar o Brasil rumo à Copa de 2026.",
        photo: getPersonPhoto("carloAncelotti"),
    },
    [
      {
        id: "bra-1",
        name: "Vinicius Jr.",
        age: 25,
        experience: "8 anos de carreira",
        position: "Atacante",
        bio: "Principal estrela da seleção e destaque do Real Madrid.",
        photo: getPersonPhoto("viniciusJr"),
      },
      {
        id: "bra-2",
        name: "Casemiro",
        age: 34,
        experience: "8 anos de carreira",
        position: "Meio-campo",
        bio: "Versátil, veloz e decisivo em grandes partidas.",
        photo: getPersonPhoto("casemiro"),
      },
      {
        id: "bra-3",
        name: "Raphinha",
        age: 29,
        experience: "10 anos de carreira",
        position: "Atacante",
        bio: "Destaque ofensivo e especialista em assistências.",
        photo: getPersonPhoto("raphinha"),
      },
      {
        id: "bra-4",
        name: "Marquinhos",
        age: 32,
        experience: "14 anos de carreira",
        position: "Zagueiro",
        bio: "Capitão e líder da defesa brasileira.",
        photo: getPersonPhoto("marquinhos"),
      },
      {
        id: "bra-5",
        name: "Alisson",
        age: 33,
        experience: "14 anos de carreira",
        position: "Goleiro",
        bio: "Um dos melhores goleiros do mundo.",
        photo: getPersonPhoto("alisson"),
      },
       {
        id: "bra-23",
        name: "Canarinho Pistola",
        age: 10,
        experience: "8 anos de carreira e muito ódio no coração!",
        position: "Mascote",
        bio: "Um dos melhores atacantes do mundo.",
        photo: getPersonPhoto("canarinho"),
      },

    ]),

createTeam("mar", "Marrocos", "c", 'MAR', getCountryFlag("marrocos"),
  { name: "Walid Regragui", description: "Responsável pela histórica campanha marroquina em 2022.", photo: getPersonPhoto("walidRegragui") },
  [
    { id: "mar-1", name: "Achraf Hakimi", age: 27, experience: "10 anos de carreira", position: "Defensor", bio: "Um dos melhores laterais do futebol mundial.", photo: getPersonPhoto("AchrafHakimi") },
    { id: "mar-2", name: "Yassine Bounou", age: 35, experience: "15 anos de carreira", position: "Goleiro", bio: "Herói da campanha histórica no Catar." , photo: getPersonPhoto("yassineBounou") },
    { id: "mar-3", name: "Brahim Díaz", age: 27, experience: "9 anos de carreira", position: "Atacante", bio: "Criativo e decisivo no ataque.", photo: getPersonPhoto("brahimDiaz") },
    { id: "mar-4", name: "Sofyan Amrabat", age: 30, experience: "11 anos de carreira", position: "Atacante", bio: "Motor do meio-campo marroquino.", photo: getPersonPhoto("sofyanAmrabat") },
    { id: "mar-5", name: "Noussair Mazraoui ", age: 27, experience: "11 anos de carreira", position: "Defensor", bio: "Referência defensiva da seleção.", photo: getPersonPhoto("noussairMazraoui") },
  ]),

createTeam("hai", "Haiti", "c", 'HAI', getCountryFlag("haiti"),

  { name: "Sébastien Migné", description: "Treinador francês responsável pela evolução da equipe haitiana.", photo: getPersonPhoto("sébastienMigne") },
  [
    { id: "hai-1", name: "Duckens Nazon", age: 32, experience: "12 anos de carreira", position: "Atacante", bio: "Maior referência ofensiva do Haiti.", photo: getPersonPhoto("duckensNazon") },
    { id: "hai-2", name: "Frantzdy Pierrot", age: 31, experience: "10 anos de carreira", position: "Atacante", bio: "Artilheiro e presença física na área.", photo: getPersonPhoto("frantzdyPierrot") },
    { id: "hai-3", name: "Danley Jean Jacques", age: 25, experience: "6 anos de carreira", position: "Meia", bio: "Principal articulador da equipe.", photo: getPersonPhoto("danleyJeanJacques") },
    { id: "hai-4", name: "Ricardo Adé", age: 35, experience: "14 anos de carreira", position: "Zagueiro", bio: "Líder defensivo e capitão.", photo: getPersonPhoto("ricardoAde") },
    { id: "hai-5", name: "Alexandre Pierre", age: 24, experience: "5 anos de carreira", position: "Goleiro", bio: "Promessa entre os postes.", photo: getPersonPhoto("alexandrePierre") },
  ]),

createTeam("esc", "Escócia", "c", 'ESC', getCountryFlag("escocia"),
  { name: "Steve Clarke", description: "Treinador responsável pelo crescimento recente da Escócia.", photo: getPersonPhoto("steveClarke") },
  [
    { id: "esc-1", name: "Andrew Robertson", age: 32, experience: "14 anos de carreira", position: "Lateral", bio: "Capitão e ídolo da seleção.", photo: getPersonPhoto("andrewRobertson") },
    { id: "esc-2", name: "Scott McTominay", age: 29, experience: "10 anos de carreira", position: "Meia", bio: "Principal destaque do meio-campo.", photo: getPersonPhoto("scottMcTominay") },
    { id: "esc-3", name: "John McGinn", age: 31, experience: "12 anos de carreira", position: "Meia", bio: "Experiência e liderança.", photo: getPersonPhoto("johnMcGinn") },
    { id: "esc-4", name: "Che Adams", age: 29, experience: "7 anos de carreira", position: "Meia", bio: "Talento criativo da equipe.", photo: getPersonPhoto("cheAdams") },
    { id: "esc-5", name: "Angus Gunn", age: 30, experience: "10 anos de carreira", position: "Goleiro", bio: "Titular da seleção escocesa.", photo: getPersonPhoto("angusGunn") },
  ]),

// ===================== GRUPO E =====================

createTeam("ale", "Alemanha", "e", 'ALE', getCountryFlag("alemanha"),
  { name: "Julian Nagelsmann", description: "Jovem técnico alemão conhecido por suas inovações táticas.", photo: getPersonPhoto("julianNagelsmann") },
  [
    { id: "ale-1", name: "Jamal Musiala", age: 23, experience: "6 anos de carreira", position: "Meia", bio: "Principal talento da nova geração alemã." , photo: getPersonPhoto("jamalMusiala") },
    { id: "ale-2", name: "Florian Wirtz", age: 23, experience: "6 anos de carreira", position: "Meia", bio: "Criatividade e visão de jogo excepcionais.", photo: getPersonPhoto("florianWirtz") },
    { id: "ale-3", name: "Joshua Kimmich", age: 31, experience: "13 anos de carreira", position: "Volante", bio: "Líder e referência técnica.", photo: getPersonPhoto("joshuaKimmich") },
    { id: "ale-4", name: "Antonio Rüdiger", age: 33, experience: "15 anos de carreira", position: "Zagueiro", bio: "Principal defensor alemão.", photo: getPersonPhoto("antonioRudiger") },
    { id: "ale-5", name: "Marc-André ter Stegen", age: 34, experience: "15 anos de carreira", position: "Goleiro", bio: "Goleiro de elite do futebol mundial.", photo: getPersonPhoto("marcStegen") },
    { id: "ale-06", name: " Goleo VI e Pille", age: 22, experience: "20 anos de carreira", position: "mascote", bio: "Seu número 06 na camisa representa o ano do Mundial, e seu nome combina “gol” com “leo”.", photo: getPersonPhoto("leao") },
  ]),

createTeam("civ", "Costa do Marfim", "e", 'CIV', getCountryFlag("costaMarfim"),
  { name: "Emerse Faé", description: "Campeão da Copa Africana como treinador.", photo: getPersonPhoto("emerseFae") },
  [
    { id: "civ-1", name: "Sébastien Haller", age: 32, experience: "13 anos de carreira", position: "Atacante", bio: "Referência ofensiva dos marfinenses.", photo: getPersonPhoto("sebastienHaller") },
    { id: "civ-2", name: "Franck Kessié", age: 30, experience: "12 anos de carreira", position: "Volante", bio: "Líder do meio-campo.", photo: getPersonPhoto("franckKessie") },
    { id: "civ-3", name: "Simon Adingra", age: 25, experience: "6 anos de carreira", position: "Atacante", bio: "Velocidade e drible pelas pontas.", photo: getPersonPhoto("simonAdingra") },
    { id: "civ-4", name: "Evan Ndicka", age: 27, experience: "8 anos de carreira", position: "Zagueiro", bio: "Segurança defensiva.", photo: getPersonPhoto("evanNdicka") },
    { id: "civ-5", name: "Odilon Kossounou", age: 25, experience: "7 anos de carreira", position: "Zagueiro", bio: "Defensor forte e veloz.", photo: getPersonPhoto("odilonKossounou") },
  ]),

createTeam("cur", "Curaçao", "e", "CUR", getCountryFlag("curacao"),
  { name: "Dick Advocaat", description: "Veterano treinador holandês.", photo: getPersonPhoto("dickAdvocaat") },
  [
    { id: "cur-1", name: "Eloy Room", age: 37, experience: "16 anos de carreira", position: "Goleiro", bio: "Capitão e ídolo nacional.", photo: getPersonPhoto("eloyRoom") },
    { id: "cur-2", name: "Leandro Bacuna", age: 34, experience: "15 anos de carreira", position: "Meia", bio: "Experiente e versátil.", photo: getPersonPhoto("leandroBacuna") },
    { id: "cur-3", name: "Juninho Bacuna", age: 29, experience: "10 anos de carreira", position: "Meia", bio: "Criativo e técnico.", photo: getPersonPhoto("juninhoBacuna") },
    { id: "cur-4", name: "Cuco Martina", age: 36, experience: "15 anos de carreira", position: "Lateral", bio: "Veterano da equipe.", photo: getPersonPhoto("cucoMartina") },
    { id: "cur-5", name: "Jürgen Locadia", age: 33, experience: "13 anos de carreira", position: "Atacante", bio: "Referência ofensiva.", photo: getPersonPhoto("jurgenLocadia") },
  ]),

createTeam("equ", "Equador", "e", "EQU", getCountryFlag("equador"),
  { name: "Sebastián Beccacece", description: "Treinador argentino conhecido pelo futebol intenso.", photo: getPersonPhoto("sebastianBeccaccee") },
  [
    { id: "equ-1", name: "Moisés Caicedo", age: 25, experience: "8 anos de carreira", position: "Volante", bio: "Principal estrela equatoriana.", photo: getPersonPhoto("moisesCaicedo") },
    { id: "equ-2", name: "Piero Hincapié", age: 24, experience: "7 anos de carreira", position: "Zagueiro", bio: "Defensor moderno e seguro.", photo: getPersonPhoto("pieroHincapie") },
    { id: "equ-3", name: "Willian Pacho", age: 25, experience: "7 anos de carreira", position: "Zagueiro", bio: "Titular absoluto.", photo: getPersonPhoto("willianPacho") },
    { id: "equ-4", name: "Kendry Páez", age: 19, experience: "3 anos de carreira", position: "Meia", bio: "Joia do futebol equatoriano.", photo: getPersonPhoto("kendryPaez") },
    { id: "equ-5", name: "Enner Valencia", age: 37, experience: "17 anos de carreira", position: "Atacante", bio: "Maior artilheiro da história da seleção.", photo: getPersonPhoto("ennerValencia") },
  ]),

// ===================== GRUPO H =====================

createTeam("esp", "Espanha", "h", "ESP", getCountryFlag("espanha"),
  { name: "Luis de la Fuente", description: "Campeão da Euro e líder da nova geração espanhola.", photo: getPersonPhoto("luisFuente") },
  [
    { id: "esp-1", name: "Lamine Yamal", age: 19, experience: "4 anos de carreira", position: "Atacante", bio: "Uma das maiores promessas do futebol mundial." , photo: getPersonPhoto("lamineYamal") },
    { id: "esp-2", name: "Pedri", age: 24, experience: "7 anos de carreira", position: "Meia", bio: "Maestro do meio-campo espanhol.", photo: getPersonPhoto("pedri") },
    { id: "esp-3", name: "Rodri", age: 30, experience: "11 anos de carreira", position: "Volante", bio: "Referência mundial na posição.", photo: getPersonPhoto("rodri") },
    { id: "esp-4", name: "Nico Williams", age: 24, experience: "6 anos de carreira", position: "Atacante", bio: "Velocidade e drible pelas pontas.", photo: getPersonPhoto("nicoWilliams") },
    { id: "esp-5", name: "Unai Simón", age: 29, experience: "11 anos de carreira", position: "Goleiro", bio: "Titular da seleção espanhola.", photo: getPersonPhoto("unaiSimon") },
    { id: "esp-82", name: "Naranjito", age: 44, experience: "43 anos de carreira", position: "Mascote", bio: "Mascote da copa espanhola.", photo: getPersonPhoto("naranjito") },
  ]),

createTeam("uru", "Uruguai", "h", "URU", getCountryFlag("uruguai"),
  { name: "Marcelo Bielsa", description: "Lendário treinador argentino.", photo: getPersonPhoto("marceloBielsa") },
  [
    { id: "uru-1", name: "Federico Valverde", age: 28, experience: "10 anos de carreira", position: "Meia", bio: "Principal estrela uruguaia.", photo: getPersonPhoto("federicoValverde") },
    { id: "uru-2", name: "Darwin Núñez", age: 27, experience: "8 anos de carreira", position: "Atacante", bio: "Atacante explosivo e decisivo.", photo: getPersonPhoto("darwinNunez") },
    { id: "uru-3", name: "Ronald Araújo", age: 27, experience: "9 anos de carreira", position: "Zagueiro", bio: "Líder defensivo.", photo: getPersonPhoto("ronaldAraujo") },
    { id: "uru-4", name: "José María Giménez", age: 31, experience: "13 anos de carreira", position: "Zagueiro", bio: "Experiência e liderança.", photo: getPersonPhoto("joseMariaGimenez") },
    { id: "uru-5", name: "Sergio Rochet", age: 33, experience: "14 anos de carreira", position: "Goleiro", bio: "Titular da seleção.", photo: getPersonPhoto("sergioRochet") },
  ]),

createTeam("sau", "Arábia Saudita", "h", "SAU", getCountryFlag("arabia"),
  { name: "Hervé Renard", description: "Especialista em seleções nacionais.", photo: getPersonPhoto("herveRenard") },
  [
    { id: "sau-1", name: "Salem Al-Dawsari", age: 35, experience: "15 anos de carreira", position: "Atacante", bio: "Maior estrela saudita.", photo: getPersonPhoto("salemAlDawsari") },
    { id: "sau-2", name: "Firas Al-Buraikan", age: 26, experience: "8 anos de carreira", position: "Atacante", bio: "Centroavante da seleção.", photo: getPersonPhoto("firasAlBuraikan") },
    { id: "sau-3", name: "Mohammed Al-Owais", age: 35, experience: "14 anos de carreira", position: "Goleiro", bio: "Experiente goleiro titular.", photo: getPersonPhoto("mohammedAlOwais") },
    { id: "sau-4", name: "Ali Al-Bulaihi", age: 37, experience: "15 anos de carreira", position: "Zagueiro", bio: "Líder da defesa.", photo: getPersonPhoto("aliAlBulaihi") },
    { id: "sau-5", name: "Saud Abdulhamid", age: 27, experience: "8 anos de carreira", position: "Lateral", bio: "Destaque da nova geração.", photo: getPersonPhoto("saudAbdulhamid") },
  ]),

createTeam("cpv", "Cabo Verde", "h", "CV", getCountryFlag("caboVerde"),
  { name: "Bubista", description: "Treinador responsável pelo crescimento internacional da seleção.", photo: getPersonPhoto("bubista") },
  [
    { id: "cpv-1", name: "Ryan Mendes", age: 36, experience: "15 anos de carreira", position: "Atacante", bio: "Capitão e principal referência.", photo: getPersonPhoto("ryanMendes") },
    { id: "cpv-2", name: "Jamiro Monteiro", age: 33, experience: "12 anos de carreira", position: "Meia", bio: "Criatividade e liderança.", photo: getPersonPhoto("jamiroMonteiro") },
    { id: "cpv-3", name: "Bebé", age: 36, experience: "15 anos de carreira", position: "Atacante", bio: "Experiência internacional.", photo: getPersonPhoto("bebe") },
    { id: "cpv-4", name: "Logan Costa", age: 25, experience: "6 anos de carreira", position: "Zagueiro", bio: "Principal nome defensivo.", photo: getPersonPhoto("loganCosta") },
    { id: "cpv-5", name: "Vozinha", age: 39, experience: "18 anos de carreira", position: "Goleiro", bio: "Veterano e ídolo nacional.", photo: getPersonPhoto("vozinha") },

  ]),
];

export const teamById = (id: string) => teams.find(t => t.id === id);
export const playerById = (id: string) => {
  for (const t of teams) {
    const p = t.players.find(p => p.id === id);
    if (p) return { player: p, team: t };
  }
  return null;
};
export const teamsByClass = (c: string) => teams.filter(t => t.classId === c);

export const allPlayerIds = () => teams.flatMap(t => t.players.map(p => p.id));
export const allCoachIds = () => teams.map(t => t.id);

export type Match = {
  id: string;
  group: string;
  home: string;
  away: string;
  date: string; // ISO date
  time: string; // BRT
  stadium: string;
  city: string;
};

export const matches: Match[] = [
 // GRUPO C
{ id: "m9", group: "C", home: "bra", away: "mar", date: "2026-06-13", time: "19:00", stadium: "MetLife Stadium", city: "Nova Jersey" },

{ id: "m10", group: "C", home: "hai", away: "esc", date: "2026-06-13", time: "22:00", stadium: "Gillette Stadium", city: "Boston" },

{ id: "m11", group: "C", home: "esc", away: "mar", date: "2026-06-19", time: "19:00", stadium: "Gillette Stadium", city: "Boston" },

{ id: "m12", group: "C", home: "bra", away: "hai", date: "2026-06-19", time: "22:00", stadium: "Lincoln Financial Field", city: "Filadélfia" },

{ id: "m13", group: "C", home: "esc", away: "bra", date: "2026-06-24", time: "19:00", stadium: "Hard Rock Stadium", city: "Miami" },

{ id: "m14", group: "C", home: "mar", away: "hai", date: "2026-06-24", time: "19:00", stadium: "Mercedes-Benz Stadium", city: "Atlanta" },
// GRUPO E
{ id: "m21", group: "E", home: "ale", away: "civ", date: "2026-06-14", time: "16:00", stadium: "AT&T Stadium", city: "Dallas" },

{ id: "m22", group: "E", home: "cur", away: "equ", date: "2026-06-14", time: "19:00", stadium: "NRG Stadium", city: "Houston" },

{ id: "m23", group: "E", home: "ale", away: "cur", date: "2026-06-20", time: "16:00", stadium: "Mercedes-Benz Stadium", city: "Atlanta" },

{ id: "m24", group: "E", home: "civ", away: "equ", date: "2026-06-20", time: "19:00", stadium: "Hard Rock Stadium", city: "Miami" },

{ id: "m25", group: "E", home: "ale", away: "equ", date: "2026-06-25", time: "19:00", stadium: "Lincoln Financial Field", city: "Filadélfia" },

{ id: "m26", group: "E", home: "civ", away: "cur", date: "2026-06-25", time: "19:00", stadium: "Gillette Stadium", city: "Boston" },
// GRUPO H
{ id: "m15", group: "H", home: "sau", away: "cpv", date: "2026-06-16", time: "16:00", stadium: "Lumen Field", city: "Seattle" },

{ id: "m16", group: "H", home: "esp", away: "uru", date: "2026-06-16", time: "22:00", stadium: "SoFi Stadium", city: "Los Angeles" },

{ id: "m17", group: "H", home: "sau", away: "esp", date: "2026-06-22", time: "16:00", stadium: "AT&T Stadium", city: "Dallas" },

{ id: "m18", group: "H", home: "cpv", away: "uru", date: "2026-06-22", time: "22:00", stadium: "NRG Stadium", city: "Houston" },

{ id: "m19", group: "H", home: "sau", away: "uru", date: "2026-06-28", time: "22:00", stadium: "Arrowhead Stadium", city: "Kansas City" },

{ id: "m20", group: "H", home: "cpv", away: "esp", date: "2026-06-28", time: "22:00", stadium: "Levi's Stadium", city: "San Francisco" },


];

export type CupHistory = {
  year: number;
  host: string;
  champion: string;
  runnerUp: string;
  topScorer: string;
  highlight: string;
};

export const cupHistory: CupHistory[] = [
  { year: 1930, host: "Uruguai", champion: "Uruguai", runnerUp: "Argentina", topScorer: "Guillermo Stábile (8)", highlight: "Primeira Copa do Mundo da história." },

  { year: 1934, host: "Itália", champion: "Itália", runnerUp: "Tchecoslováquia", topScorer: "Oldřich Nejedlý (5)", highlight: "Primeiro título italiano." },

  { year: 1938, host: "França", champion: "Itália", runnerUp: "Hungria", topScorer: "Leônidas (7)", highlight: "Itália conquista o bicampeonato." },

  { year: 1950, host: "Brasil", champion: "Uruguai", runnerUp: "Brasil", topScorer: "Ademir (8)", highlight: "Maracanazo no Maracanã." },

  { year: 1954, host: "Suíça", champion: "Alemanha Ocidental", runnerUp: "Hungria", topScorer: "Sándor Kocsis (11)", highlight: "Milagre de Berna." },

  { year: 1958, host: "Suécia", champion: "Brasil", runnerUp: "Suécia", topScorer: "Just Fontaine (13)", highlight: "Surgimento de Pelé com 17 anos." },

  { year: 1962, host: "Chile", champion: "Brasil", runnerUp: "Tchecoslováquia", topScorer: "Flórián Albert, Garrincha, Ivanov, Jerković, Sánchez e Vavá (4)", highlight: "Brasil bicampeão com Garrincha brilhando." },

  { year: 1966, host: "Inglaterra", champion: "Inglaterra", runnerUp: "Alemanha Ocidental", topScorer: "Eusébio (9)", highlight: "Único título inglês." },

  { year: 1970, host: "México", champion: "Brasil", runnerUp: "Itália", topScorer: "Gerd Müller (10)", highlight: "Tri brasileiro e posse definitiva da Taça Jules Rimet." },

  { year: 1974, host: "Alemanha Ocidental", champion: "Alemanha Ocidental", runnerUp: "Holanda", topScorer: "Grzegorz Lato (7)", highlight: "Cruyff encanta apesar do vice." },

  { year: 1978, host: "Argentina", champion: "Argentina", runnerUp: "Holanda", topScorer: "Mario Kempes (6)", highlight: "Primeiro título argentino." },

  { year: 1982, host: "Espanha", champion: "Itália", runnerUp: "Alemanha Ocidental", topScorer: "Paolo Rossi (6)", highlight: "Rossi leva a Itália ao tricampeonato." },

  { year: 1986, host: "México", champion: "Argentina", runnerUp: "Alemanha Ocidental", topScorer: "Gary Lineker (6)", highlight: "Mão de Deus e gol do século de Maradona." },

  { year: 1990, host: "Itália", champion: "Alemanha Ocidental", runnerUp: "Argentina", topScorer: "Salvatore Schillaci (6)", highlight: "Tricampeonato alemão." },

  { year: 1994, host: "Estados Unidos", champion: "Brasil", runnerUp: "Itália", topScorer: "Hristo Stoichkov e Oleg Salenko (6)", highlight: "Tetra brasileiro nos pênaltis." },

  { year: 1998, host: "França", champion: "França", runnerUp: "Brasil", topScorer: "Davor Šuker (6)", highlight: "Primeiro título francês em casa." },

  { year: 2002, host: "Coreia do Sul/Japão", champion: "Brasil", runnerUp: "Alemanha", topScorer: "Ronaldo (8)", highlight: "Penta brasileiro com Ronaldo Fenômeno." },

  { year: 2006, host: "Alemanha", champion: "Itália", runnerUp: "França", topScorer: "Miroslav Klose (5)", highlight: "Cabeçada de Zidane na final." },

  { year: 2010, host: "África do Sul", champion: "Espanha", runnerUp: "Holanda", topScorer: "Thomas Müller (5)", highlight: "Primeira Copa na África e primeiro título espanhol." },

  { year: 2014, host: "Brasil", champion: "Alemanha", runnerUp: "Argentina", topScorer: "James Rodríguez (6)", highlight: "Mineiraço: Alemanha 7x1 Brasil." },

  { year: 2018, host: "Rússia", champion: "França", runnerUp: "Croácia", topScorer: "Harry Kane (6)", highlight: "Segundo título francês com Mbappé em destaque." },

  { year: 2022, host: "Catar", champion: "Argentina", runnerUp: "França", topScorer: "Kylian Mbappé (8)", highlight: "Messi conquista enfim a Copa do Mundo." },

  { year: 2026, host: "Estados Unidos, Canadá e México", champion: "Indefinido", runnerUp: "Indefinido", topScorer: "Indefinido", highlight: "Copa do Mundo de 48 seleções." },
];

export type QuizQuestion = {
  id: string;
  question: string;
  options: string[];
  correct: number;
};

export const QUIZ_ROUND_SIZE = 5;

export const quizQuestions: QuizQuestion[] = [
  { id: "q1", question: "Quem venceu a primeira Copa do Mundo em 1930?", options: ["Brasil", "Uruguai", "Argentina", "Itália"], correct: 1 },
  { id: "q2", question: "Quantas vezes o Brasil foi campeão mundial?", options: ["3", "4", "5", "6"], correct: 2 },
  { id: "q3", question: "Quem é o maior artilheiro de Copas do Mundo?", options: ["Pelé", "Ronaldo", "Klose", "Müller"], correct: 2 },
  { id: "q4", question: "Onde foi a Copa de 2014?", options: ["África do Sul", "Brasil", "Rússia", "Catar"], correct: 1 },
  { id: "q5", question: "Quem venceu a Copa de 2022?", options: ["França", "Brasil", "Argentina", "Croácia"], correct: 2 },
  { id: "q6", question: "Qual seleção venceu o famoso Maracanazo em 1950?", options: ["Brasil", "Uruguai", "Itália", "Suécia"], correct: 1 },
  { id: "q7", question: "Quem marcou o 'gol do século' em 1986?", options: ["Pelé", "Maradona", "Cruyff", "Zico"], correct: 1 },
  { id: "q8", question: "Em que ano a Espanha foi campeã pela primeira vez?", options: ["2006", "2010", "2014", "2018"], correct: 1 },
  { id: "q9", question: "Quem foi o artilheiro da Copa de 2022?", options: ["Messi", "Mbappé", "Giroud", "Álvarez"], correct: 1 },
  { id: "q10", question: "Qual país sediará parte da Copa de 2026?", options: ["Brasil", "Catar", "México", "Espanha"], correct: 2 },
  { id: "q11", question: "Quantas equipes disputarão a Copa de 2026?", options: ["32", "40", "48", "64"], correct: 2 },
  { id: "q12", question: "Quem foi o capitão da Alemanha campeã em 2014?", options: ["Lahm", "Schweinsteiger", "Neuer", "Klose"], correct: 0 },
  { id: "q13", question: "Em qual Copa o Brasil ganhou o tetracampeonato?", options: ["1986", "1990", "1994", "1998"], correct: 2 },
  { id: "q14", question: "Quem venceu a Copa de 1998?", options: ["Brasil", "França", "Itália", "Alemanha"], correct: 1 },
  { id: "q15", question: "Quantos gols Pelé marcou em Copas?", options: ["10", "12", "14", "16"], correct: 1 },
  { id: "q16", question: "Qual país foi sede da Copa de 2018?", options: ["Brasil", "África do Sul", "Rússia", "Catar"], correct: 2 },
  { id: "q17", question: "Quem ganhou a Bola de Ouro da Copa de 2022?", options: ["Mbappé", "Messi", "Modric", "Neymar"], correct: 1 },
  { id: "q18", question: "Qual seleção é conhecida como 'La Albiceleste'?", options: ["Uruguai", "Argentina", "Chile", "Colômbia"], correct: 1 },
  { id: "q19", question: "Quem foi o técnico do Brasil em 2002?", options: ["Tite", "Dunga", "Felipão", "Parreira"], correct: 2 },
  { id: "q20", question: "Em qual ano a Itália foi campeã pela última vez?", options: ["1982", "1990", "2002", "2006"], correct: 3 },
];