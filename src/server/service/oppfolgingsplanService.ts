import { array } from "zod";
import { get, post } from "@/common/api/axios/axios";
import serverEnv from "@/server/utils/serverEnv";
import { tilgangSchema } from "../../schema/tilgangSchema";
import { sykmeldingSchema } from "../../schema/sykmeldingSchema";
import { narmesteLederSchema } from "../../schema/narmestelederSchema";
import {
  Arbeidsoppgave,
  Kommentar,
  oppfolgingsplanSchema,
  Tiltak,
  virksomhetSchema,
} from "../../schema/oppfolgingsplanSchema";
import { OpprettOppfoelgingsdialog } from "../../schema/opprettOppfoelgingsdialogSchema";

export async function getNarmesteLedere(accessToken: string, fnr: string) {
  return array(narmesteLederSchema).safeParse(
    await get(
      `${serverEnv.SYFOOPPFOLGINGSPLANSERVICE_HOST}/syfooppfolgingsplanservice/api/v3/narmesteledere/${fnr}`,
      {
        accessToken,
      }
    )
  );
}

export async function getSykmeldingerSM(accessToken: string) {
  return array(sykmeldingSchema).safeParse(
    await get(
      `${serverEnv.SYFOOPPFOLGINGSPLANSERVICE_HOST}/syfooppfolgingsplanservice/api/v2/arbeidstaker/sykmeldinger`,
      {
        accessToken,
      }
    )
  );
}

export async function getVirksomhetSM(
  accessToken: string,
  virksomhetsnummer: string
) {
  return virksomhetSchema.safeParse(
    await get(
      `${serverEnv.SYFOOPPFOLGINGSPLANSERVICE_HOST}/syfooppfolgingsplanservice/api/v3/virksomhet/${virksomhetsnummer}`,
      {
        accessToken,
      }
    )
  );
}

export async function getOppfolgingsplanerSM(accessToken: string) {
  return array(oppfolgingsplanSchema).safeParse(
    await get(
      `${serverEnv.SYFOOPPFOLGINGSPLANSERVICE_HOST}/syfooppfolgingsplanservice/api/v2/arbeidstaker/oppfolgingsplaner`,
      {
        accessToken,
      }
    )
  );
}

export async function getTilgangSM(accessToken: string, fnr: string) {
  return tilgangSchema.safeParse(
    await get(
      `${serverEnv.SYFOOPPFOLGINGSPLANSERVICE_HOST}/syfooppfolgingsplanservice/api/v2/tilgang?fnr=${fnr}`,
      { accessToken }
    )
  );
}

export async function createOppfolgingsplanSM(
  accessToken: string,
  opprettOppfolgingsplanData: OpprettOppfoelgingsdialog
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
  kommentarId: string
) {
  return await post(
    `${serverEnv.SYFOOPPFOLGINGSPLANSERVICE_HOST}/syfooppfolgingsplanservice/api/v2/kommentar/actions/${kommentarId}/slett`,
    {},
    { accessToken }
  );
}

export async function saveTiltakCommentSM(
  accessToken: string,
  tiltakId: string,
  kommentar: Kommentar
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
    `${serverEnv.SYFOOPPFOLGINGSPLANSERVICE_HOST}/syfooppfolgingsplanservice/api/v2/tiltak/actions/${tiltakId}/slett`,
    {},
    { accessToken }
  );
}

export async function saveTiltak(
  accessToken: string,
  oppfolgingsplanId: string,
  tiltak: Tiltak
) {
  return await post(
    `${serverEnv.SYFOOPPFOLGINGSPLANSERVICE_HOST}/syfooppfolgingsplanservice/api/v2/oppfolgingsplan/actions/${oppfolgingsplanId}/lagreTiltak`,
    tiltak,
    {
      accessToken: accessToken,
    }
  );
}

export async function saveOppgave(
  accessToken: string,
  oppfolgingsplanId: string,
  oppgave: Arbeidsoppgave
) {
  return await post(
    `${serverEnv.SYFOOPPFOLGINGSPLANSERVICE_HOST}/syfooppfolgingsplanservice/api/v2/oppfolgingsplan/actions/${oppfolgingsplanId}/lagreArbeidsoppgave`,
    oppgave,
    {
      accessToken: accessToken,
    }
  );
}
