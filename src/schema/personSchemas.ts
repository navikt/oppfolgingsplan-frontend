import { object, string, z } from "zod";

export const personSchema = object({
  navn: string(),
  fnr: string(),
});

export type PersonDTO = z.infer<typeof personSchema>;
