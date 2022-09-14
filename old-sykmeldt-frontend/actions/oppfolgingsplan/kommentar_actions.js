export const LAGRE_KOMMENTAR_FORESPURT = 'LAGRE_KOMMENTAR_FORESPURT';
export const LAGRER_KOMMENTAR = 'LAGRER_KOMMENTAR';
export const KOMMENTAR_LAGRET = 'KOMMENTAR_LAGRET';
export const LAGRE_KOMMENTAR_FEILET = 'LAGRE_KOMMENTAR_FEILET';

export const SLETT_KOMMENTAR_FORESPURT = 'SLETT_KOMMENTAR_FORESPURT';
export const SLETTER_KOMMENTAR = 'SLETTER_KOMMENTAR';
export const KOMMENTAR_SLETTET = 'KOMMENTAR_SLETTET';
export const SLETT_KOMMENTAR_FEILET = 'SLETT_KOMMENTAR_FEILET';

export const lagreKommentar = (id, tiltakId, kommentar, fnr) => {
  return {
    type: LAGRE_KOMMENTAR_FORESPURT,
    id,
    tiltakId,
    kommentar,
    fnr,
  };
};

export const lagrerKommentar = (fnr, tiltakId) => {
  return {
    type: LAGRER_KOMMENTAR,
    fnr,
    tiltakId,
  };
};

export const kommentarLagret = (id, tiltakId, data, kommentar, fnr) => {
  return {
    type: KOMMENTAR_LAGRET,
    id,
    tiltakId,
    data,
    kommentar,
    fnr,
  };
};

export const lagreKommentarFeilet = (fnr, tiltakId) => {
  return {
    type: LAGRE_KOMMENTAR_FEILET,
    fnr,
    tiltakId,
  };
};

export const slettKommentar = (id, tiltakId, kommentarId, fnr) => {
  return {
    type: SLETT_KOMMENTAR_FORESPURT,
    id,
    tiltakId,
    kommentarId,
    fnr,
  };
};

export const sletterKommentar = (fnr) => {
  return {
    type: SLETTER_KOMMENTAR,
    fnr,
  };
};

export const kommentarSlettet = (id, tiltakId, kommentarId, fnr) => {
  return {
    type: KOMMENTAR_SLETTET,
    id,
    tiltakId,
    kommentarId,
    fnr,
  };
};

export const slettKommentarFeilet = (fnr, tiltakId, kommentarId) => {
  return {
    type: SLETT_KOMMENTAR_FEILET,
    fnr,
    tiltakId,
    kommentarId,
  };
};
