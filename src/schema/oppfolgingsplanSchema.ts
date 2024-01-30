import { array, boolean, number, object, string, z } from "zod";
import { narmesteLederSchema } from "./narmestelederSchema";

export const virksomhetSchema = object({
  virksomhetsnummer: string(),
  navn: string(),
});

export const gyldighetstidspunktSchema = object({
  fom: string().nullish(),
  tom: string().nullish(),
  evalueres: string().nullish(),
});

export const evalueringSchema = object({
  effekt: string().nullable(),
  hvorfor: string().nullable(),
  videre: string().nullable(),
  interneaktiviteter: boolean(),
  ekstratid: boolean().nullable(),
  bistand: boolean().nullable(),
  ingen: boolean().nullable(),
});

export const stillingSchema = object({
  yrke: string(),
  prosent: number(),
});

export const personSchema = object({
  navn: string(),
  fnr: string(),
  epost: string().nullish(),
  tlf: string().nullable().optional(),
  sistInnlogget: string().nullable().optional(),
  samtykke: boolean().nullable().optional(),
  evaluering: evalueringSchema.nullable().optional(),
  stillinger: array(stillingSchema),
});

export const kommentarSchema = object({
  id: number(),
  tekst: string().nullable(),
  opprettetTidspunkt: string(),
  sistEndretDato: string(),
  opprettetAv: personSchema,
  sistEndretAv: personSchema,
});

export const godkjentAvbruttplanSchema = object({
  tidspunkt: string(),
  id: number().nullish(),
});

export const godkjentPlanSchema = object({
  opprettetTidspunkt: string(),
  gyldighetstidspunkt: gyldighetstidspunktSchema,
  tvungenGodkjenning: boolean(),
  deltMedNAVTidspunkt: string().nullish(),
  deltMedNAV: boolean(),
  deltMedFastlegeTidspunkt: string().nullish(),
  deltMedFastlege: boolean(),
  dokumentUuid: string(),
  avbruttPlan: godkjentAvbruttplanSchema.nullable(),
});

export const godkjenningSchema = object({
  godkjent: boolean(),
  godkjentAv: personSchema,
  beskrivelse: string().nullish(),
  godkjenningsTidspunkt: string(),
  gyldighetstidspunkt: gyldighetstidspunktSchema,
  delMedNav: boolean(),
});

export const tiltakSchema = object({
  tiltakId: number(),
  tiltaknavn: string(),
  knyttetTilArbeidsoppgaveId: number().nullable(),
  fom: string().nullish(),
  tom: string().nullish(),
  beskrivelse: string().nullable(),
  beskrivelseIkkeAktuelt: string().nullish(),
  opprettetDato: string(),
  sistEndretDato: string(),
  kommentarer: array(kommentarSchema),
  status: string(),
  gjennomfoering: string().nullish(),
  opprettetAv: personSchema,
  sistEndretAv: personSchema,
});

export const gjennomforingSchema = object({
  kanGjennomfoeres: string(),
  paaAnnetSted: boolean().nullable(),
  medMerTid: boolean().nullable(),
  medHjelp: boolean().nullable(),
  kanBeskrivelse: string().nullable(),
  kanIkkeBeskrivelse: string().nullable(),
});

export const arbeidsoppgaveSchema = object({
  arbeidsoppgaveId: number(),
  arbeidsoppgavenavn: string(),
  erVurdertAvSykmeldt: boolean(),
  gjennomfoering: gjennomforingSchema.nullish(),
  opprettetDato: string(),
  sistEndretDato: string(),
  sistEndretAv: personSchema,
  opprettetAv: personSchema,
});

export const arbeidsgiverSchema = object({
  naermesteLeder: narmesteLederSchema.nullish(),
});

export const avbruttplanSchema = object({
  tidspunkt: string(),
  id: number(),
});

export const oppfolgingsplanSchema = object({
  id: number(),
  sistEndretDato: string(),
  opprettetDato: string(),
  status: string(),
  virksomhet: virksomhetSchema,
  godkjentPlan: godkjentPlanSchema.nullable(),
  godkjenninger: array(godkjenningSchema),
  arbeidsoppgaveListe: array(arbeidsoppgaveSchema),
  tiltakListe: array(tiltakSchema),
  avbruttPlanListe: array(avbruttplanSchema),
  arbeidsgiver: arbeidsgiverSchema,
  arbeidstaker: personSchema,
  sistEndretAv: personSchema,
  skalHaVarsel: boolean().nullish(),
});

export type OppfolgingsplanDTO = z.infer<typeof oppfolgingsplanSchema>;
export type StillingDTO = z.infer<typeof stillingSchema>;
export type VirksomhetDTO = z.infer<typeof virksomhetSchema>;
export type PersonDTO = z.infer<typeof personSchema>;
export type ArbeidsgiverDTO = z.infer<typeof arbeidsgiverSchema>;
export type ArbeidsOppgaveDTO = z.infer<typeof arbeidsoppgaveSchema>;
export type GodkjenningDTO = z.infer<typeof godkjenningSchema>;
export type TiltakDTO = z.infer<typeof tiltakSchema>;
export type KommentarDTO = z.infer<typeof kommentarSchema>;
export type GjennomforingDTO = z.infer<typeof gjennomforingSchema>;
export type GodkjentPlanDTO = z.infer<typeof godkjentPlanSchema>;
export type GyldighetstidspunktDTO = z.infer<typeof gyldighetstidspunktSchema>;
export type AvbruttplanDTO = z.infer<typeof avbruttplanSchema>;
