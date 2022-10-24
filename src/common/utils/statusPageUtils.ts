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

export const foersteInnloggingSidenGodkjenning = (
  planOpprettetTidspunkt: string,
  sykmeldtSistInnlogget: string | null | undefined
) => {
  const sistInnlogget: Date = sykmeldtSistInnlogget
    ? new Date(sykmeldtSistInnlogget)
    : new Date();

  return sistInnlogget < new Date(planOpprettetTidspunkt);
};

export const erPlanTilGodkjenning = (oppfolgingsplan: Oppfolgingsplan) => {
  return (
    harNaermesteLeder(oppfolgingsplan) &&
    inneholderGodkjenninger(oppfolgingsplan) &&
    !erAvvistAvArbeidstaker(oppfolgingsplan)
  );
};

const skalViseMeldingOmTvangsGodkjenning = (
  oppfolgingsplan: Oppfolgingsplan
) => {
  return (
    foersteInnloggingSidenGodkjenning(
      oppfolgingsplan.godkjentPlan!!.opprettetTidspunkt,
      oppfolgingsplan.arbeidstaker.sistInnlogget
    ) && oppfolgingsplan.godkjentPlan!!.tvungenGodkjenning
  );
};

export type StatusPageToDisplay =
  | "GODKJENTPLANSENDT"
  | "GODKJENNPLANAVSLATTOGGODKJENT"
  | "MOTTATTGODKJENNING"
  | "GODKJENNPLANAVSLATT"
  | "TVANGSGODKJENT"
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
      return "GODKJENTPLANSENDT";
    }
    if (harFlereEnnEnGodkjenning(oppfolgingsplan.godkjenninger)) {
      return "GODKJENNPLANAVSLATTOGGODKJENT";
    } else if (erForsteGodkjenningGodkjent(oppfolgingsplan)) {
      return "MOTTATTGODKJENNING";
    } else {
      return "GODKJENNPLANAVSLATT";
    }
  }

  //Godkjent plan-sider
  if (harNaermesteLeder(oppfolgingsplan) && oppfolgingsplan.godkjentPlan) {
    if (skalViseMeldingOmTvangsGodkjenning(oppfolgingsplan)) {
      return "TVANGSGODKJENT";
    } else {
      if (oppfolgingsplan.godkjentPlan.avbruttPlan) {
        return "GODKJENTPLANAVBRUTT";
      } else {
        return "GODKJENTPLAN";
      }
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
    case "GODKJENTPLANSENDT": {
      return {
        title: `Status på oppfølgingsplan`,
        heading: `Sendt til godkjenning`,
      };
    }
    case "GODKJENNPLANAVSLATTOGGODKJENT": {
      return {
        title: `Status på oppfølgingsplan`,
        heading: `Mottatt endring`,
      };
    }
    case "MOTTATTGODKJENNING": {
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
    case "TVANGSGODKJENT": {
      return {
        title: `Status på oppfølgingsplan`,
        heading: `Lederen din har laget en oppfølgingsplan`,
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
