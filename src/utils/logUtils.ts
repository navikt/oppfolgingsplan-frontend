import { logger } from "@navikt/next-logger";

// eslint-disable-next-line
declare const window: any;

const UUID =
  /\b[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}\b/g;
const ORGNR = /\b[0-9a-f]{9}\b/g;
const FNR = /\b[0-9]{11}\b/g;

export function cleanPathForMetric(
  value: string | undefined,
): string | undefined {
  return value
    ?.replace(UUID, "[uuid]")
    .replace(ORGNR, "[orgnr]")
    .replace(FNR, "[fnr]");
}

export type RequestOrigin =
  | "fetchActiveTestScenario"
  | "setActiveTestScenario"
  | "fetchDineSykmeldte"
  | "fetchOppfolgingsplanerAG"
  | "kopierOppfolgingsplanAG"
  | "opprettOppfolgingsplanAG"
  | "fetchTilgangAG"
  | "fetchKontaktinfo"
  | "fetchNarmesteLedereSM"
  | "fetchOppfolgingsplanerSM"
  | "opprettOppfolgingsplanSM"
  | "fetchSykmeldingerSM"
  | "getDineSykmeldteMedSykmeldinger"
  | "getNarmesteLeder"
  | "getNarmesteLedere"
  | "getSykmeldingerSM"
  | "getVirksomhet"
  | "getOppfolgingsplanerSM"
  | "getOppfolgingsplanerAG"
  | "getSykmeldt"
  | "getTilgang"
  | "getPersonSM"
  | "getKontaktinfo"
  | "createOppfolgingsplanSM"
  | "createOppfolgingsplanAG"
  | "kopierOppfolgingsplan"
  | "avbrytOppfolgingsplan"
  | "avvisOppfolgingsplan"
  | "nullstillGodkjenning"
  | "delMedNav"
  | "delMedFastlege"
  | "godkjennOppfolgingsplanSM"
  | "godkjennOppfolgingsplanAG"
  | "godkjennEgenOppfolgingsplanAG"
  | "godkjennsistOppfolgingsplanSM"
  | "godkjennsistOppfolgingsplanAG"
  | "deleteTiltakComment"
  | "saveTiltakComment"
  | "deleteTiltak"
  | "saveTiltak"
  | "deleteOppgave"
  | "saveOppgave"
  | "getPdf"
  | "ferdigstillVarsel"
  | "lagreOppgave"
  | "slettOppgave"
  | "postKopierOppfolgingsplan"
  | "useNullstillGodkjenning"
  | "useGodkjennsistOppfolgingsplan"
  | "useGodkjennOppfolgingsplan"
  | "useGodkjennEgenOppfolgingsplanAG"
  | "useAvvisOppfolgingsplan"
  | "useDelOppfolgingsplanMedNav"
  | "useDelOppfolgingsplanMedFastlege"
  | "useAvbrytOppfolgingsplan"
  | "useLagreTiltak"
  | "useSlettTiltakSM"
  | "useLagreKommentar"
  | "useSlettKommentar"
  | "useFerdigstillGodkjennPlanVarsel"
  | "ErrorBoundary";

export const logError = (error: Error, requestOrigin: RequestOrigin) => {
  if (typeof window !== "undefined" && !!window.faro) {
    window.faro.api.pushError(error, {
      type: requestOrigin,
    });
  } else {
    logger.error(error.message);
  }
};
