export const NULLSTILL_GODKJENNING_FORESPURT = 'NULLSTILL_GODKJENNING_FORESPURT';
export const NULLSTILLER_GODKJENNING = 'NULLSTILLER_GODKJENNING';
export const NULLSTILT_GODKJENNING = 'NULLSTILT_GODKJENNING';
export const NULLSTILL_GODKJENNING_FEILET = 'NULLSTILL_GODKJENNING_FEILET';

export const nullstillGodkjenning = (id, fnr) => {
  return {
    type: NULLSTILL_GODKJENNING_FORESPURT,
    id,
    fnr,
  };
};

export const nullstillerGodkjenning = (fnr) => {
  return {
    type: NULLSTILLER_GODKJENNING,
    fnr,
  };
};

export const nullstiltGodkjenning = (id, fnr) => {
  return {
    type: NULLSTILT_GODKJENNING,
    id,
    fnr,
  };
};

export const nullstillGodkjenningFeilet = (fnr) => {
  return {
    type: NULLSTILL_GODKJENNING_FEILET,
    fnr,
  };
};
