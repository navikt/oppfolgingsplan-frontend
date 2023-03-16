import { createPersonDTO } from "../factories/oppfolgingsplanDTO";
import { SYKMELDT } from "../constants";

export const sykmeldtPersonDTO = createPersonDTO({
  navn: SYKMELDT.navn,
  fnr: SYKMELDT.fnr,
});
