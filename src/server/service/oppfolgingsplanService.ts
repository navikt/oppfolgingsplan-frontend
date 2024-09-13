import { array } from "zod";
import { get, post } from "../../api/axios/axios";
import serverEnv from "../../server/utils/serverEnv";
import { GodkjennsistPlanData } from "../../schema/godkjennsistPlanSchema";
import { tilgangSchema } from "../../schema/tilgangSchema";
import { sykmeldingSchema } from "../../schema/sykmeldingSchema";
import {
  ArbeidsOppgaveDTO,
  KommentarDTO,
  oppfolgingsplanSchema,
  StillingDTO,
  TiltakDTO,
  virksomhetSchema,
} from "../../schema/oppfolgingsplanSchema";
import { OpprettOppfoelgingsdialog } from "../../schema/opprettOppfoelgingsdialogSchema";
import { kontaktinfoSchema } from "../../schema/kontaktinfoSchema";
import { GodkjennPlanData } from "../../schema/godkjennPlanSchema";
import { handleSchemaParsingError } from "../utils/errors";
import { Sykmeldt, sykmeldtSchema } from "../../schema/sykmeldtSchema";
import { personSchema } from "../../schema/personSchemas";
import {
  NarmesteLederDTO,
  narmesteLederSchema,
} from "../../schema/narmestelederSchema";

export async function getNarmesteLeder(
  accessToken: string,
  fnr: string,
  virksomhetsnummer: string,
) {
  const apiUrl = `${serverEnv.OPPFOLGINGSPLAN_BACKEND_HOST}/api/v1/narmesteleder/virksomhet`;
  const data = await get<NarmesteLederDTO>(apiUrl, "getNarmesteLedere", {
    accessToken: accessToken,
    personIdent: fnr,
    orgnummer: virksomhetsnummer,
  });

  if (!data) return null;

  const parsedResponse = narmesteLederSchema.safeParse(data);

  if (parsedResponse.success) {
    return parsedResponse.data;
  }

  handleSchemaParsingError(
    "Arbeidsgiver",
    "NarmesteLeder",
    parsedResponse.error,
  );
}

export async function getNarmesteLedere(accessToken: string) {
  const apiUrl = `${serverEnv.OPPFOLGINGSPLAN_BACKEND_HOST}/api/v1/narmesteleder/alle`;
  const data = await get<NarmesteLederDTO[]>(apiUrl, "getNarmesteLedere", {
    accessToken: accessToken,
  });

  if (!data) return [];

  const response = array(narmesteLederSchema).safeParse(data);

  if (response.success) {
    return response.data;
  }

  handleSchemaParsingError("Sykmeldt", "NarmesteLedere", response.error);
}

export async function fetchArbeidsforhold(accessToken: string) {
  const apiUrl = `${serverEnv.OPPFOLGINGSPLAN_BACKEND_HOST}/api/v1/arbeidsforhold`;
  const data = await get<StillingDTO[]>(apiUrl, "fetchArbeidsforhold", {
    accessToken: accessToken,
  });

  if (!data) return [];

  const response = array(narmesteLederSchema).safeParse(data);

  if (response.success) {
    return response.data;
  }

  handleSchemaParsingError("Sykmeldt", "NarmesteLedere", response.error);
}

export async function getSykmeldingerSM(accessToken: string) {
  const response = array(sykmeldingSchema).safeParse(
    await get(
      `${serverEnv.SYFOOPPFOLGINGSPLANSERVICE_HOST}/syfooppfolgingsplanservice/api/v2/arbeidstaker/sykmeldinger`,
      "getSykmeldingerSM",
      {
        accessToken,
      },
    ),
  );

  if (response.success) {
    return response.data;
  } else {
    handleSchemaParsingError("Sykmeldt", "Sykmelding", response.error);
  }
}

export async function getVirksomhet(
  accessToken: string,
  virksomhetsnummer: string,
) {
  const response = virksomhetSchema.safeParse(
    await get(
      `${serverEnv.OPPFOLGINGSPLAN_BACKEND_HOST}/api/v1/virksomhet/${virksomhetsnummer}`,
      "getVirksomhet",
      {
        accessToken,
      },
    ),
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
      "getOppfolgingsplanerSM",
      {
        accessToken,
      },
    ),
  );

  if (response.success) {
    return response.data;
  }

  handleSchemaParsingError("Sykmeldt", "Oppfolgingsplan", response.error);
}

