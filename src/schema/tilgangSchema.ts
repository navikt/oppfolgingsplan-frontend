import { z, object, boolean, string } from "zod";

export const tilgangSchema = object({
  harTilgang: boolean(),
  ikkeTilgangGrunn: string().nullable(),
});

export type Tilgang = z.infer<typeof tilgangSchema>;
