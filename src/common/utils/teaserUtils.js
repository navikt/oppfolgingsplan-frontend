import { STATUS } from "@/common/konstanter";
import { toDateMedMaanedNavn } from "./dateUtils";
import {
  OppfolgingsdialogUnderArbeidImage,
  PlanAvbruttImage,
  PlanGodkjentImage,
  PlanIkkeAktivSykmeldingImage,
} from "@/common/images/imageComponents";

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
        // eslint-disable-next-line max-len
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
        // eslint-disable-next-line max-len
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
        // eslint-disable-next-line max-len
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
