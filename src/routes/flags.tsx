// countryFlag.tsx
export function getCountryFlag(countryKey: string): string {
  const flags: Record<string, string> = {
    brasil: "/img/paises/brasil.png",
    marrocos: "/img/paises/marrocos.png",
    alemanha: "/img/paises/alemanha.png",
    arabia: "/img/paises/arabia.png",
    caboVerde: "/img/paises/caboVerde.png",
    curacao: "/img/paises/curacao.png",
    equador: "/img/paises/equador.png",
    escocia: "/img/paises/escocia.png",
    espanha: "/img/paises/espanha.png",
    haiti: "/img/paises/haiti.png",
    costaMarfim: "/img/paises/costaMarfim.png",
    uruguai: "/img/paises/uruguai.png"
  };
  
  return flags[countryKey] || "/img/paises/default.png";
}