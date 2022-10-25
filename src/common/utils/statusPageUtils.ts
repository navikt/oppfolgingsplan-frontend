import {
  Godkjenning,
  Oppfolgingsplan,
} from "../../schema/oppfolgingsplanSchema";
import { inneholderGodkjenninger } from "@/common/utils/oppfolgingplanUtils";

export const harMottattGodkjenninger = (
  oppfolgingsplan: Oppfolgingsplan
): boolean => {
  const godkjenninger = oppfolgingsplan.godkjenninger;
  const aktoer = oppfolgingsplan.arbeidstaker;
  return !!(
    godkjenninger &&
    godkjenninger.length > 0 &&
    godkjenninger[0].godkjentAv.fnr &&
    godkjenninger[0].godkjentAv.fnr !== aktoer.fnr
  );
};

export const harNaermesteLeder = (
  oppfolgingsplan: Oppfolgingsplan
): boolean => {
  return !!oppfolgingsplan.arbeidsgiver?.naermesteLeder?.fnr;
};

export const erAvvistAvArbeidstaker = (
  oppfolgingsplan: Oppfolgingsplan
): boolean => {
  return !!(
    oppfolgingsplan.godkjenninger &&
    oppfolgingsplan.godkjenninger.length === 1 &&
    !oppfolgingsplan.godkjenninger[0].godkjent &&
    oppfolgingsplan.arbeidstaker.fnr ===
      oppfolgingsplan.godkjenninger[0].godkjentAv.fnr
  );
};

export const harFlereEnnEnGodkjenning = (
  godkjenninger: Godkjenning[] | null
) => {
  return godkjenninger && godkjenninger.length > 1;
};

export const erForsteGodkjenningGodkjent = (
  oppfolgingsplan: Oppfolgingsplan
): boolean => {
  return !!(
    oppfolgingsplan.godkjenninger && oppfolgingsplan.godkjenninger[0].godkjent
  );
};

export const erPlanTilGodkjenning = (oppfolgingsplan: Oppfolgingsplan) => {
  return (
    harNaermesteLeder(oppfolgingsplan) &&
    inneholderGodkjenninger(oppfolgingsplan) &&
    !erAvvistAvArbeidstaker(oppfolgingsplan)
  );
};

export type StatusPageToDisplay =
  | "SENDTPLANTILGODKJENNING"
  | "MOTTATTFLEREGODKJENNINGER"
  | "GODKJENNPLANMOTTATT"
  | "GODKJENNPLANAVSLATT"
  | "GODKJENTPLANAVBRUTT"
  | "GODKJENTPLAN"
  | "INGENPLANTILGODKJENNING";

export const statusPageToDisplay = (
  oppfolgingsplan?: Oppfolgingsplan
): StatusPageToDisplay | null => {
  if (!oppfolgingsplan) return null;

  //Til-godkjenning sider
  if (erPlanTilGodkjenning(oppfolgingsplan)) {
    if (!harMottattGodkjenninger(oppfolgingsplan)) {
      return "SENDTPLANTILGODKJENNING";
    }
    if (harFlereEnnEnGodkjenning(oppfolgingsplan.godkjenninger)) {
      return "MOTTATTFLEREGODKJENNINGER";
    } else if (erForsteGodkjenningGodkjent(oppfolgingsplan)) {
      return "GODKJENNPLANMOTTATT";
    } else {
      return "GODKJENNPLANAVSLATT";
    }
  }

  //Godkjent plan-sider
  if (harNaermesteLeder(oppfolgingsplan) && oppfolgingsplan.godkjentPlan) {
    if (oppfolgingsplan.godkjentPlan.avbruttPlan) {
      return "GODKJENTPLANAVBRUTT";
    } else {
      return "GODKJENTPLAN";
    }
  }

  return "INGENPLANTILGODKJENNING";
};

interface TitleAndHeading {
  title: string;
  heading: string;
}

export const getStatusPageTitleAndHeading = (
  oppfolgingsplan?: Oppfolgingsplan
): TitleAndHeading => {
  switch (statusPageToDisplay(oppfolgingsplan)) {
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
        title: `Godkjenn ${oppfolgingsplan?.virksomhet?.navn}`,
        heading: `Du har mottatt en ny plan for ${oppfolgingsplan?.virksomhet?.navn}`,
      };
    }
    case "GODKJENNPLANAVSLATT": {
      return {
        title: `Status på oppfølgingsplan`,
        heading: `Lederen din har noen forslag`,
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
        heading: `Oppfølgingsplanen`,
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
