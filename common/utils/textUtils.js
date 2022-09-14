export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const textBothApprovedOppfolgingsplan = (lederNavn) => {
  return `Denne versjonen av planen er godkjent av ${lederNavn} og deg.`;
};
