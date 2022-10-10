import { z, object, string, array } from "zod";

export const sykmeldingsperiodeSchema = object({
  fom: string(),
  tom: string(),
});

export const organisasjonsinformasjonSchema = object({
  orgnummer: string(),
  orgNavn: string(),
});

export const sykmeldingSchema = object({
  id: string(),
  fnr: string(),
  sykmeldingsperioder: array(sykmeldingsperiodeSchema),
  organisasjonsinformasjon: organisasjonsinformasjonSchema.nullable(),
});

export type Sykmelding = z.infer<typeof sykmeldingSchema>;
