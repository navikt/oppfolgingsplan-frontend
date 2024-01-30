import { STATUS } from "../constants/konstanter";
import { toDateMedMaanedNavn } from "./dateUtils";
import PlanGodkjentImage from "../components/blocks/images/oppfolgingsdialog-green.svg";
import PlanAvbruttImage from "../components/blocks/images//plan-avbrutt.svg";
import OppfolgingsdialogUnderArbeidImage from "../components/blocks/images//oppfolgingsdialog-beige.svg";
import PlanIkkeAktivSykmeldingImage from "../components/blocks/images//oppfolgingsdialog-gray.svg";
import { Oppfolgingsplan } from "../types/oppfolgingsplan";

const texts = {
  hentPlanStatus: {
    avbrutt: "Avbrutt",
  },
};

const textStatusUnderArbeid = (date: string, personName: string) => {
  return {
    sistEndret: date,
    endretAv: personName,
  };
};

const textStatusDefault = (oppfolgingsplan: Oppfolgingsplan): string => {
  return oppfolgingsplan &&
    oppfolgingsplan.godkjentPlan &&
    oppfolgingsplan.godkjentPlan.gyldighetstidspunkt &&
    oppfolgingsplan.godkjentPlan.gyldighetstidspunkt.fom &&
    oppfolgingsplan.godkjentPlan.gyldighetstidspunkt.tom
    ? `${toDateMedMaanedNavn(
        oppfolgingsplan.godkjentPlan.gyldighetstidspunkt.fom,
      )} - ${toDateMedMaanedNavn(
        oppfolgingsplan.godkjentPlan.gyldighetstidspunkt.tom,
      )}`
    : "";
};

export const hentPlanStatus = (
  oppfolgingsplan: Oppfolgingsplan,
): {
  img: string;
  tekst: string;
  tekstUnderArbeid: {
    sistEndret: string;
    endretAv: string;
  };
} => {
  const status = {
    tekst: "",
    img: "",
    tekstUnderArbeid: {
      sistEndret: "",
      endretAv: "",
    },
  };

  switch (oppfolgingsplan.status) {
    case STATUS.UTDATERT:
      status.tekst = textStatusDefault(oppfolgingsplan);
      status.img = PlanGodkjentImage;
      break;
    case STATUS.AVBRUTT:
      status.tekst = texts.hentPlanStatus.avbrutt;
      status.img = PlanAvbruttImage;
      break;
    case STATUS.UNDER_ARBEID:
      status.tekstUnderArbeid = textStatusUnderArbeid(
        toDateMedMaanedNavn(oppfolgingsplan.sistEndretDato),
        oppfolgingsplan.sistEndretAv.navn,
      );
      status.img = OppfolgingsdialogUnderArbeidImage;
      break;
    case STATUS.AKTIV:
      status.tekst = textStatusDefault(oppfolgingsplan);
      status.img = PlanGodkjentImage;
      break;
    default:
      status.tekst = textStatusDefault(oppfolgingsplan);
      status.img = PlanGodkjentImage;
      break;
  }
  return status;
};

export const hentStatusUtenAktivSykmelding = (
  oppfolgingsdialog: Oppfolgingsplan,
): { img: string; tekst: string } => {
  return {
    tekst: textStatusDefault(oppfolgingsdialog),
    img: PlanIkkeAktivSykmeldingImage,
  };
};
