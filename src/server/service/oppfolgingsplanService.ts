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
  personSchema,
  Tiltak,
  virksomhetSchema,
} from "../../schema/oppfolgingsplanSchema";
import { OpprettOppfoelgingsdialog } from "../../schema/opprettOppfoelgingsdialogSchema";
import { kontaktinfoSchema } from "../../schema/kontaktinfoSchema";
import { arbeidsforholdSchema } from "../../schema/ArbeidsforholdSchema";
import { GodkjennPlanData } from "../../schema/godkjennPlanSchema";

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

export async function getArbeidsforholdSM(
  accessToken: string,
  fnr: string,
  virksomhetsnummer: string,
  fom: string
) {
  return array(arbeidsforholdSchema).safeParse(
    await get(
      `${serverEnv.SYFOOPPFOLGINGSPLANSERVICE_HOST}/syfooppfolgingsplanservice/api/v3/arbeidsforhold?fnr=${fnr}&virksomhetsnummer=${virksomhetsnummer}&fom=${fom}`,
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

export async function getPersonSM(accessToken: string, fnr: string) {
  return personSchema.safeParse(
    await get(
      `${serverEnv.SYFOOPPFOLGINGSPLANSERVICE_HOST}/syfooppfolgingsplanservice/api/v3/person/${fnr}`,
      { accessToken }
    )
  );
}

export async function getKontaktinfoSM(accessToken: string, fnr: string) {
  return kontaktinfoSchema.safeParse(
    await get(
      `${serverEnv.SYFOOPPFOLGINGSPLANSERVICE_HOST}/syfooppfolgingsplanservice/api/v3/kontaktinfo/${fnr}`,
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

export async function kopierOppfolgingsplanSM(
  accessToken: string,
  oppfolgingsplanIdToCopy: string
) {
  return await post(
    `${serverEnv.SYFOOPPFOLGINGSPLANSERVICE_HOST}/syfooppfolgingsplanservice/api/v2/oppfolgingsplan/actions/${oppfolgingsplanIdToCopy}/kopier`,
    {},
    { accessToken }
  );
}

export async function godkjennOppfolgingsplanSM(
  accessToken: string,
  oppfolgingsplanId: string,
  data: GodkjennPlanData
) {
  return await post(
    `${serverEnv.SYFOOPPFOLGINGSPLANSERVICE_HOST}/syfooppfolgingsplanservice/api/v2/oppfolgingsplan/actions/${oppfolgingsplanId}/godkjenn?status=makrell&aktoer=arbeidstaker&delmednav=${data.delmednav}`,
    data.gyldighetstidspunkt,
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

export async function getPdf(accessToken: string, oppfolgingsplanId: string) {
  return await get(
    `${serverEnv.SYFOOPPFOLGINGSPLANSERVICE_HOST}/syfooppfolgingsplanservice/api/v2/dokument/${oppfolgingsplanId}/ekstern`,
    {
      accessToken: accessToken,
      responseType: "arraybuffer",
    }
  );
}
