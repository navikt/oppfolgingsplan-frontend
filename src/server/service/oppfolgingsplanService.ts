import { array } from "zod";
import { get, post } from "api/axios/axios";
import serverEnv from "server/utils/serverEnv";
import { GodkjennsistPlanData } from "../../schema/godkjennsistPlanSchema";
import { tilgangSchema } from "../../schema/tilgangSchema";
import { sykmeldingSchema } from "../../schema/sykmeldingSchema";
import {
  narmesteLederSchema,
  narmesteLederV3Schema,
} from "../../schema/narmestelederSchema";
import {
  oppfolgingsplanSchema,
  virksomhetSchema,
} from "../../schema/oppfolgingsplanSchema";
import { OpprettOppfoelgingsdialog } from "../../schema/opprettOppfoelgingsdialogSchema";
import { kontaktinfoSchema } from "../../schema/kontaktinfoSchema";
import { GodkjennPlanData } from "../../schema/godkjennPlanSchema";
import { handleSchemaParsingError } from "../utils/errors";
import { Sykmeldt, sykmeldtSchema } from "../../schema/sykmeldtSchema";
import { personV3Schema } from "../../schema/personSchemas";
import { Arbeidsoppgave, Kommentar, Tiltak } from "../../types/oppfolgingsplan";
import { GodkjennEgenPlanData } from "../../schema/godkjennEgenPlanSchema";

export async function getNarmesteLeder(
  accessToken: string,
  fnr: string,
  virksomhetsnummer: string
) {
  const response = narmesteLederSchema.safeParse(
    await get(
      `${serverEnv.SYFOOPPFOLGINGSPLANSERVICE_HOST}/syfooppfolgingsplanservice/api/v3/narmesteleder/${fnr}?virksomhetsnummer=${virksomhetsnummer}`,
      {
        accessToken,
      }
    )
  );

  if (response.success) {
    return response.data;
  }

  handleSchemaParsingError("Arbeidsgiver", "NarmesteLeder", response.error);
}

export async function getNarmesteLedere(accessToken: string, fnr: string) {
  const response = array(narmesteLederV3Schema).safeParse(
    await get(
      `${serverEnv.SYFOOPPFOLGINGSPLANSERVICE_HOST}/syfooppfolgingsplanservice/api/v3/narmesteledere/${fnr}`,
      {
        accessToken,
      }
    )
  );

  if (response.success) {
    return response.data;
  }

  handleSchemaParsingError("Sykmeldt", "NarmesteLedere", response.error);
}

export async function getSykmeldingerSM(accessToken: string) {
  const response = array(sykmeldingSchema).safeParse(
    await get(
      `${serverEnv.SYFOOPPFOLGINGSPLANSERVICE_HOST}/syfooppfolgingsplanservice/api/v2/arbeidstaker/sykmeldinger`,
      {
        accessToken,
      }
    )
  );

  if (response.success) {
    return response.data;
  } else {
    handleSchemaParsingError("Sykmeldt", "Sykmelding", response.error);
  }
}

export async function getVirksomhet(
  accessToken: string,
  virksomhetsnummer: string
) {
  const response = virksomhetSchema.safeParse(
    await get(
      `${serverEnv.SYFOOPPFOLGINGSPLANSERVICE_HOST}/syfooppfolgingsplanservice/api/v3/virksomhet/${virksomhetsnummer}`,
      {
        accessToken,
      }
    )
  );

  if (response.success) {
    return response.data;
  }

  handleSchemaParsingError("Sykmeldt", "Virksomhet", response.error);
}

export async function getOppfolgingsplanerSM(accessToken: string) {
  const response = array(oppfolgingsplanSchema).safeParse(
    await get(
      `${serverEnv.SYFOOPPFOLGINGSPLANSERVICE_HOST}/syfooppfolgingsplanservice/api/v2/arbeidstaker/oppfolgingsplaner`,
      {
        accessToken,
      }
    )
  );

  if (response.success) {
    return response.data;
  }

  handleSchemaParsingError("Sykmeldt", "Oppfolgingsplan", response.error);
}

export async function getOppfolgingsplanerAG(accessToken: string) {
  const response = array(oppfolgingsplanSchema).safeParse(
    await get(
      `${serverEnv.SYFOOPPFOLGINGSPLANSERVICE_HOST}/syfooppfolgingsplanservice/api/v2/arbeidsgiver/oppfolgingsplaner`,
      {
        accessToken,
      }
    )
  );

  if (response.success) {
    return response.data;
  }

  handleSchemaParsingError("Arbeidsgiver", "Oppfolgingsplan", response.error);
}

