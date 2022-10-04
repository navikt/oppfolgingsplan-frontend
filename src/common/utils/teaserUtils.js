import { STATUS } from "@/common/konstanter";
import { finnSistEndretAvNavn } from "./oppfolgingsdialogUtils";
import { toDateMedMaanedNavn } from "./dateUtils";
import {
  PlanGodkjentImage,
  PlanAvbruttImage,
  OppfolgingsdialogTomImage,
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
        finnSistEndretAvNavn(oppfolgingsdialog)
      );
      status.img = OppfolgingsdialogTomImage;
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
