import { boolean, z, object, string } from "zod";

export const kontaktinfoSchema = object({
  fnr: string(),
  epost: string().nullish(),
  tlf: string().nullish(),
  skalHaVarsel: boolean().nullish(),
  feilAarsak: string().nullish(),
});

export type Kontaktinfo = z.infer<typeof kontaktinfoSchema>;
