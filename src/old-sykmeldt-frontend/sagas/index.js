import { all } from "redux-saga/effects";
import arbeidsforholdSagas from "./oppfolgingsplan/arbeidsforholdSagas";
import arbeidsoppgaveSagas from "./oppfolgingsplan/arbeidsoppgaveSagas";
import avbrytdialogSagas from "./oppfolgingsplan/avbrytdialogSagas";
import delMedFastlegeSagas from "./oppfolgingsplan/delMedFastlegeSagas";
import delMedNavSagas from "./oppfolgingsplan/delMedNavSagas";
import kommentarSagas from "./oppfolgingsplan/kommentarSagas";
import kontaktinfoSagas from "./oppfolgingsplan/kontaktinfoSagas";
import kopierOppfolgingsdialogSagas from "./oppfolgingsplan/kopierOppfolgingsdialogSagas";
import naermesteLederSagas from "./oppfolgingsplan/naermestelederSagas";
import nullstillGodkjenningSagas from "./oppfolgingsplan/nullstillGodkjenningSagas";
import oppfolgingsdialogerSagas from "./oppfolgingsplan/oppfolgingsdialogerSagas";
import personSagas from "./oppfolgingsplan/personSagas";
import settDialogSagas from "./oppfolgingsplan/settDialogSagas";
import tilgangSagas from "./oppfolgingsplan/tilgangSagas";
import tiltakSagas from "./oppfolgingsplan/tiltakSagas";
import virksomhetSagas from "./oppfolgingsplan/virksomhetSagas";

import dineSykmeldingerSagas from "./dineSykmeldingerSagas";
import ledereSagas from "./ledereSagas";

export default function* rootSaga() {
  yield all([
    arbeidsforholdSagas(),
    dineSykmeldingerSagas(),
    avbrytdialogSagas(),
    oppfolgingsdialogerSagas(),
    delMedFastlegeSagas(),
    delMedNavSagas(),
    nullstillGodkjenningSagas(),
    arbeidsoppgaveSagas(),
    kommentarSagas(),
    kopierOppfolgingsdialogSagas(),
    tilgangSagas(),
    tiltakSagas(),
    settDialogSagas(),
    virksomhetSagas(),
    personSagas(),
    kontaktinfoSagas(),
    naermesteLederSagas(),
    ledereSagas(),
  ]);
}