export async function getOppfolgingsplanerAG(
  sykmeldtFnr: string,
  virksomhetsnummer: string,
  accessToken: string,
) {
  const response = array(oppfolgingsplanSchema).safeParse(
    await get(
      `${serverEnv.SYFOOPPFOLGINGSPLANSERVICE_HOST}/syfooppfolgingsplanservice/api/v2/arbeidsgiver/oppfolgingsplaner?virksomhetsnummer=${virksomhetsnummer}`,
      "getOppfolgingsplanerAG",
      {
        personIdent: sykmeldtFnr,
        accessToken,
      },
    ),
  );

  if (response.success) {
    return response.data;
  }

  handleSchemaParsingError("Arbeidsgiver", "Oppfolgingsplan", response.error);
}

export async function getDineSykmeldteMedSykmeldinger(
  accessToken: string,
): Promise<Sykmeldt[]> {
  const response = array(sykmeldtSchema).safeParse(
    await get(
      `${serverEnv.SYKMELDINGER_ARBEIDSGIVER_HOST}/api/v2/dinesykmeldte`,
      "getDineSykmeldteMedSykmeldinger",
      { accessToken },
    ),
  );

  if (response.success) {
    return response.data;
  }

  handleSchemaParsingError("Arbeidsgiver", "sykmeldt", response.error);
}

export async function getSykmeldt(
  narmestelederid: string,
  accessToken: string,
): Promise<Sykmeldt> {
  const response = sykmeldtSchema.safeParse(
    await get(
      `${serverEnv.SYKMELDINGER_ARBEIDSGIVER_HOST}/api/v2/dinesykmeldte/${narmestelederid}`,
      "getSykmeldt",
      { accessToken },
    ),
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
      `${serverEnv.OPPFOLGINGSPLAN_BACKEND_HOST}/api/v1/brukertilgang`,
      "getTilgang",
      { accessToken, personIdent: fnr },
    ),
  );
  if (response.success) {
    return response.data;
  } else {
    handleSchemaParsingError("Sykmeldt", "Tilgang", response.error);
  }
}

export async function getPerson(accessToken: string, fnr: string) {
  const response = personSchema.safeParse(
    await get(
      `${serverEnv.OPPFOLGINGSPLAN_BACKEND_HOST}/api/v1/person`,
      "getPerson",
      {
        accessToken: accessToken,
        personIdent: fnr,
      },
    ),
  );

  if (response.success) {
    return response.data;
  }

  handleSchemaParsingError("Sykmeldt", "Person", response.error);
}

export async function getKontaktinfo(accessToken: string, fnr: string) {
  const apiUrl = `${serverEnv.OPPFOLGINGSPLAN_BACKEND_HOST}/api/v1/kontaktinfo`;

  const kontaktInfo = await get(apiUrl, "getKontaktinfo", {
    accessToken: accessToken,
    personIdent: fnr,
  });

  const parsedResponse = kontaktinfoSchema.safeParse(kontaktInfo);

  if (parsedResponse.success) {
    return parsedResponse.data;
  }

  handleSchemaParsingError("Sykmeldt", "Kontaktinfo", parsedResponse.error);
}

export async function createOppfolgingsplanSM(
  accessToken: string,
  opprettOppfolgingsplanData: OpprettOppfoelgingsdialog,
) {
  return await post<number>(
    `${serverEnv.SYFOOPPFOLGINGSPLANSERVICE_HOST}/syfooppfolgingsplanservice/api/v2/arbeidstaker/oppfolgingsplaner`,
    "createOppfolgingsplanSM",
    opprettOppfolgingsplanData,
    { accessToken },
  );
}

export async function createOppfolgingsplanAG(
  accessToken: string,
  opprettOppfolgingsplanData: OpprettOppfoelgingsdialog,
) {
  return await post<number>(
    `${serverEnv.SYFOOPPFOLGINGSPLANSERVICE_HOST}/syfooppfolgingsplanservice/api/v2/arbeidsgiver/oppfolgingsplaner`,
    "createOppfolgingsplanAG",
    opprettOppfolgingsplanData,
    { accessToken },
  );
}

export async function kopierOppfolgingsplan(
  accessToken: string,
  oppfolgingsplanIdToCopy: string,
) {
  return await post<number>(
    `${serverEnv.SYFOOPPFOLGINGSPLANSERVICE_HOST}/syfooppfolgingsplanservice/api/v2/oppfolgingsplan/actions/${oppfolgingsplanIdToCopy}/kopier`,
    "kopierOppfolgingsplan",
    {},
    { accessToken },
  );
}

