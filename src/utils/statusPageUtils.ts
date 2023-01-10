import { inneholderGodkjenninger } from "utils/oppfolgingplanUtils";
import { Godkjenning, Oppfolgingsplan } from "../types/oppfolgingsplan";

const harMottattGodkjenningerFraArbeidsgiver = (
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

const harMottattGodkjenningerFraArbeidstaker = (
  oppfolgingsplan: Oppfolgingsplan
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

const harNaermesteLeder = (oppfolgingsplan: Oppfolgingsplan): boolean => {
  return !!oppfolgingsplan.arbeidsgiver?.naermesteLeder?.fnr;
};

const erAvvistAvAktor = (
  oppfolgingsplan: Oppfolgingsplan,
  aktor: string
): boolean => {
  return (
    oppfolgingsplan.godkjenninger?.length === 1 &&
    !oppfolgingsplan.godkjenninger[0].godkjent &&
    aktor === oppfolgingsplan.godkjenninger[0].godkjentAv.fnr
  );
};

const harFlereEnnEnGodkjenning = (godkjenninger: Godkjenning[] | null) => {
  return godkjenninger && godkjenninger.length > 1;
};

const erForsteGodkjenningGodkjent = (
  oppfolgingsplan: Oppfolgingsplan
): boolean => {
  return !!(
    oppfolgingsplan.godkjenninger && oppfolgingsplan.godkjenninger[0].godkjent
  );
};

const erPlanTilGodkjenningSM = (oppfolgingsplan: Oppfolgingsplan) => {
  return (
    harNaermesteLeder(oppfolgingsplan) &&
    inneholderGodkjenninger(oppfolgingsplan) &&
    oppfolgingsplan.arbeidstaker.fnr &&
    !erAvvistAvAktor(oppfolgingsplan, oppfolgingsplan.arbeidstaker.fnr)
  );
};

const erPlanTilGodkjenningAG = (oppfolgingsplan: Oppfolgingsplan) => {
  return (
    inneholderGodkjenninger(oppfolgingsplan) &&
    oppfolgingsplan.arbeidsgiver?.naermesteLeder?.fnr &&
    !erAvvistAvAktor(
      oppfolgingsplan,
      oppfolgingsplan.arbeidsgiver.naermesteLeder.fnr
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
  oppfolgingsplan?: Oppfolgingsplan
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
  if (harNaermesteLeder(oppfolgingsplan) && oppfolgingsplan.godkjentPlan) {
    if (oppfolgingsplan.godkjentPlan.avbruttPlan) {
      return "GODKJENTPLANAVBRUTT";
    } else {
      return "GODKJENTPLAN";
    }
  }

  return "INGENPLANTILGODKJENNING";
};

export const statusPageToDisplayAG = (
  oppfolgingsplan?: Oppfolgingsplan
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
