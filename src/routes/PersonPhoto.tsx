import { AccordionHeader } from "@radix-ui/react-accordion";

// coachPhoto.tsx
export function getPersonPhoto(personKey: string): string {
  const persons   : Record<string, string> = {
    //Treinadores
    bubista: "/img/jogadoresTreinadores/bubista.png",
    carloAncelotti: "/img/jogadoresTreinadores/carloAncelotti.png",
    dickAdvocaat: "/img/jogadoresTreinadores/dickAdvocaat.png",
    emerseFae: "/img/jogadoresTreinadores/emerseFae.png",
    herveRenard: "/img/jogadoresTreinadores/herveRenard.png",
    julianNagelsmann: "/img/jogadoresTreinadores/julianNagelsmann.png",
    luisFuente: "/img/jogadoresTreinadores/luisFuente.png",
    marceloBielsa: "/img/jogadoresTreinadores/marceloBielsa.png",
    mohamedOuahbi: "/img/jogadoresTreinadores/mohamedOuahbi.png",
    sebastianBeccaccee: "/img/jogadoresTreinadores/sebastianBeccacece.png",
    sébastienMigne: "/img/jogadoresTreinadores/sebastienMigne.png",
    steveClarke: "/img/jogadoresTreinadores/steveClarke.png",
    walidRegragui: "/img/jogadoresTreinadores/walidRegragui.png",

    //Classe C
    //Brasil
    viniciusJr: "/img/jogadoresTreinadores/viniciusJunior.png",
    casemiro: "/img/jogadoresTreinadores/casemiro.png",
    raphinha: "/img/jogadoresTreinadores/raphinha.png",
    alisson: "/img/jogadoresTreinadores/alissonGoleiro.png",
    marquinhos: "/img/jogadoresTreinadores/marquinhos.png",

    //Marrocos
    AchrafHakimi: "/img/jogadoresTreinadores/achrafHakimi.png",
    yassineBounou: "/img/jogadoresTreinadores/yassineBounou.png",
    brahimDiaz: "/img/jogadoresTreinadores/brahimDiaz.png",
    sofyanAmrabat: "/img/jogadoresTreinadores/sofyanAmrabat.png",
    noussairMazraoui: "/img/jogadoresTreinadores/noussairMazraoui.png",

    //Haiti
    duckensNazon: "/img/jogadoresTreinadores/duckensNazon.png",
    frantzdyPierrot: "/img/jogadoresTreinadores/frantzdyPierrot.png",
    danleyJeanJacques: "/img/jogadoresTreinadores/danleyJeanJacques.png",
    ricardoAde: "/img/jogadoresTreinadores/ricardoAde.png",
    alexandrePierre: "/img/jogadoresTreinadores/alexandrePierre.png",

    //Escócia
    andrewRobertson: "/img/jogadoresTreinadores/andrewRobertson.png",
    scottMcTominay: "/img/jogadoresTreinadores/scottMcTominay.png",
    johnMcGinn: "/img/jogadoresTreinadores/johnMcGinn.png",
    cheAdams: "/img/jogadoresTreinadores/cheAdams.png",
    angusGunn: "/img/jogadoresTreinadores/angusGunn.png",

    // Classe E
    //Alemanha
    jamalMusiala: "/img/jogadoresTreinadores/jamalMusiala.png",
    florianWirtz: "/img/jogadoresTreinadores/florianWirtz.png",
    joshuaKimmich: "/img/jogadoresTreinadores/joshuaKimmich.png",
    antonioRudiger: "/img/jogadoresTreinadores/antonioRudiger.png",
    marcStegen: "/img/jogadoresTreinadores/marcStegen.png",

    //Costa do Marfim
    sebastienHaller: "/img/jogadoresTreinadores/sebastienHaller.png",
    franckKessie: "/img/jogadoresTreinadores/franckKessie.png",
    simonAdingra: "/img/jogadoresTreinadores/simonAdingra.png",
    evanNdicka: "/img/jogadoresTreinadores/evanNdicka.png",
    odilonKossounou: "/img/jogadoresTreinadores/odilonKossounou.png",

    //Curaçao
    eloyRoom: "/img/jogadoresTreinadores/eloyRoom.png",
    leandroBacuna: "/img/jogadoresTreinadores/leandroBacuna.png",
    juninhoBacuna: "/img/jogadoresTreinadores/junhinhoBacuna.png",
    cucoMartina: "/img/jogadoresTreinadores/cucoMartina.png",
    jurgenLocadia: "/img/jogadoresTreinadores/jurgenLocadia.png",

    //Equador
    moisesCaicedo: "/img/jogadoresTreinadores/moisesCaicedo.png",
    pieroHincapie: "/img/jogadoresTreinadores/pieroHincapie.png",
    willianPacho: "/img/jogadoresTreinadores/willianPacho.png",
    kendryPaez: "/img/jogadoresTreinadores/kendryPaez.png",
    ennerValencia: "/img/jogadoresTreinadores/ennerValencia.png",

    //Grupo H
    //Espanha
    lamineYamal: "/img/jogadoresTreinadores/lamineYamal.png",
    pedri: "/img/jogadoresTreinadores/pedri.png",
    rodri: "/img/jogadoresTreinadores/rodri.png",
    nicoWilliams: "/img/jogadoresTreinadores/nicoWilliams.png",
    unaiSimon: "/img/jogadoresTreinadores/unaiSimon.png",

    //Uruguai
    federicoValverde: "/img/jogadoresTreinadores/federicoValverde.png",
    darwinNunez: "/img/jogadoresTreinadores/darwinNunez.png",
    ronaldAraujo: "/img/jogadoresTreinadores/ronaldAraujo.png",
    joseMariaGimenez: "/img/jogadoresTreinadores/joseMaria.png",
    sergioRochet: "/img/jogadoresTreinadores/sergioRochet.png",

    //Arábia Saudita
    salemAlDawsari: "/img/jogadoresTreinadores/salemAlDawsari.png",
    firasAlBuraikan: "/img/jogadoresTreinadores/firasAlBuraikan.png",
    mohammedAlOwais: "/img/jogadoresTreinadores/mohammedAlOwais.png",
    aliAlBulaihi: "/img/jogadoresTreinadores/aliAlBulaihi.png",
    saudAbdulhamid: "/img/jogadoresTreinadores/saudAbdulhamid.png",

    //Cabo verde
    ryanMendes: "/img/jogadoresTreinadores/ryanMendes.png",
    jamiroMonteiro: "/img/jogadoresTreinadores/jamiroMonteiro.png",
    bebe: "/img/jogadoresTreinadores/bebe.png",
    loganCosta: "/img/jogadoresTreinadores/loganCosta.png",
    vozinha: "/img/jogadoresTreinadores/vozinha.png",

    //Mascotes
    canarinho: "/img/jogadoresTreinadores/canarinhoPistola.png",
    leao: "/img/jogadoresTreinadores/goleoVI.png",
    naranjito: "/img/jogadoresTreinadores/naranjito.png",

  };
  
  return persons[personKey] || "/img/jogadoresTreinadores/default.png";
}