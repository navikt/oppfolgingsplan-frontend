import {array, boolean, object, string, z} from "zod";

export const narmesteLederSchema = object(
    {
        virksomhetsnummer: string().nullable(),
        erAktiv: boolean().nullable(),
        aktivFom: string().nullable(),
        aktivTom: string().nullable(),
        navn: string().nullable(),
        fnr: string().nullable(),
        epost: string().nullable(),
        tlf: string().nullable(),
        sistInnlogget: string().nullable(),
        samtykke: boolean().nullable()
    }
);

export const narmesteLedereSchema = array(narmesteLederSchema);

export type NarmesteLederDTO = z.infer<typeof narmesteLederSchema>;
export type NarmesteLedereDTO = z.infer<typeof narmesteLedereSchema>;