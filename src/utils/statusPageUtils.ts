import { inneholderGodkjenninger } from "./oppfolgingplanUtils";
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

const harMottattGodkjenningerFraArbeidsgiver = (
  oppfolgingsplan: OppfolgingsplanDTO,
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

const harMottattGodkjenningerFraArbeidstaker = (
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

const harNaermesteLeder = (oppfolgingsplan: OppfolgingsplanDTO): boolean => {
  return !!oppfolgingsplan.arbeidsgiver?.naermesteLeder?.fnr;
};

const erAvvistAvAktor = (
  oppfolgingsplan: OppfolgingsplanDTO,
  aktor: string,
): boolean => {
  return (
    oppfolgingsplan.godkjenninger?.length === 1 &&
    !oppfolgingsplan.godkjenninger[0].godkjent &&
    aktor === oppfolgingsplan.godkjenninger[0].godkjentAv.fnr
  );
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

const erPlanTilGodkjenningSM = (oppfolgingsplan: OppfolgingsplanDTO) => {
  return (
    harNaermesteLeder(oppfolgingsplan) &&
    inneholderGodkjenninger(oppfolgingsplan) &&
    oppfolgingsplan.arbeidstaker.fnr &&
    !erAvvistAvAktor(oppfolgingsplan, oppfolgingsplan.arbeidstaker.fnr)
  );
};

const erPlanTilGodkjenningAG = (oppfolgingsplan: OppfolgingsplanDTO) => {
  return (
    inneholderGodkjenninger(oppfolgingsplan) &&
    oppfolgingsplan.arbeidsgiver?.naermesteLeder?.fnr &&
    !erAvvistAvAktor(
      oppfolgingsplan,
      oppfolgingsplan.arbeidsgiver.naermesteLeder.fnr,
    )
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

export const statusPageToDisplaySM = (
  oppfolgingsplan?: OppfolgingsplanDTO,
): StatusPageToDisplay | null => {
  if (!oppfolgingsplan) return null;

  //Til-godkjenning sider
  if (erPlanTilGodkjenningSM(oppfolgingsplan)) {
    if (!harMottattGodkjenningerFraArbeidsgiver(oppfolgingsplan)) {
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
  if (oppfolgingsplan.godkjentPlan) {
    if (oppfolgingsplan.godkjentPlan.avbruttPlan) {
      return "GODKJENTPLANAVBRUTT";
    } else {
      return "GODKJENTPLAN";
    }
  }

  return "INGENPLANTILGODKJENNING";
};

export const statusPageToDisplayAG = (
  oppfolgingsplan?: OppfolgingsplanDTO,
): StatusPageToDisplay | null => {
  if (!oppfolgingsplan) return null;

  //Til-godkjenning sider
  if (erPlanTilGodkjenningAG(oppfolgingsplan)) {
    if (!harMottattGodkjenningerFraArbeidstaker(oppfolgingsplan)) {
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
  if (oppfolgingsplan.godkjentPlan) {
    if (oppfolgingsplan.godkjentPlan.avbruttPlan) {
      return "GODKJENTPLANAVBRUTT";
    } else {
      return "GODKJENTPLAN";
    }
  }

  return "INGENPLANTILGODKJENNING";
};
