export const LAGRE_ARBEIDSOPPGAVE_FORESPURT = 'LAGRE_ARBEIDSOPPGAVE_FORESPURT';
export const LAGRER_ARBEIDSOPPGAVE = 'LAGRER_ARBEIDSOPPGAVE';
export const ARBEIDSOPPGAVE_LAGRET = 'ARBEIDSOPPGAVE_LAGRET';
export const LAGRE_ARBEIDSOPPGAVE_FEILET = 'LAGRE_ARBEIDSOPPGAVE_FEILET';

export const SLETT_ARBEIDSOPPGAVE_FORESPURT = 'SLETT_ARBEIDSOPPGAVE_FORESPURT';
export const SLETTER_ARBEIDSOPPGAVE = 'SLETTER_ARBEIDSOPPGAVE';
export const ARBEIDSOPPGAVE_SLETTET = 'ARBEIDSOPPGAVE_SLETTET';
export const SLETT_ARBEIDSOPPGAVE_FEILET = 'SLETT_ARBEIDSOPPGAVE_FEILET';

export const lagreArbeidsoppgave = (id, arbeidsoppgave, fnr) => {
  return {
    type: LAGRE_ARBEIDSOPPGAVE_FORESPURT,
    id,
    arbeidsoppgave,
    fnr,
  };
};

export const lagrerArbeidsoppgave = (fnr, arbeidsoppgaveId) => {
  return {
    type: LAGRER_ARBEIDSOPPGAVE,
    fnr,
    arbeidsoppgaveId,
  };
};

export const arbeidsoppgaveLagret = (id, data, arbeidsoppgave, fnr) => {
  return {
    type: ARBEIDSOPPGAVE_LAGRET,
    id,
    data,
    arbeidsoppgave,
    fnr,
  };
};

export const lagreArbeidsoppgaveFeilet = (fnr, arbeidsoppgave) => {
  return {
    type: LAGRE_ARBEIDSOPPGAVE_FEILET,
    fnr,
    arbeidsoppgave,
  };
};

export const slettArbeidsoppgave = (id, arbeidsoppgaveId, fnr) => {
  return {
    type: SLETT_ARBEIDSOPPGAVE_FORESPURT,
    id,
    arbeidsoppgaveId,
    fnr,
  };
};

export const sletterArbeidsoppgave = (fnr) => {
  return {
    type: SLETTER_ARBEIDSOPPGAVE,
    fnr,
  };
};

export const arbeidsoppgaveSlettet = (id, arbeidsoppgaveId, fnr) => {
  return {
    type: ARBEIDSOPPGAVE_SLETTET,
    id,
    arbeidsoppgaveId,
    fnr,
  };
};

export const slettArbeidsoppgaveFeilet = (fnr, arbeidsoppgaveId) => {
  return {
    type: SLETT_ARBEIDSOPPGAVE_FEILET,
    fnr,
    arbeidsoppgaveId,
  };
};
