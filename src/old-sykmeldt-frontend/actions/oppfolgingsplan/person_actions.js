export const HENT_PERSON_FORESPURT = 'HENT_PERSON_FORESPURT';
export const HENTER_PERSON = 'HENTER_PERSON';
export const PERSON_HENTET = 'PERSON_HENTET';
export const HENT_PERSON_FEILET = 'HENT_PERSON_FEILET';

export const hentPerson = (fnr) => {
  return {
    type: HENT_PERSON_FORESPURT,
    fnr,
  };
};

export const henterPerson = (fnr) => {
  return {
    type: HENTER_PERSON,
    fnr,
  };
};

export const personHentet = (person, fnr) => {
  return {
    type: PERSON_HENTET,
    person,
    fnr,
  };
};

export const hentPersonFeilet = (fnr) => {
  return {
    type: HENT_PERSON_FEILET,
    fnr,
  };
};
