import { planErTilGodkjenning } from "./oppfolgingplanUtils";
import {
  GodkjenningDTO,
  OppfolgingsplanDTO,
} from "../schema/oppfolgingsplanSchema";

export const getStatusPageTitleAndHeading = (
  godkjenningsStatus: StatusPageToDisplay | null,
  virksomhetsNavn: string | undefined,
  navnPaaMotpart: string,
) => {
  switch (godkjenningsStatus) {
    case "SENDTPLANTILGODKJENNING": {
      return {
        title: `Status på oppfølgingsplan`,
        heading: `Sendt til godkjenning`,
      };
    }
    case "MOTTATTFLEREGODKJENNINGER": {
      return {
        title: `Status på oppfølgingsplan`,
        heading: `Mottatt endring`,
      };
    }
    case "GODKJENNPLANMOTTATT": {
      return {
        title: `Godkjenn ${virksomhetsNavn}`,
        heading: `Du har mottatt en ny plan for ${virksomhetsNavn}`,
      };
    }
    case "GODKJENNPLANAVSLATT": {
      return {
        title: `Status på oppfølgingsplan`,
        heading: `${navnPaaMotpart} har noen forslag`,
      };
    }
    case "GODKJENTPLANAVBRUTT": {
      return {
        title: `Status på oppfølgingsplan`,
        heading: `Tidligere oppfølgingsplan`,
      };
    }
    case "GODKJENTPLAN": {
      return {
        title: `Status på oppfølgingsplan`,
        heading: `Oppfølgingsplan`,
      };
    }
    default: {
      return {
        title: `Status på oppfølgingsplan`,
        heading: `Status på oppfølgingsplan`,
      };
    }
  }
};

const arbeidstakerHarSendtPlanTilGodkjenning = (
  oppfolgingsplan: OppfolgingsplanDTO,
): boolean => {
  const godkjenninger = oppfolgingsplan.godkjenninger;
  const aktoer = oppfolgingsplan.arbeidstaker;
  return !!(
    godkjenninger &&
    godkjenninger.length > 0 &&
    godkjenninger[0].godkjentAv.fnr &&
    godkjenninger[0].godkjentAv.fnr === aktoer.fnr
  );
};

export const harNaermesteLeder = (
  oppfolgingsplan: OppfolgingsplanDTO,
): boolean => {
  return !!oppfolgingsplan.arbeidsgiver?.naermesteLeder?.fnr;
};

const harFlereEnnEnGodkjenning = (godkjenninger: GodkjenningDTO[] | null) => {
  return godkjenninger && godkjenninger.length > 1;
};

const erForsteGodkjenningGodkjent = (
  oppfolgingsplan: OppfolgingsplanDTO,
): boolean => {
  return (
    oppfolgingsplan.godkjenninger && oppfolgingsplan.godkjenninger[0].godkjent
  );
};

export type StatusPageToDisplay =
  | "SENDTPLANTILGODKJENNING"
  | "MOTTATTFLEREGODKJENNINGER"
  | "GODKJENNPLANMOTTATT"
  | "GODKJENNPLANAVSLATT"
  | "GODKJENTPLANAVBRUTT"
  | "GODKJENTPLAN"
  | "PLANUNDERARBEID";

export const statusPageToDisplaySM = (
  oppfolgingsplan: OppfolgingsplanDTO,
): StatusPageToDisplay => {
  return statusPageToDisplay(
    oppfolgingsplan,
    arbeidstakerHarSendtPlanTilGodkjenning,
  );
};

export const statusPageToDisplayAG = (
  oppfolgingsplan: OppfolgingsplanDTO,
): StatusPageToDisplay => {
  return statusPageToDisplay(
    oppfolgingsplan,
    (oppfolgingsplan) =>
      !arbeidstakerHarSendtPlanTilGodkjenning(oppfolgingsplan),
  );
};
const statusPageToDisplay = (
  oppfolgingsplan: OppfolgingsplanDTO,
  aktoerHarSendtPlanTilGodkjenning: (
    oppfolgingsplan: OppfolgingsplanDTO,
  ) => boolean,
): StatusPageToDisplay => {
  if (oppfolgingsplan.godkjentPlan) {
    return oppfolgingsplan.godkjentPlan.avbruttPlan
      ? "GODKJENTPLANAVBRUTT"
      : "GODKJENTPLAN";
  }

  if (planErTilGodkjenning(oppfolgingsplan)) {
    if (aktoerHarSendtPlanTilGodkjenning(oppfolgingsplan)) {
      return "SENDTPLANTILGODKJENNING";
    }
    if (harFlereEnnEnGodkjenning(oppfolgingsplan.godkjenninger)) {
      return "MOTTATTFLEREGODKJENNINGER";
    }
    return erForsteGodkjenningGodkjent(oppfolgingsplan)
      ? "GODKJENNPLANMOTTATT"
      : "GODKJENNPLANAVSLATT";
  }

  return "PLANUNDERARBEID";
};
