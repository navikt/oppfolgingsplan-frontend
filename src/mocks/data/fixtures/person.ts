import { SYKMELDT } from "../constants";
import { createPerson } from "../factories/oppfolgingsplan";

export const sykmeldtPerson = createPerson({
  navn: SYKMELDT.navn,
  fnr: SYKMELDT.fnr,
});