export async function avbrytOppfolgingsplan(
  accessToken: string,
  oppfolgingsplanId: string,
) {
  return await post<number>(
    `${serverEnv.SYFOOPPFOLGINGSPLANSERVICE_HOST}/syfooppfolgingsplanservice/api/v2/oppfolgingsplan/actions/${oppfolgingsplanId}/avbryt`,
    "avbrytOppfolgingsplan",
    {},
    { accessToken },
  );
}

export async function avvisOppfolgingsplan(
  accessToken: string,
  oppfolgingsplanId: string,
) {
  return await post(
    `${serverEnv.SYFOOPPFOLGINGSPLANSERVICE_HOST}/syfooppfolgingsplanservice/api/v2/oppfolgingsplan/actions/${oppfolgingsplanId}/avvis`,
    "avvisOppfolgingsplan",
    {},
    { accessToken },
  );
}

export async function nullstillGodkjenning(
  accessToken: string,
  oppfolgingsplanId: string,
) {
  return await post(
    `${serverEnv.SYFOOPPFOLGINGSPLANSERVICE_HOST}/syfooppfolgingsplanservice/api/v2/oppfolgingsplan/actions/${oppfolgingsplanId}/nullstillGodkjenning`,
    "nullstillGodkjenning",
    {},
    { accessToken },
  );
}

export async function delMedNav(
  accessToken: string,
  oppfolgingsplanId: string,
) {
  return await post(
    `${serverEnv.SYFOOPPFOLGINGSPLANSERVICE_HOST}/syfooppfolgingsplanservice/api/v2/oppfolgingsplan/actions/${oppfolgingsplanId}/delmednav`,
    "delMedNav",
    {},
    { accessToken },
  );
}

export async function delMedFastlege(
  accessToken: string,
  oppfolgingsplanId: string,
) {
  return await post(
    `${serverEnv.SYFOOPPFOLGINGSPLANSERVICE_HOST}/syfooppfolgingsplanservice/api/v2/oppfolgingsplan/actions/${oppfolgingsplanId}/delmedfastlege`,
    "delMedFastlege",
    {},
    { accessToken },
  );
}

export async function godkjennOppfolgingsplanSM(
  accessToken: string,
  oppfolgingsplanId: string,
  data: GodkjennPlanData,
) {
  return await post(
    `${serverEnv.SYFOOPPFOLGINGSPLANSERVICE_HOST}/syfooppfolgingsplanservice/api/v2/oppfolgingsplan/actions/${oppfolgingsplanId}/godkjenn?status=makrell&aktoer=arbeidstaker&delmednav=${data.delmednav}`,
    "godkjennOppfolgingsplanSM",
    data.gyldighetstidspunkt,
    { accessToken },
  );
}

export async function godkjennOppfolgingsplanAG(
  accessToken: string,
  oppfolgingsplanId: string,
  data: GodkjennPlanData,
) {
  return await post(
    `${
      serverEnv.SYFOOPPFOLGINGSPLANSERVICE_HOST
    }/syfooppfolgingsplanservice/api/v2/oppfolgingsplan/actions/${oppfolgingsplanId}/godkjenn?status=${
      data.tvungenGodkjenning ? "tvungenGodkjenning" : "makrell"
    }&aktoer=arbeidsgiver&delmednav=${data.delmednav}`,
    "godkjennOppfolgingsplanAG",
    data.gyldighetstidspunkt,
    { accessToken },
  );
}

export async function godkjennEgenOppfolgingsplan(
  accessToken: string,
  oppfolgingsplanId: string,
  data: GodkjennPlanData,
) {
  return await post(
    `${serverEnv.SYFOOPPFOLGINGSPLANSERVICE_HOST}/syfooppfolgingsplanservice/api/v2/oppfolgingsplan/actions/${oppfolgingsplanId}/egenarbedsgiver/godkjenn?delmednav=${data.delmednav}`,
    "godkjennEgenOppfolgingsplanAG",
    data.gyldighetstidspunkt,
    { accessToken },
  );
}

