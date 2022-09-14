export const DEL_MED_FASTLEGE_FORESPURT = 'DEL_MED_FASTLEGE_FORESPURT';
export const DELER_MED_FASTLEGE = 'DELER_MED_FASTLEGE';
export const DELT_MED_FASTLEGE = 'DELT_MED_FASTLEGE';
export const DEL_MED_FASTLEGE_FEILET = 'DEL_MED_FASTLEGE_FEILET';

export const delMedFastlege = (id, fnr) => {
  return {
    type: DEL_MED_FASTLEGE_FORESPURT,
    id,
    fnr,
  };
};

export const delerMedFastlege = (fnr) => {
  return {
    type: DELER_MED_FASTLEGE,
    fnr,
  };
};

export const deltMedFastlege = (id, fnr) => {
  return {
    type: DELT_MED_FASTLEGE,
    id,
    fnr,
  };
};

export const delMedFastlegeFeilet = (fnr) => {
  return {
    type: DEL_MED_FASTLEGE_FEILET,
    fnr,
  };
};
