export const AVBRYT_DIALOG_FORESPURT = 'AVBRYT_DIALOG_FORESPURT';
export const AVBRYTER_DIALOG = 'AVBRYTER_DIALOG';
export const AVBRYT_DIALOG_FEILET = 'AVBRYT_DIALOG_FEILET';
export const DIALOG_AVBRUTT = 'DIALOG_AVBRUTT';
export const DIALOG_AVBRUTT_OG_NY_OPPRETTET = 'DIALOG_AVBRUTT_OG_NY_OPPRETTET';

export const avbrytDialog = (id, fnr) => {
  return {
    type: AVBRYT_DIALOG_FORESPURT,
    id,
    fnr,
  };
};

export const avbryterDialog = (fnr) => {
  return {
    type: AVBRYTER_DIALOG,
    fnr,
  };
};

export const dialogAvbrutt = (id, fnr) => {
  return {
    type: DIALOG_AVBRUTT,
    id,
    fnr,
  };
};

export const avbrytDialogFeilet = (fnr) => {
  return {
    type: AVBRYT_DIALOG_FEILET,
    fnr,
  };
};

export const dialogAvbruttOgNyOpprettet = (nyPlanId) => {
  return {
    type: DIALOG_AVBRUTT_OG_NY_OPPRETTET,
    nyPlanId,
  };
};
