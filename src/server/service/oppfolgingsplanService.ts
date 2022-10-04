import { array } from "zod";
import { get, post } from "@/common/api/axios/axios";
import serverEnv from "@/server/utils/serverEnv";
import { TilgangSchema } from "@/server/service/schema/tilgangSchema";
import { SykmeldingSchema } from "@/server/service/schema/sykmeldingSchema";
import { narmesteLedereSchema } from "@/server/service/schema/narmestelederSchema";
import {
  KommentarDTO,
  OppfolgingsplanSchema,
  TiltakDTO,
} from "@/server/service/schema/oppfolgingsplanSchema";
import { OpprettOppfoelgingsdialogDTO } from "@/server/service/schema/opprettOppfoelgingsdialogSchema";

export async function getNarmesteLedere(accessToken: string, fnr: string) {
  return narmesteLedereSchema.safeParse(
    await get(
      `${serverEnv.SYFOOPPFOLGINGSPLANSERVICE_HOST}/syfooppfolgingsplanservice/api/v3/narmesteledere/${fnr}`,
      {
        accessToken,
      }
    )
  );
}

export async function getSykmeldingerSM(accessToken: string) {
  return array(SykmeldingSchema).safeParse(
    await get(
      `${serverEnv.SYFOOPPFOLGINGSPLANSERVICE_HOST}/syfooppfolgingsplanservice/api/v2/arbeidstaker/sykmeldinger`,
      {
        accessToken,
      }
    )
  );
}

export async function getOppfolgingsplanerSM(accessToken: string) {
  return array(OppfolgingsplanSchema).safeParse(
    await get(
      `${serverEnv.SYFOOPPFOLGINGSPLANSERVICE_HOST}/syfooppfolgingsplanservice/api/v2/arbeidstaker/oppfolgingsplaner`,
      {
        accessToken,
      }
    )
  );
}

export async function getTilgangSM(accessToken: string, fnr: string) {
  return TilgangSchema.safeParse(
    await get(
      `${serverEnv.SYFOOPPFOLGINGSPLANSERVICE_HOST}/syfooppfolgingsplanservice/api/v2/tilgang?fnr=${fnr}`,
      { accessToken }
    )
  );
}

export async function createOppfolgingsplanSM(
  accessToken: string,
  opprettOppfolgingsplanData: OpprettOppfoelgingsdialogDTO
) {
  return await post(
    `${serverEnv.SYFOOPPFOLGINGSPLANSERVICE_HOST}/syfooppfolgingsplanservice/api/v2/arbeidstaker/oppfolgingsplaner`,
    {
      opprettOppfolgingsplanData,
    },
    { accessToken }
  );
}

export async function deleteTiltakCommentSM(
  accessToken: string,
  tiltakId: string
) {
  return await post(
    `${serverEnv.SYFOOPPFOLGINGSPLANSERVICE_HOST}/syfooppfolgingsplanservice/api/v2/kommentar/actions/${tiltakId}/slett`,
    {},
    { accessToken }
  );
}

export async function saveTiltakCommentSM(
  accessToken: string,
  tiltakId: string,
  kommentar: KommentarDTO
) {
  return await post(
    `${serverEnv.SYFOOPPFOLGINGSPLANSERVICE_HOST}/syfooppfolgingsplanservice/api/v2/tiltak/actions/${tiltakId}/lagreKommentar`,
    {
      kommentar,
    },
    { accessToken }
  );
}

export async function deleteTiltakSM(accessToken: string, tiltakId: string) {
  return await post(
    `${serverEnv.SYFOOPPFOLGINGSPLANSERVICE_HOST}/syfooppfolgingsplanservice/api/v2/tiltak/actions/${tiltakId}`,
    {},
    { accessToken }
  );
}

export async function saveTiltak(
  accessToken: string,
  oppfolgingsplanId: string,
  tiltak: TiltakDTO
) {
  return await post(
    `${serverEnv.SYFOOPPFOLGINGSPLANSERVICE_HOST}/syfooppfolgingsplanservice/api/v2/oppfolgingsplan/actions/${oppfolgingsplanId}/lagreTiltak`,
    tiltak,
    {
      accessToken: accessToken,
    }
  );
}
