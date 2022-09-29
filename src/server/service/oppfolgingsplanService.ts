import {get, post} from "@/common/api/axios/axios";
import serverEnv from "@/server/utils/serverEnv"
import {OppfolgingsplanSchema} from "@/server/service/schema/oppfolgingsplanSchema";
import {array} from "zod";
import {narmesteLedereSchema} from "@/server/service/schema/narmestelederSchema";
import {Sykmelding} from "@/server/service/schema/sykmeldingSchema";
import {RSOpprettOppfoelgingsdialog} from "@/types/oppfolgingsplanservice/RSOpprettOppfoelgingsdialog";

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

export async function getOppfolgingsplanerSM(accessToken: string) {
    return array(OppfolgingsplanSchema).safeParse(
        await get(`${serverEnv.SYFOOPPFOLGINGSPLANSERVICE_HOST}/syfooppfolgingsplanservice/api/v2/arbeidstaker/oppfolgingsplaner`, {
            accessToken,
        })
    );
}

export async function postOpprettOppfolgingsplan(accessToken: string, opprettOppfolgingsplanData: RSOpprettOppfoelgingsdialog): Promise<void> {
    return await post(`${serverEnv.SYFOOPPFOLGINGSPLANSERVICE_HOST}/syfooppfolgingsplanservice/api/v2/arbeidstaker/oppfolgingsplaner`, {
        opprettOppfolgingsplanData
    }, {accessToken})
}