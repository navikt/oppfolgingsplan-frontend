import { object, string, z } from "zod";

export const personV3Schema = object({
  navn: string(),
  fnr: string(),
});

export type PersonV3DTO = z.infer<typeof personV3Schema>;
