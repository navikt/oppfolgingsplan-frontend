import { boolean, z, object, string, array } from "zod";

export const Sykmeldingsperiode = object({
      fom: string(),
      tom: string(),
})

export const Organisasjonsinformasjon  = object({
      orgnummer: string(),
      orgNavn: string()
})

export const Sykmelding = object({
      id: string(),
      fnr: string(),
      sykmeldingsperioder: array(Sykmeldingsperiode),
      organisasjonsinformasjon: Organisasjonsinformasjon
})

export type OrganisasjonsinformasjonDTO = z.infer<typeof Organisasjonsinformasjon>;
export type SykmeldingsperiodeDTO = z.infer<typeof Sykmeldingsperiode>;
export type SykmeldingDTO = z.infer<typeof Sykmelding>;

