export const HENT_ARBEIDSFORHOLD_FORESPURT = 'HENT_ARBEIDSFORHOLD_FORESPURT';
export const HENTER_ARBEIDSFORHOLD = 'HENTER_ARBEIDSFORHOLD';
export const HENT_ARBEIDSFORHOLD_FEILET = 'HENT_ARBEIDSFORHOLD_FEILET';
export const HENTET_ARBEIDSFORHOLD = 'HENTET_ARBEIDSFORHOLD';

export const hentArbeidsforhold = (fnr, virksomhetsnummer, fom) => {
  return {
    type: HENT_ARBEIDSFORHOLD_FORESPURT,
    fnr,
    virksomhetsnummer,
    fom,
  };
};

export const henterArbeidsforhold = (fnr, virksomhetsnummer) => {
  return {
    type: HENTER_ARBEIDSFORHOLD,
    fnr,
    virksomhetsnummer,
  };
};

export const hentetArbeidsforhold = (stillinger = [], fnr, virksomhetsnummer) => {
  return {
    type: HENTET_ARBEIDSFORHOLD,
    stillinger,
    fnr,
    virksomhetsnummer,
  };
};

export const hentArbeidsforholdFeilet = (fnr, virksomhetsnummer) => {
  return {
    type: HENT_ARBEIDSFORHOLD_FEILET,
    fnr,
    virksomhetsnummer,
  };
};
