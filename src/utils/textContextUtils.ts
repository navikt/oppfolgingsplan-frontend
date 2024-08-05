export const aktorHarOpprettetElement = (
  isAudienceSykmeldt: boolean,
  arbeidstakerFnr: string,
  opprettetAvFnr: string,
): boolean => {
  if (isAudienceSykmeldt) {
    return opprettetAvFnr === arbeidstakerFnr;
  }
  return opprettetAvFnr !== arbeidstakerFnr;
};

export function capitalizeEachWord(stringToBeCapitalized: string) {
  return stringToBeCapitalized
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export const getAktorNavn = (
  isAudienceSykmeldt: boolean,
  opprettetAvNavn: string,
) => {
  const capitalizedNavn = capitalizeEachWord(opprettetAvNavn);

  if (isAudienceSykmeldt) {
    return opprettetAvNavn ? capitalizedNavn : "Arbeidstaker";
  } else {
    return opprettetAvNavn ? capitalizedNavn : "Arbeidsgiver";
  }
};
