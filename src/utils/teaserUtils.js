import { STATUS } from "constants/konstanter";
import { toDateMedMaanedNavn } from "./dateUtils";
import PlanGodkjentImage from "../components/blocks/images/oppfolgingsdialog-green.svg";
import PlanAvbruttImage from "../components/blocks/images//plan-avbrutt.svg";
import OppfolgingsdialogUnderArbeidImage from "../components/blocks/images//oppfolgingsdialog-beige.svg";
import PlanIkkeAktivSykmeldingImage from "../components/blocks/images//plan-ikke-aktiv-sykmelding--hake.svg";

const texts = {
  hentPlanStatus: {
    avbrutt: "Avbrutt",
  },
};

const textStatusUnderArbeid = (date, personName) => {
  return `
        Sist endret: ${date}<br/>
        Endret av: ${personName}
    `;
};

export const hentPlanStatus = (oppfolgingsdialog) => {
  const status = {
    tekst: "",
    img: "",
  };

  switch (oppfolgingsdialog.status) {
    case STATUS.UTDATERT:
      status.tekst =
        oppfolgingsdialog &&
        oppfolgingsdialog.godkjentPlan.gyldighetstidspunkt &&
        `${toDateMedMaanedNavn(
          oppfolgingsdialog.godkjentPlan.gyldighetstidspunkt.fom
        )} - ${toDateMedMaanedNavn(
          oppfolgingsdialog.godkjentPlan.gyldighetstidspunkt.tom
        )}`;
      status.img = PlanGodkjentImage;
      break;
    case STATUS.AVBRUTT:
      status.tekst = texts.hentPlanStatus.avbrutt;
      status.img = PlanAvbruttImage;
      break;
    case STATUS.UNDER_ARBEID:
      status.tekst = textStatusUnderArbeid(
        toDateMedMaanedNavn(oppfolgingsdialog.sistEndretDato),
        oppfolgingsdialog.sistEndretAv.navn
      );
      status.img = OppfolgingsdialogUnderArbeidImage;
      break;
    case STATUS.AKTIV:
      status.tekst =
        oppfolgingsdialog &&
        oppfolgingsdialog.godkjentPlan.gyldighetstidspunkt &&
        `${toDateMedMaanedNavn(
          oppfolgingsdialog.godkjentPlan.gyldighetstidspunkt.fom
        )} - ${toDateMedMaanedNavn(
          oppfolgingsdialog.godkjentPlan.gyldighetstidspunkt.tom
        )}`;
      status.img = PlanGodkjentImage;
      break;
    default:
      status.tekst =
        oppfolgingsdialog &&
        oppfolgingsdialog.godkjentPlan.gyldighetstidspunkt &&
        `${toDateMedMaanedNavn(
          oppfolgingsdialog.godkjentPlan.gyldighetstidspunkt.fom
        )} - ${toDateMedMaanedNavn(
          oppfolgingsdialog.godkjentPlan.gyldighetstidspunkt.tom
        )}`;
      status.img = PlanGodkjentImage;
      break;
  }
  return status;
};

export const hentStatusUtenAktivSykmelding = (oppfolgingsdialog) => {
  return {
    tekst:
      oppfolgingsdialog &&
      oppfolgingsdialog.godkjentPlan &&
      oppfolgingsdialog.godkjentPlan.gyldighetstidspunkt
        ? `${toDateMedMaanedNavn(
            oppfolgingsdialog.godkjentPlan.gyldighetstidspunkt.fom
          )} - ${toDateMedMaanedNavn(
            oppfolgingsdialog.godkjentPlan.gyldighetstidspunkt.tom
          )}`
        : "",
    img: PlanIkkeAktivSykmeldingImage,
  };
};
