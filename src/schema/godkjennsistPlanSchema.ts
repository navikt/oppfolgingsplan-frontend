import { boolean, object, z } from "zod";

export const godkjennsistPlanSchema = object({
  delmednav: boolean().optional(),
});

export type GodkjennsistPlanData = z.infer<typeof godkjennsistPlanSchema>;
