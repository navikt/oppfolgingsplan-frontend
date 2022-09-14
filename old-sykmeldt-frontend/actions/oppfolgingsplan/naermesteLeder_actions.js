export const HENT_NAERMESTELEDER_FORESPURT = 'HENT_NAERMESTELEDER_FORESPURT';
export const HENTER_NAERMESTELEDER = 'HENTER_NAERMESTELEDER';
export const NAERMESTELEDER_HENTET = 'NAERMESTELEDER_HENTET';
export const HENT_NAERMESTELEDER_FEILET = 'HENT_NAERMESTELEDER_FEILET';
export const INGEN_NAERMESTELEDER = 'INGEN_NAERMESTELEDER';

export const hentNaermesteLeder = (fnr, virksomhetsnummer) => {
  return {
    type: HENT_NAERMESTELEDER_FORESPURT,
    fnr,
    virksomhetsnummer,
  };
};

export const henterNaermesteLeder = (fnr, virksomhetsnummer) => {
  return {
    type: HENTER_NAERMESTELEDER,
    fnr,
    virksomhetsnummer,
  };
};

export const naermesteLederHentet = (naermesteLeder, fnr, virksomhetsnummer) => {
  return {
    type: NAERMESTELEDER_HENTET,
    naermesteLeder,
    fnr,
    virksomhetsnummer,
  };
};

export const hentNaermesteLederFeilet = (fnr, virksomhetsnummer) => {
  return {
    type: HENT_NAERMESTELEDER_FEILET,
    fnr,
    virksomhetsnummer,
  };
};

export const ingenNaermesteLeder = (fnr, virksomhetsnummer) => {
  return {
    type: INGEN_NAERMESTELEDER,
    fnr,
    virksomhetsnummer,
  };
};
