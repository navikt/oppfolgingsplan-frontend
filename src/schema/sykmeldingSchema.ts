import { array, object, string, z } from "zod";

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
  organisasjonsinformasjon: organisasjonsinformasjonSchema,
});

export type Sykmeldingsperiode = z.infer<typeof sykmeldingsperiodeSchema>;
export type Sykmelding = z.infer<typeof sykmeldingSchema>;
export type organisasjonsinformasjon = z.infer<
  typeof organisasjonsinformasjonSchema
>;
