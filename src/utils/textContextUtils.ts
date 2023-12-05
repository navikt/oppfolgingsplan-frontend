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

export const getAktorNavn = (
  isAudienceSykmeldt: boolean,
  opprettetAvNavn: string,
) => {
  if (isAudienceSykmeldt) {
    return opprettetAvNavn ? opprettetAvNavn : "Arbeidstaker";
  } else {
    return opprettetAvNavn ? opprettetAvNavn : "Arbeidsgiver";
  }
};
