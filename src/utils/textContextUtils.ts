export const aktorHarOpprettetElement = (
  innloggetFnr: string | null | undefined,
  arbeidstakerFnr: string,
  opprettetAvFnr: string
): boolean => {
  if (innloggetFnr) {
    return (
      innloggetFnr === opprettetAvFnr ||
      (innloggetFnr !== arbeidstakerFnr && opprettetAvFnr !== arbeidstakerFnr)
    );
  } else {
    return false;
  }
};

export const getAktorNavn = (
  isAudienceSykmeldt: boolean,
  aktorHarOpprettetElement: boolean,
  opprettetAvNavn: string
) => {
  if (isAudienceSykmeldt && aktorHarOpprettetElement) {
    return opprettetAvNavn ? opprettetAvNavn : "Arbeidstaker";
  } else {
    return opprettetAvNavn ? opprettetAvNavn : "Arbeidsgiver";
  }
};
