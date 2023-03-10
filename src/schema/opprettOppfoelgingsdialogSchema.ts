import { object, string, z } from "zod";

export const opprettOppfoelgingsdialogSchema = object({
  sykmeldtFnr: string(),
  virksomhetsnummer: string(),
});

export type OpprettOppfoelgingsdialog = z.infer<
  typeof opprettOppfoelgingsdialogSchema
>;