export async function godkjennsistOppfolgingsplanSM(
  accessToken: string,
  oppfolgingsplanId: string,
  data: GodkjennsistPlanData,
) {
  return await post(
    `${serverEnv.SYFOOPPFOLGINGSPLANSERVICE_HOST}/syfooppfolgingsplanservice/api/v2/oppfolgingsplan/actions/${oppfolgingsplanId}/godkjennsist?aktoer=arbeidstaker&delmednav=${data.delmednav}`,
    "godkjennsistOppfolgingsplanSM",
    {},
    { accessToken },
  );
}

export async function godkjennsistOppfolgingsplanAG(
  accessToken: string,
  oppfolgingsplanId: string,
  data: GodkjennsistPlanData,
) {
  return await post(
    `${serverEnv.SYFOOPPFOLGINGSPLANSERVICE_HOST}/syfooppfolgingsplanservice/api/v2/oppfolgingsplan/actions/${oppfolgingsplanId}/godkjennsist?aktoer=arbeidsgiver&delmednav=${data.delmednav}`,
    "godkjennsistOppfolgingsplanAG",
    {},
    { accessToken },
  );
}

export async function deleteTiltakComment(
  accessToken: string,
  kommentarId: string,
) {
  return await post(
    `${serverEnv.SYFOOPPFOLGINGSPLANSERVICE_HOST}/syfooppfolgingsplanservice/api/v2/kommentar/actions/${kommentarId}/slett`,
    "deleteTiltakComment",
    {},
    { accessToken },
  );
}

export async function saveTiltakComment(
  accessToken: string,
  tiltakId: string,
  kommentar: Partial<KommentarDTO>,
) {
  return await post(
    `${serverEnv.SYFOOPPFOLGINGSPLANSERVICE_HOST}/syfooppfolgingsplanservice/api/v2/tiltak/actions/${tiltakId}/lagreKommentar`,
    "saveTiltakComment",
    kommentar,
    { accessToken },
  );
}

export async function deleteTiltak(accessToken: string, tiltakId: string) {
  return await post(
    `${serverEnv.SYFOOPPFOLGINGSPLANSERVICE_HOST}/syfooppfolgingsplanservice/api/v2/tiltak/actions/${tiltakId}/slett`,
    "deleteTiltak",
    {},
    { accessToken },
  );
}

export async function saveTiltak(
  accessToken: string,
  oppfolgingsplanId: string,
  tiltak: TiltakDTO,
) {
  return await post(
    `${serverEnv.SYFOOPPFOLGINGSPLANSERVICE_HOST}/syfooppfolgingsplanservice/api/v2/oppfolgingsplan/actions/${oppfolgingsplanId}/lagreTiltak`,
    "saveTiltak",
    tiltak,
    {
      accessToken: accessToken,
    },
  );
}

export async function deleteOppgave(
  accessToken: string,
  arbeidsoppgaveId: string,
) {
  return await post(
    `${serverEnv.SYFOOPPFOLGINGSPLANSERVICE_HOST}/syfooppfolgingsplanservice/api/v2/arbeidsoppgave/actions/${arbeidsoppgaveId}/slett`,
    "deleteOppgave",
    {},
    { accessToken },
  );
}

export async function saveOppgave(
  accessToken: string,
  oppfolgingsplanId: string,
  oppgave: ArbeidsOppgaveDTO,
) {
  return await post(
    `${serverEnv.SYFOOPPFOLGINGSPLANSERVICE_HOST}/syfooppfolgingsplanservice/api/v2/oppfolgingsplan/actions/${oppfolgingsplanId}/lagreArbeidsoppgave`,
    "saveOppgave",
    oppgave,
    {
      accessToken: accessToken,
    },
  );
}

export async function getPdf(accessToken: string, oppfolgingsplanId: string) {
  return await get(
    `${serverEnv.SYFOOPPFOLGINGSPLANSERVICE_HOST}/syfooppfolgingsplanservice/api/v2/dokument/${oppfolgingsplanId}/ekstern`,
    "getPdf",
    {
      accessToken: accessToken,
      responseType: "arraybuffer",
    },
  );
}

export async function ferdigstillVarsel(
  accessToken: string,
  oppfolgingsplanId: string,
) {
  return await post(
    `${serverEnv.SYFOOPPFOLGINGSPLANSERVICE_HOST}/syfooppfolgingsplanservice/api/v2/varsel/${oppfolgingsplanId}/ferdigstill`,
    "ferdigstillVarsel",
    {},
    { accessToken: accessToken },
  );
}
