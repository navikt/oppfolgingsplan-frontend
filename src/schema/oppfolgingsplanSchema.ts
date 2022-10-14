import { array, boolean, number, object, string, z } from "zod";
import { narmesteLederSchema } from "./narmestelederSchema";

export const virksomhetSchema = object({
  virksomhetsnummer: string().nullable(),
  navn: string().nullable(),
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
  interneaktiviteter: boolean().nullable(),
  ekstratid: boolean().nullable(),
  bistand: boolean().nullable(),
  ingen: boolean().nullable(),
});

export const stillingSchema = object({
  virksomhetsnummer: string().nullable(),
  yrke: string().nullable(),
  prosent: number().nullable(),
  fom: string().nullable(),
  tom: string().nullable(),
});

export const personSchema = object({
  navn: string(),
  fnr: string().nullable().optional(),
  epost: string().nullable().optional(),
  tlf: string().nullable().optional(),
  sistInnlogget: string().nullable().optional(),
  samtykke: boolean().nullable().optional(),
  evaluering: evalueringSchema.nullable().optional(),
  stillinger: array(stillingSchema).nullable().optional(),
});

export const kommentarSchema = object({
  id: number(),
  tekst: string(),
  opprettetTidspunkt: string(),
  sistEndretDato: string(),
  opprettetAv: personSchema,
  sistEndretAv: personSchema,
});

export const avbruttplanSchema = object({
  av: personSchema,
  tidspunkt: string(),
  id: number(),
});

export const godkjentPlanSchema = object({
  opprettetTidspunkt: string(),
  gyldighetstidspunkt: gyldighetstidspunktSchema.nullable(),
  tvungenGodkjenning: boolean().nullable(),
  deltMedNAVTidspunkt: string().nullish(),
  deltMedNAV: boolean().nullable(),
  deltMedFastlegeTidspunkt: string().nullish(),
  deltMedFastlege: boolean().nullable(),
  dokumentUuid: string().nullable(),
  avbruttPlan: avbruttplanSchema.nullable(),
});

export const godkjenningSchema = object({
  godkjent: boolean(),
  godkjentAv: personSchema,
  beskrivelse: string(),
  godkjenningsTidspunkt: string(),
  gyldighetstidspunkt: gyldighetstidspunktSchema.nullable(),
  delMedNav: boolean().nullable(),
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
  kommentarer: array(kommentarSchema).nullable(),
  status: string().nullable(),
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
  erVurdertAvSykmeldt: boolean().nullable(),
  gjennomfoering: gjennomforingSchema.nullable(),
  opprettetDato: string(),
  sistEndretDato: string(),
  sistEndretAv: personSchema,
  opprettetAv: personSchema,
});

export const arbeidsgiverSchema = object({
  naermesteLeder: narmesteLederSchema.nullable().optional(),
});

export const oppfolgingsplanSchema = object({
  id: number(),
  sistEndretDato: string(),
  opprettetDato: string(),
  status: string(),
  virksomhet: virksomhetSchema.nullable(),
  godkjentPlan: godkjentPlanSchema.nullable(),
  godkjenninger: array(godkjenningSchema).nullable(),
  arbeidsoppgaveListe: array(arbeidsoppgaveSchema).nullable(),
  tiltakListe: array(tiltakSchema).nullable(),
  avbruttPlanListe: array(avbruttplanSchema).nullable(),
  arbeidsgiver: arbeidsgiverSchema.nullable(),
  arbeidstaker: personSchema,
  sistEndretAv: personSchema,
});

export type Oppfolgingsplan = z.infer<typeof oppfolgingsplanSchema>;
export type Godkjenning = z.infer<typeof godkjenningSchema>;
export type Arbeidsgiver = z.infer<typeof arbeidsgiverSchema>;
export type Arbeidsoppgave = z.infer<typeof arbeidsoppgaveSchema>;
export type Gjennomforing = z.infer<typeof gjennomforingSchema>;
export type Tiltak = z.infer<typeof tiltakSchema>;
export type GodkjentPlan = z.infer<typeof godkjentPlanSchema>;
export type Avbruttplan = z.infer<typeof avbruttplanSchema>;
export type Stilling = z.infer<typeof stillingSchema>;
export type Evaluering = z.infer<typeof evalueringSchema>;
export type Gyldighetstidspunkt = z.infer<typeof gyldighetstidspunktSchema>;
export type Virksomhet = z.infer<typeof virksomhetSchema>;
export type Kommentar = z.infer<typeof kommentarSchema>;
export type Person = z.infer<typeof personSchema>;
