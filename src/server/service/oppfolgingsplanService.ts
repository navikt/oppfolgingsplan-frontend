import { get } from "@/common/api/axios/axios";
import serverEnv from "@/server/utils/serverEnv"
import {narmesteLedereSchema, Sykmelding} from "@/server/service/schema/oppfolgingsplanSchema";
import {array} from "zod";

export async function getNarmesteLedere(accessToken: string, fnr: string) {
    return narmesteLedereSchema.safeParse(
        await get(`${serverEnv.SYFOOPPFOLGINGSPLANSERVICE_HOST}/syfooppfolgingsplanservice/api/v3/narmesteledere/${fnr}`, {
            accessToken,
        })
    );
}

export async function getSykmeldingerSM(accessToken: string) {
    return array(Sykmelding).safeParse(
        await get(`${serverEnv.SYFOOPPFOLGINGSPLANSERVICE_HOST}/syfooppfolgingsplanservice/api/v2/arbeidstaker/sykmeldinger`, {
            accessToken,
        })
    );
}