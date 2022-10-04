import { call, put, takeEvery } from "redux-saga/effects";
import * as actions from "../../actions/oppfolgingsplan/kontaktinfo_actions";
import { get } from "../../api/axios";

export function* hentKontaktinfoSaga(action) {
  try {
    yield put(actions.henterKontaktinfo(action.fnr));
    const url = `${process.env.REACT_APP_SYFOOPPFOLGINGSPLANSERVICE_PROXY_PATH}/v2/kontaktinfo/${action.fnr}`;
    const kontaktinfo = yield call(get, url);
    yield put(actions.kontaktinfoHentet(kontaktinfo, action.fnr));
  } catch (e) {
    yield put(actions.hentKontaktinfoFeilet(action.fnr));
  }
}

export default function* kontaktinfoSagas() {
  yield takeEvery(actions.HENT_KONTAKTINFO_FORESPURT, hentKontaktinfoSaga);
}
