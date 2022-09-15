export const HENT_KONTAKTINFO_FORESPURT = 'HENT_KONTAKTINFO_FORESPURT';
export const HENTER_KONTAKTINFO = 'HENTER_KONTAKTINFO';
export const KONTAKTINFO_HENTET = 'KONTAKTINFO_HENTET';
export const HENT_KONTAKTINFO_FEILET = 'HENT_KONTAKTINFO_FEILET';

export const hentKontaktinfo = (fnr) => {
  return {
    type: HENT_KONTAKTINFO_FORESPURT,
    fnr,
  };
};

export const henterKontaktinfo = (fnr) => {
  return {
    type: HENTER_KONTAKTINFO,
    fnr,
  };
};

export const kontaktinfoHentet = (kontaktinfo, fnr) => {
  return {
    type: KONTAKTINFO_HENTET,
    kontaktinfo,
    fnr,
  };
};

export const hentKontaktinfoFeilet = (fnr) => {
  return {
    type: HENT_KONTAKTINFO_FEILET,
    fnr,
  };
};
