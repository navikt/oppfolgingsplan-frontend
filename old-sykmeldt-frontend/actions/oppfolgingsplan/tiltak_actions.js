export const LAGRE_TILTAK_FORESPURT = 'LAGRE_TILTAK_FORESPURT';
export const LAGRER_TILTAK = 'LAGRER_TILTAK';
export const TILTAK_LAGRET = 'TILTAK_LAGRET';
export const LAGRE_TILTAK_FEILET = 'LAGRE_TILTAK_FEILET';

export const SLETT_TILTAK_FORESPURT = 'SLETT_TILTAK_FORESPURT';
export const SLETTER_TILTAK = 'SLETTER_TILTAK';
export const TILTAK_SLETTET = 'TILTAK_SLETTET';
export const SLETT_TILTAK_FEILET = 'SLETT_TILTAK_FEILET';

export const lagreTiltak = (id, tiltak, fnr) => {
  return {
    type: LAGRE_TILTAK_FORESPURT,
    id,
    tiltak,
    fnr,
  };
};

export const lagrerTiltak = (fnr, tiltakId) => {
  return {
    type: LAGRER_TILTAK,
    fnr,
    tiltakId,
  };
};

export const tiltakLagret = (id, data, tiltak, fnr) => {
  return {
    type: TILTAK_LAGRET,
    id,
    data,
    tiltak,
    fnr,
  };
};

export const lagreTiltakFeilet = (fnr, tiltak) => {
  return {
    type: LAGRE_TILTAK_FEILET,
    fnr,
    tiltak,
  };
};

export const slettTiltak = (id, tiltakId, fnr) => {
  return {
    type: SLETT_TILTAK_FORESPURT,
    id,
    tiltakId,
    fnr,
  };
};

export const sletterTiltak = (fnr) => {
  return {
    type: SLETTER_TILTAK,
    fnr,
  };
};

export const tiltakSlettet = (id, tiltakId, fnr) => {
  return {
    type: TILTAK_SLETTET,
    id,
    tiltakId,
    fnr,
  };
};

export const slettTiltakFeilet = (fnr, tiltakId) => {
  return {
    type: SLETT_TILTAK_FEILET,
    fnr,
    tiltakId,
  };
};
