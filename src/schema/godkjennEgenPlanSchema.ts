import { boolean, object, z } from "zod";
import { gyldighetstidspunktSchema } from "./oppfolgingsplanSchema";

export const godkjennEgenPlanSchema = object({
  gyldighetstidspunkt: gyldighetstidspunktSchema,
  delmednav: boolean().optional(),
});

export type GodkjennEgenPlanData = z.infer<typeof godkjennEgenPlanSchema>;
