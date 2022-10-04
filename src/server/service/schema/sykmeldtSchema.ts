import { boolean, z, object, string } from "zod";

export const SykmeldtSchema = object({
  narmestelederId: string(),
  orgnummer: string(),
  fnr: string(),
  navn: string().nullish(),
  aktivSykmelding: boolean().nullish(),
});

export type SykmeldtDTO = z.infer<typeof SykmeldtSchema>;
