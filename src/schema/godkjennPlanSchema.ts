import { boolean, object, z } from "zod";
import { gyldighetstidspunktSchema } from "./oppfolgingsplanSchema";

export const godkjennPlanSchema = object({
  gyldighetstidspunkt: gyldighetstidspunktSchema,
  delmednav: boolean().optional(),
});

export type GodkjennPlanData = z.infer<typeof godkjennPlanSchema>;
