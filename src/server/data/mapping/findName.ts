import { PersonDTO } from "../../../schema/personSchemas";
import { NarmesteLederDTO } from "../../../schema/narmestelederSchema";
import { capitalizeEachWord } from "../../../utils/textContextUtils";

export const findName = (
  narmesteLedere: NarmesteLederDTO[],
  sykmeldt: PersonDTO,
  fnrToFind?: string | null,
): string => {
  if (sykmeldt.fnr === fnrToFind) {
    return capitalizeEachWord(sykmeldt.navn);
  }

  const lederWithFnr = narmesteLedere.find((leder) => leder.fnr === fnrToFind);

  return lederWithFnr?.navn ? capitalizeEachWord(lederWithFnr.navn) : "";
};
