import { z, object, string } from "zod";

export const OpprettOppfoelgingsdialogSchema = object({
  sykmeldtFnr: string(),
  virksomhetsnummer: string(),
});

export type OpprettOppfoelgingsdialogDTO = z.infer<
  typeof OpprettOppfoelgingsdialogSchema
>;
