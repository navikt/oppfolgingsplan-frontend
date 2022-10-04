import { z, object, string, array } from "zod";

export const SykmeldingsperiodeSchema = object({
  fom: string(),
  tom: string(),
});

export const OrganisasjonsinformasjonSchema = object({
  orgnummer: string(),
  orgNavn: string(),
});

export const SykmeldingSchema = object({
  id: string(),
  fnr: string(),
  sykmeldingsperioder: array(SykmeldingsperiodeSchema),
  organisasjonsinformasjon: OrganisasjonsinformasjonSchema,
});

export type OrganisasjonsinformasjonDTO = z.infer<
  typeof OrganisasjonsinformasjonSchema
>;
export type SykmeldingsperiodeDTO = z.infer<typeof SykmeldingsperiodeSchema>;
export type SykmeldingDTO = z.infer<typeof SykmeldingSchema>;
