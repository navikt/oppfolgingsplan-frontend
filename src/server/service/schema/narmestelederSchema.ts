import {array, boolean, object, string, z} from "zod";

export const narmesteLederSchema = object(
    {
        virksomhetsnummer: string(),
        erAktiv: boolean(),
        aktivFom: string(),
        aktivTom: string().nullable(),
        navn: string(),
        fnr: string(),
        epost: string().nullable(),
        tlf: string().nullable(),
        sistInnlogget: string().nullable(),
        samtykke: boolean().nullable()
    }
);

export const narmesteLedereSchema = array(narmesteLederSchema);

export type NarmesteLederDTO = z.infer<typeof narmesteLederSchema>;
export type NarmesteLedereDTO = z.infer<typeof narmesteLedereSchema>;