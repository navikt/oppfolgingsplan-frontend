import { boolean, z, object, string } from "zod";

export const sykmeldtSchema = object({
  narmestelederId: string(),
  orgnummer: string(),
  fnr: string(),
  navn: string().nullish(),
  aktivSykmelding: boolean().nullish(),
});

export type Sykmeldt = z.infer<typeof sykmeldtSchema>;