export async function getDineSykmeldteMedSykmeldinger(
  accessToken: string
): Promise<Sykmeldt[]> {
  const response = array(sykmeldtSchema).safeParse(
    await get(
      `${serverEnv.SYKMELDINGER_ARBEIDSGIVER_HOST}/api/v2/dinesykmeldte`,
      { accessToken }
    )
  );

  if (response.success) {
    return response.data;
  }

  handleSchemaParsingError("Arbeidsgiver", "sykmeldt", response.error);
}

export async function getSykmeldt(
  narmestelederid: string,
  accessToken: string
): Promise<Sykmeldt> {
  const response = sykmeldtSchema.safeParse(
    await get(
      `${serverEnv.SYKMELDINGER_ARBEIDSGIVER_HOST}/api/v2/dinesykmeldte/${narmestelederid}`,
      { accessToken }
    )
  );
  if (response.success) {
    return response.data;
  } else {
    handleSchemaParsingError("Arbeidsgiver", "sykmeldt", response.error);
  }
}

export async function getTilgang(accessToken: string, fnr: string) {
  const response = tilgangSchema.safeParse(
    await get(
      `${serverEnv.SYFOOPPFOLGINGSPLANSERVICE_HOST}/syfooppfolgingsplanservice/api/v2/tilgang?fnr=${fnr}`,
      { accessToken }
    )
  );

  if (response.success) {
    return response.data;
  } else {
    handleSchemaParsingError("Sykmeldt", "Tilgang", response.error);
  }
}

export async function getPersonSM(accessToken: string, fnr: string) {
  const response = personV3Schema.safeParse(
    await get(
      `${serverEnv.SYFOOPPFOLGINGSPLANSERVICE_HOST}/syfooppfolgingsplanservice/api/v3/person/${fnr}`,
      { accessToken }
    )
  );

  if (response.success) {
    return response.data;
  }

  handleSchemaParsingError("Sykmeldt", "Person", response.error);
}

export async function getKontaktinfo(accessToken: string, fnr: string) {
  const response = kontaktinfoSchema.safeParse(
    await get(
      `${serverEnv.SYFOOPPFOLGINGSPLANSERVICE_HOST}/syfooppfolgingsplanservice/api/v3/kontaktinfo/${fnr}`,
      { accessToken }
    )
  );

  if (response.success) {
    return response.data;
  }

  handleSchemaParsingError("Sykmeldt", "Kontaktinfo", response.error);
}

export async function createOppfolgingsplanSM(
  accessToken: string,
  opprettOppfolgingsplanData: OpprettOppfoelgingsdialog
) {
  return await post<number>(
    `${serverEnv.SYFOOPPFOLGINGSPLANSERVICE_HOST}/syfooppfolgingsplanservice/api/v2/arbeidstaker/oppfolgingsplaner`,
    opprettOppfolgingsplanData,
    { accessToken }
  );
}

export async function createOppfolgingsplanAG(
  accessToken: string,
  opprettOppfolgingsplanData: OpprettOppfoelgingsdialog
) {
  return await post<number>(
    `${serverEnv.SYFOOPPFOLGINGSPLANSERVICE_HOST}/syfooppfolgingsplanservice/api/v2/arbeidsgiver/oppfolgingsplaner`,
    opprettOppfolgingsplanData,
    { accessToken }
  );
}

export async function kopierOppfolgingsplan(
  accessToken: string,
  oppfolgingsplanIdToCopy: string
) {
  return await post<number>(
    `${serverEnv.SYFOOPPFOLGINGSPLANSERVICE_HOST}/syfooppfolgingsplanservice/api/v2/oppfolgingsplan/actions/${oppfolgingsplanIdToCopy}/kopier`,
    {},
    { accessToken }
  );
}

export async function avbrytOppfolgingsplan(
  accessToken: string,
  oppfolgingsplanId: string
) {
  return await post(
    `${serverEnv.SYFOOPPFOLGINGSPLANSERVICE_HOST}/syfooppfolgingsplanservice/api/v2/oppfolgingsplan/actions/${oppfolgingsplanId}/avbryt`,
    {},
    { accessToken }
  );
}

export async function avvisOppfolgingsplan(
  accessToken: string,
  oppfolgingsplanId: string
) {
  return await post(
    `${serverEnv.SYFOOPPFOLGINGSPLANSERVICE_HOST}/syfooppfolgingsplanservice/api/v2/oppfolgingsplan/actions/${oppfolgingsplanId}/avvis`,
    {},
    { accessToken }
  );
}

