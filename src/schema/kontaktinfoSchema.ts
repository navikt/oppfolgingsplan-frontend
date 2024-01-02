import { boolean, object, string, z } from "zod";

export const kontaktinfoSchema = object({
  fnr: string(),
  epost: string().nullish(),
  tlf: string().nullish(),
  skalHaVarsel: boolean(),
});

export type KontaktinfoDTO = z.infer<typeof kontaktinfoSchema>;
