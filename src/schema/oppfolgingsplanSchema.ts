import { boolean, z, object, string, number, array } from "zod";

export const virksomhetSchema = object({
  virksomhetsnummer: string(),
  navn: string(),
});

export const gyldighetstidspunktSchema = object({
  fom: string(),
  tom: string(),
  evalueres: string(),
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
  virksomhetsnummer: string(),
  yrke: string(),
  prosent: number(),
  fom: string(),
  tom: string(),
});

export const personSchema = object({
  navn: string(),
  fnr: string().nullable(),
  epost: string().nullable(),
  tlf: string().nullable(),
  sistInnlogget: string().nullable(),
  samtykke: boolean().nullable(),
  evaluering: evalueringSchema.nullable(),
  stillinger: array(stillingSchema),
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
  id: number().nullable(),
});

export const godkjentPlanSchema = object({
  opprettetTidspunkt: string(),
  gyldighetstidspunkt: gyldighetstidspunktSchema,
  tvungenGodkjenning: boolean(),
  deltMedNAVTidspunkt: string(),
  deltMedNAV: boolean(),
  deltMedFastlegeTidspunkt: string(),
  deltMedFastlege: boolean(),
  dokumentUuid: string(),
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
  fom: string(),
  tom: string(),
  beskrivelse: string().nullable(),
  beskrivelseIkkeAktuelt: string(),
  opprettetDato: string(),
  sistEndretDato: string(),
  kommentarer: array(kommentarSchema),
  status: string(),
  gjennomfoering: string(),
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
  gjennomfoering: gjennomforingSchema.nullable(),
  opprettetDato: string(),
  sistEndretDato: string(),
  sistEndretAv: personSchema,
  opprettetAv: personSchema,
});

export const oppfolgingsplanNarmesteLederSchema = object({
  virksomhetsnummer: string().nullable(),
  erAktiv: boolean(),
  aktivFom: string().nullable(),
  aktivTom: string().nullable(),
  navn: string(),
  fnr: string().nullable(),
  epost: string().nullable(),
  tlf: string().nullable(),
  sistInnlogget: string().nullable(),
  samtykke: boolean().nullable(),
  evaluering: evalueringSchema.nullable(),
});

export const arbeidsgiverSchema = object({
  naermesteLeder: oppfolgingsplanNarmesteLederSchema,
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
});

export type Oppfolgingsplan = z.infer<typeof oppfolgingsplanSchema>;
export type Tiltak = z.infer<typeof tiltakSchema>;
export type Stilling = z.infer<typeof stillingSchema>;
export type Kommentar = z.infer<typeof kommentarSchema>;
