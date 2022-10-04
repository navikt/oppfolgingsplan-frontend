export const hentAktoerNavnInitialer = (aktoerNavn: string) => {
  let initialer = "";
  if (aktoerNavn.length === 0) {
    return initialer;
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
