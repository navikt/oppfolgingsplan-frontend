import { PersonDTO } from "../../../schema/personSchemas";
import { NarmesteLederDTO } from "../../../schema/narmestelederSchema";

export const findName = (
  narmesteLedere: NarmesteLederDTO[],
  sykmeldt: PersonDTO,
  fnrToFind?: string | null,
): string => {
  if (sykmeldt.fnr === fnrToFind) {
    return sykmeldt.navn;
  }

  const lederWithFnr = narmesteLedere.find((leder) => leder.fnr === fnrToFind);

  return lederWithFnr?.navn || "";
};
