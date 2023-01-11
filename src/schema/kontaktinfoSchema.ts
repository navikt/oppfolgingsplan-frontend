import { boolean, z, object, string } from "zod";

export const kontaktinfoSchema = object({
  fnr: string(),
  epost: string().nullish(),
  tlf: string().nullish(),
  skalHaVarsel: boolean(),
  feilAarsak: string().nullish(),
});

export type KontaktinfoDTO = z.infer<typeof kontaktinfoSchema>;
