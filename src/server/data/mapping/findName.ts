import { NarmesteLederDTO } from "../../../schema/narmestelederSchema";
import { PersonV3DTO } from "../../../schema/personSchemas";

export const findName = (
  narmesteLedere: NarmesteLederDTO[],
  sykmeldt: PersonV3DTO,
  fnrToFind?: string | null,
): string => {
  if (sykmeldt.fnr === fnrToFind) {
    return sykmeldt.navn;
  }

  const lederWithFnr = narmesteLedere.find((leder) => leder.fnr === fnrToFind);

  if (lederWithFnr) return lederWithFnr.navn;

  return "";
};
