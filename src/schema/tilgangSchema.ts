import { boolean, object, string, z } from "zod";

export const tilgangSchema = object({
  harTilgang: boolean(),
  ikkeTilgangGrunn: string().nullable(),
});

export type Tilgang = z.infer<typeof tilgangSchema>;
