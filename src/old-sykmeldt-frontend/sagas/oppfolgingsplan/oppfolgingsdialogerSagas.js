import { call, put, takeEvery } from "redux-saga/effects";
import { get, post } from "../../api/axios";
import * as actions from "../../actions/oppfolgingsplan/oppfolgingsdialog_actions";

export function* hentSykmeldtOppfolginger() {
  try {
    yield put(actions.henterOppfolgingsdialoger());
    const url = `${process.env.REACT_APP_SYFOOPPFOLGINGSPLANSERVICE_PROXY_PATH}/arbeidstaker/oppfolgingsplaner`;
    const data = yield call(get, url);
    yield put(actions.oppfolgingsdialogerHentet(data));
  } catch (e) {
    yield put(actions.hentOppfolgingsdialogerFeilet());
  }
}

export function* opprettOppfolgingsdialog(action) {
  try {
    yield put(actions.oppretterOppfolgingsdialog());
    const url = `${process.env.REACT_APP_SYFOOPPFOLGINGSPLANSERVICE_PROXY_PATH}/arbeidstaker/oppfolgingsplaner`;
    const data = yield call(post, url, {
      virksomhetsnummer: action.virksomhetsnummer,
    });
    yield put(actions.oppfolgingsdialogOpprettet(data));
  } catch (e) {
    if (e.code === 409) {
      window.location.reload();
      return;
    }
    yield put(actions.opprettOppfolgingsdialogFeilet());
  }
}

export function* godkjennDialogSaga(action) {
  try {
    yield put(actions.godkjennerDialog());
    const delMedNav = `&delmednav=${action.delMedNav}`;

    const url = action.gyldighetstidspunkt
      ? `${process.env.REACT_APP_SYFOOPPFOLGINGSPLANSERVICE_PROXY_PATH}/oppfolgingsplan/actions/${action.id}/godkjenn?status=${action.status}&aktoer=arbeidstaker${delMedNav}`
      : `${process.env.REACT_APP_SYFOOPPFOLGINGSPLANSERVICE_PROXY_PATH}/oppfolgingsplan/actions/${action.id}/godkjennsist?status=${action.status}&aktoer=arbeidstaker${delMedNav}`;

    const data = yield call(post, url, action.gyldighetstidspunkt);
    yield put(
      actions.dialogGodkjent(action.id, action.status, data, action.delMedNav)
    );
  } catch (e) {
    if (e.code === 409) {
      window.location.reload();
      return;
    }
    yield put(actions.godkjennDialogFeilet());
  }
}

export function* avvisDialogSaga(action) {
  try {
    yield put(actions.avviserDialog());
    const url = `${process.env.REACT_APP_SYFOOPPFOLGINGSPLANSERVICE_PROXY_PATH}/oppfolgingsplan/actions/${action.id}/avvis`;
    yield call(post, url);
    yield put(actions.dialogAvvist(action.id));
  } catch (e) {
    yield put(actions.avvisDialogFeilet());
  }
}

export default function* oppfolgingsdialogerSagas() {
  yield takeEvery(actions.GODKJENN_DIALOG_FORESPURT, godkjennDialogSaga);
  yield takeEvery(actions.AVVIS_DIALOG_FORESPURT, avvisDialogSaga);
  yield takeEvery(
    actions.HENT_OPPFOLGINGSDIALOGER_FORESPURT,
    hentSykmeldtOppfolginger
  );
  yield takeEvery(
    actions.OPPRETT_OPPFOLGINGSDIALOG_FORESPURT,
    opprettOppfolgingsdialog
  );
}
