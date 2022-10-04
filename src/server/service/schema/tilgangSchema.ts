import { z, object, boolean, string } from "zod";

export const TilgangSchema = object({
  harTilgang: boolean(),
  ikkeTilgangGrunn: string().nullable(),
});

export type TilgangDTO = z.infer<typeof TilgangSchema>;
