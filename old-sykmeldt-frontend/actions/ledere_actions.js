import * as actiontyper from './actiontyper';

export const hentLedere = (fodselsnummer) => {
  return {
    type: actiontyper.HENT_LEDERE_FORESPURT,
    fodselsnummer,
  };
};

export const henterLedere = () => {
  return {
    type: actiontyper.HENTER_LEDERE,
  };
};

export const ledereHentet = (data) => {
  return {
    type: actiontyper.LEDERE_HENTET,
    data,
  };
};

export const hentLedereFeilet = () => {
  return {
    type: actiontyper.HENT_LEDERE_FEILET,
  };
};
