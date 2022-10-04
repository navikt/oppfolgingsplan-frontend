export const SJEKK_TILGANG_FORESPURT = "SJEKK_TILGANG_FORESPURT";
export const SJEKKER_TILGANG = "SJEKKER_TILGANG";
export const SJEKK_TILGANG_FEILET = "SJEKK_TILGANG_FEILET";
export const SJEKKET_TILGANG = "SJEKKET_TILGANG";
export const SJEKK_TILGANG_403 = "SJEKK_TILGANG_403";

export const sjekkTilgang = () => {
  return {
    type: SJEKK_TILGANG_FORESPURT,
  };
};

export const sjekkerTilgang = () => {
  return {
    type: SJEKKER_TILGANG,
  };
};

export const sjekketTilgang = (data) => {
  return {
    type: SJEKKET_TILGANG,
    data,
  };
};

export const sjekkTilgangFeilet = () => {
  return {
    type: SJEKK_TILGANG_FEILET,
  };
};

export const sjekkTilgang403 = () => {
  return {
    type: SJEKK_TILGANG_403,
  };
};
