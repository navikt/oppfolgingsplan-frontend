import { number, object, string, z } from "zod";

export const arbeidsforholdSchema = object({
  yrke: string(),
  prosent: number(),
});

export type ArbeidsforholdDTO = z.infer<typeof arbeidsforholdSchema>;
