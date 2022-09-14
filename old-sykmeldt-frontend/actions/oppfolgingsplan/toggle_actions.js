export const SETT_AKTIVT_STEG = 'SETT_AKTIVT_STEG';

export const settAktivtSteg = (steg) => {
  return {
    type: SETT_AKTIVT_STEG,
    steg,
  };
};
