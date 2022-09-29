import {boolean, z, object, string, number, array} from "zod";
import {narmesteLederSchema} from "@/server/service/schema/narmestelederSchema";

export const VirksomhetSchema = object({
      virksomhetsnummer: string(),
      navn: string()
})

export const GyldighetstidspunktSchema = object({
      fom: string(),
      tom: string(),
      evalueres: string()
})

export const EvalueringSchema = object({
      effekt: string().nullable(),
      hvorfor: string().nullable(),
      videre: string().nullable(),
      interneaktiviteter: string().nullable(),
      ekstratid: boolean().nullable(),
      bistand: boolean().nullable(),
      ingen: boolean().nullable()
})

export const StillingSchema = object({
      virksomhetsnummer: string(),
      yrke: string(),
      prosent: number(),
      fom: string(),
      tom: string(),
})

export const PersonSchema = object({
      navn: string(),
      fnr: string().nullable(),
      epost: string().nullable(),
      tlf: string().nullable(),
      sistInnlogget: string().nullable(),
      samtykke: boolean().nullable(),
      evaluering: EvalueringSchema.nullable(),
      stillinger: array(StillingSchema).nullable()
})

export const AvbruttplanSchema = object({
      av: PersonSchema,
      tidspunkt: string(),
      id: number(),
})

export const GodkjentPlanSchema = object({
      opprettetTidspunkt: string(),
      gyldighetstidspunkt: GyldighetstidspunktSchema.nullable(),
      tvungenGodkjenning: boolean().nullable(),
      deltMedNAVTidspunkt: string().nullable(),
      deltMedNAV: boolean().nullable(),
      deltMedFastlegeTidspunkt: string().nullable(),
      deltMedFastlege: boolean().nullable(),
      dokumentUuid: string().nullable(),
      avbruttPlan: AvbruttplanSchema.nullable()
})

export const GodkjenningSchema = object({
      godkjent: boolean(),
      godkjentAv: PersonSchema,
      beskrivelse: string(),
      godkjenningsTidspunkt: string(),
      gyldighetstidspunkt: GyldighetstidspunktSchema,
      delMedNav: boolean()
})

export const KommentarSchema = object({
      id: number(),
      tekst: string(),
      opprettetTidspunkt: string(),
      sistEndretDato: string(),
      opprettetAv: PersonSchema,
      sistEndretAv: PersonSchema,
})

export const TiltakSchema = object({
      tiltakId: number(),
      tiltaknavn: string(),
      knyttetTilArbeidsoppgaveId: number().nullable(),
      fom: string().nullable(),
      tom: string().nullable(),
      beskrivelse: string().nullable(),
      beskrivelseIkkeAktuelt: string().nullable(),
      opprettetDato: string(),
      sistEndretDato: string(),
      kommentarer: array(KommentarSchema).nullable(),
      status: string().nullable(),
      gjennomfoering: string().nullable(),
      opprettetAv: PersonSchema,
      sistEndretAv: PersonSchema,
})

export const GjennomforingSchema = object({
      kanGjennomfoeres: string(),
      paaAnnetSted: boolean().nullable(),
      medMerTid: boolean().nullable(),
      medHjelp: boolean().nullable(),
      kanBeskrivelse: string().nullable(),
      kanIkkeBeskrivelse: string().nullable()
})

export const ArbeidsoppgaveSchema = object({
      arbeidsoppgaveId: number(),
      arbeidsoppgavenavn: string(),
      erVurdertAvSykmeldt: boolean().nullable(),
      gjennomfoering: GjennomforingSchema.nullable(),
      opprettetDato: string(),
      sistEndretDato: string(),
      sistEndretAv: PersonSchema,
      opprettetAv: PersonSchema,
})

export const ArbeidsgiverSchema = object({
      naermesteLeder: narmesteLederSchema,
      forrigeNaermesteLeder: narmesteLederSchema.nullable()
})

export const OppfolgingsplanSchema = object({
      id: number(),
      sistEndretDato: string(),
      opprettetDato: string(),
      status: string(),
      virksomhet: VirksomhetSchema,
      godkjentPlan: GodkjentPlanSchema.nullable(),
      godkjenninger: array(GodkjenningSchema),
      arbeidsoppgaveListe: array(ArbeidsoppgaveSchema),
      tiltakListe: array(TiltakSchema),
      avbruttPlanListe: array(AvbruttplanSchema),
      arbeidsgiver: ArbeidsgiverSchema,
      arbeidstaker: PersonSchema,
      sistEndretAv: PersonSchema,
})


