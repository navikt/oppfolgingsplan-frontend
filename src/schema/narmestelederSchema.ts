import { boolean, object, string, z } from "zod";

export const narmesteLederSchema = object({
  virksomhetsnummer: string().nullish(),
  erAktiv: boolean().nullish(),
  aktivFom: string().nullish(),
  aktivTom: string().nullable(),
  navn: string(),
  fnr: string().nullish(),
  epost: string().nullable(),
  tlf: string().nullable(),
  sistInnlogget: string().nullable(),
  samtykke: boolean().nullable(),
});

export const narmesteLederV3Schema = object({
  virksomhetsnummer: string(),
  erAktiv: boolean(),
  aktivFom: string(),
  aktivTom: string().nullable(),
  navn: string(),
  fnr: string(),
  epost: string().nullable(),
  tlf: string().nullable(),
  sistInnlogget: string().nullable(),
  samtykke: boolean().nullable(),
});

export type NarmesteLederDTO = z.infer<typeof narmesteLederSchema>;
export type NarmesteV3LederDTO = z.infer<typeof narmesteLederV3Schema>;
