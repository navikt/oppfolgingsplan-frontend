import { boolean, object, z } from "zod";
import { gyldighetstidspunktSchema } from "./oppfolgingsplanSchema";

export const godkjennEgenPlanAGSchema = object({
  gyldighetstidspunkt: gyldighetstidspunktSchema,
  delmednav: boolean().optional(),
});

export type GodkjennEgenPlanDataAG = z.infer<typeof godkjennEgenPlanAGSchema>;
