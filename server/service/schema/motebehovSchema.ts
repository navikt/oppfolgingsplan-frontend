import { union, object, literal, boolean, string, z } from "zod";

const skjemaType = union([literal("MELD_BEHOV"), literal("SVAR_BEHOV")]);

const motebehovSvar = object({
  harMotebehov: boolean(),
  forklaring: string().nullable(),
});

const motebehov = object({
  id: string(),
  opprettetDato: string(),
  aktorId: string(),
  opprettetAv: string().nullable(),
  arbeidstakerFnr: string(),
  virksomhetsnummer: string(),
  motebehovSvar: motebehovSvar,
  tildeltEnhet: string().nullable(),
  behandletTidspunkt: string().nullable(),
  behandletVeilederIdent: string().nullable(),
  skjemaType: skjemaType.nullable(),
});

export const motebehovSchema = object({
  visMotebehov: boolean(),
  skjemaType: skjemaType.nullable(),
  motebehov: motebehov.nullable(),
});

export type MotebehovDTO = z.infer<typeof motebehovSchema>;
export type MotebehovDataDTO = z.infer<typeof motebehov>;
export type MotebehovSkjemaTypeDTO = z.infer<typeof skjemaType>;
