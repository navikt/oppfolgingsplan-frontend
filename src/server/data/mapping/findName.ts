import { NarmesteLeder } from "../../../schema/narmestelederSchema";
import { Person } from "../../../schema/oppfolgingsplanSchema";

export const findName = (
  narmesteLedere: NarmesteLeder[],
  sykmeldt: Person,
  fnrToFind?: string | null
): string => {
  if (sykmeldt.fnr === fnrToFind) {
    return sykmeldt.navn;
  }

  const lederWithFnr = narmesteLedere.find((leder) => leder.fnr === fnrToFind);

  if (lederWithFnr) return lederWithFnr.navn;

  return "";
};
