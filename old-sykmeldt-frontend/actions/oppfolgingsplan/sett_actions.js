export const SETT_DIALOG_FORESPURT = 'SETT_DIALOG_FORESPURT';
export const SETTER_SETT_DIALOG = 'SETTER_SETT_DIALOG';
export const SETT_DIALOG_FEILET = 'SETT_DIALOG_FEILET';
export const DIALOG_SETT = 'DIALOG_SETT';

export const settDialog = (id) => {
  return {
    type: SETT_DIALOG_FORESPURT,
    id,
  };
};

export const setterSettDialog = () => {
  return {
    type: SETTER_SETT_DIALOG,
  };
};

export const dialogSett = (id) => {
  return {
    type: DIALOG_SETT,
    id,
  };
};

export const settDialogFeilet = () => {
  return {
    type: SETT_DIALOG_FEILET,
  };
};
