export const hentAktoerNavnInitialer = (
  aktoerNavn: string,
  isAudienceSykmeldt: boolean,
) => {
  let initialer = "";
  if (aktoerNavn.length === 0) {
    return isAudienceSykmeldt ? "AT" : "AG";
  }
  const navneListe = aktoerNavn.split(" ");
  if (navneListe.length > 2) {
    initialer =
      navneListe[0].slice(0, 1) + navneListe[navneListe.length - 1].slice(0, 1);
  } else {
    navneListe.forEach((navn) => {
      initialer = initialer.concat(navn.slice(0, 1));
    });
  }
  return initialer;
};

export const capitalizeFirstLetter = (val: string) => {
  return val.charAt(0).toUpperCase() + val.slice(1);
};

export const addSpaceAfterEverySixthCharacter = (value: string): string => {
  return value.replace(/(.{6})/g, "$1 ");
};
