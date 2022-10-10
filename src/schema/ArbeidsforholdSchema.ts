import { number, object, string, z } from "zod";

export const arbeidsforholdSchema = object({
  yrke: string(),
  prosent: number(),
});

export type Arbeidsforhold = z.infer<typeof arbeidsforholdSchema>;