export async function nullstillGodkjenning(
  accessToken: string,
  oppfolgingsplanId: string
) {
  return await post(
    `${serverEnv.SYFOOPPFOLGINGSPLANSERVICE_HOST}/syfooppfolgingsplanservice/api/v2/oppfolgingsplan/actions/${oppfolgingsplanId}/nullstillGodkjenning`,
    {},
    { accessToken }
  );
}

export async function delMedNav(
  accessToken: string,
  oppfolgingsplanId: string
) {
  return await post(
    `${serverEnv.SYFOOPPFOLGINGSPLANSERVICE_HOST}/syfooppfolgingsplanservice/api/v2/oppfolgingsplan/actions/${oppfolgingsplanId}/delmednav`,
    {},
    { accessToken }
  );
}

export async function delMedFastlege(
  accessToken: string,
  oppfolgingsplanId: string
) {
  return await post(
    `${serverEnv.SYFOOPPFOLGINGSPLANSERVICE_HOST}/syfooppfolgingsplanservice/api/v2/oppfolgingsplan/actions/${oppfolgingsplanId}/delmedfastlege`,
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

export async function godkjennOppfolgingsplanAG(
  accessToken: string,
  oppfolgingsplanId: string,
  data: GodkjennPlanData
) {
  return await post(
    `${
      serverEnv.SYFOOPPFOLGINGSPLANSERVICE_HOST
    }/syfooppfolgingsplanservice/api/v2/oppfolgingsplan/actions/${oppfolgingsplanId}/godkjenn?status=${
      data.tvungenGodkjenning ? "tvungenGodkjenning" : "makrell"
    }&aktoer=arbeidstaker&delmednav=${data.delmednav}`,
    data.gyldighetstidspunkt,
    { accessToken }
  );
}

export async function godkjennEgenOppfolgingsplanAG(
  accessToken: string,
  oppfolgingsplanId: string,
  data: GodkjennEgenPlanData
) {
  return await post(
    `${serverEnv.SYFOOPPFOLGINGSPLANSERVICE_HOST}/syfooppfolgingsplanservice/api/v2/oppfolgingsplan/actions/${oppfolgingsplanId}/egenarbedsgiver/godkjenn?delmednav=${data.delmednav}`,
    data.gyldighetstidspunkt,
    { accessToken }
  );
}

export async function godkjennsistOppfolgingsplanSM(
  accessToken: string,
  oppfolgingsplanId: string,
  data: GodkjennsistPlanData
) {
  return await post(
    `${serverEnv.SYFOOPPFOLGINGSPLANSERVICE_HOST}/syfooppfolgingsplanservice/api/v2/oppfolgingsplan/actions/${oppfolgingsplanId}/godkjennsist?aktoer=arbeidstaker&delmednav=${data.delmednav}`,
    {},
    { accessToken }
  );
}

export async function godkjennsistOppfolgingsplanAG(
  accessToken: string,
  oppfolgingsplanId: string,
  data: GodkjennsistPlanData
) {
  return await post(
    `${serverEnv.SYFOOPPFOLGINGSPLANSERVICE_HOST}/syfooppfolgingsplanservice/api/v2/oppfolgingsplan/actions/${oppfolgingsplanId}/godkjennsist?aktoer=arbeidsgiver&delmednav=${data.delmednav}`,
    {},
    { accessToken }
  );
}

export async function deleteTiltakComment(
  accessToken: string,
  kommentarId: string
) {
  return await post(
    `${serverEnv.SYFOOPPFOLGINGSPLANSERVICE_HOST}/syfooppfolgingsplanservice/api/v2/kommentar/actions/${kommentarId}/slett`,
    {},
    { accessToken }
  );
}

export async function saveTiltakComment(
  accessToken: string,
  tiltakId: string,
  kommentar: Partial<Kommentar>
) {
  return await post(
    `${serverEnv.SYFOOPPFOLGINGSPLANSERVICE_HOST}/syfooppfolgingsplanservice/api/v2/tiltak/actions/${tiltakId}/lagreKommentar`,
    kommentar,
    { accessToken }
  );
}

export async function deleteTiltak(accessToken: string, tiltakId: string) {
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

export async function deleteOppgave(
  accessToken: string,
  arbeidsoppgaveId: string
) {
  return await post(
    `${serverEnv.SYFOOPPFOLGINGSPLANSERVICE_HOST}/syfooppfolgingsplanservice/api/v2/arbeidsoppgave/actions/${arbeidsoppgaveId}/slett`,
    {},
    { accessToken }
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
