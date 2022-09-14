export const HENT_VIRKSOMHET_FORESPURT = 'HENT_VIRKSOMHET_FORESPURT';
export const HENTER_VIRKSOMHET = 'HENTER_VIRKSOMHET';
export const VIRKSOMHET_HENTET = 'VIRKSOMHET_HENTET';
export const HENT_VIRKSOMHET_FEILET = 'HENT_VIRKSOMHET_FEILET';

export const hentVirksomhet = (virksomhetsnummer) => {
  return {
    type: HENT_VIRKSOMHET_FORESPURT,
    virksomhetsnummer,
  };
};

export const henterVirksomhet = (virksomhetsnummer) => {
  return {
    type: HENTER_VIRKSOMHET,
    virksomhetsnummer,
  };
};

export const virksomhetHentet = (virksomhet, virksomhetsnummer) => {
  return {
    type: VIRKSOMHET_HENTET,
    virksomhet,
    virksomhetsnummer,
  };
};

export const hentVirksomhetFeilet = (virksomhetsnummer) => {
  return {
    type: HENT_VIRKSOMHET_FEILET,
    virksomhetsnummer,
  };
};
