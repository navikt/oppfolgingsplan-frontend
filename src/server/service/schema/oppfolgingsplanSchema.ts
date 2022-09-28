import { boolean, z, object, string, array } from "zod";

export const narmesteLederSchema = object(
    {
      virksomhetsnummer: string(),
      erAktiv: boolean(),
      aktivFom: string(),
      aktivTom: string().nullable(),
      navn: string(),
      fnr: string(),
      epost: string().nullable(),
      tlf: string().nullable(),
      sistInnlogget: string().nullable(),
      samtykke: boolean().nullable()
    }
);

export const narmesteLedereSchema = array(narmesteLederSchema);

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

export type NarmesteLederDTO = z.infer<typeof narmesteLederSchema>;
export type NarmesteLedereDTO = z.infer<typeof narmesteLedereSchema>;
