export const DEL_MED_NAV_FORESPURT = 'DEL_MED_NAV_FORESPURT';
export const DELER_MED_NAV = 'DELER_MED_NAV';
export const DELT_MED_NAV = 'DELT_MED_NAV';
export const DEL_MED_NAV_FEILET = 'DEL_MED_NAV_FEILET';

export const delMedNav = (id, fnr) => {
  return {
    type: DEL_MED_NAV_FORESPURT,
    id,
    fnr,
  };
};

export const delerMedNav = (fnr) => {
  return {
    type: DELER_MED_NAV,
    fnr,
  };
};

export const deltMedNav = (id, fnr) => {
  return {
    type: DELT_MED_NAV,
    id,
    fnr,
  };
};

export const delMedNavFeilet = (fnr) => {
  return {
    type: DEL_MED_NAV_FEILET,
    fnr,
  };
};
