import { array, boolean, number, object, string, z } from "zod";

export const pasientSchema = object({
  fnr: string(),
  navn: string().nullish(),
});

export const periodeSchema = object({
  fom: string(),
  tom: string(),
  grad: number().nullish(),
  behandlingsdager: number().nullish(),
  reisetilskudd: boolean(),
  avventende: string().nullish(),
});

export const mulighetForArbeidSchema = object({
  aktivitetIkkeMulig434: array(string()),
  aarsakAktivitetIkkeMulig434: string(),
  perioder: array(periodeSchema),
});

export const friskmeldingSchema = object({
  arbeidsfoerEtterPerioden: boolean().nullish(),
  hensynPaaArbeidsplassen: string().nullish(),
});

export const bekreftelseSchema = object({
  sykmelder: string(),
  utstedelsesdato: string(),
  sykmelderTlf: string().nullish(),
});

export const arbeidsevneSchema = object({
  tilretteleggingArbeidsplass: string().nullish(),
});

export const dineSykmeldteSykmeldingSchema = object({
  sykmeldingId: string(),
  pasient: pasientSchema,
  mulighetForArbeid: mulighetForArbeidSchema,
  skalViseSkravertFelt: boolean(),
  friskmelding: friskmeldingSchema,
  arbeidsgiver: string().nullish(),
  bekreftelse: bekreftelseSchema,
  arbeidsevne: arbeidsevneSchema,
  innspillTilArbeidsgiver: string().nullish(),
});

export type DineSykmeldteSykmelding = z.infer<
  typeof dineSykmeldteSykmeldingSchema
>;

export const sykmeldtSchema = object({
  narmestelederId: string(),
  orgnummer: string(),
  fnr: string(),
  navn: string().nullish(),
  sykmeldinger: array(dineSykmeldteSykmeldingSchema).nullish(),
  aktivSykmelding: boolean().nullish(),
});

export type Sykmeldt = z.infer<typeof sykmeldtSchema>;
