import { call, put, takeEvery } from 'redux-saga/effects';
import * as actions from '../../actions/oppfolgingsplan/virksomhet_actions';
import { get } from '../../api/axios';

export function* hentVirksomhetSaga(action) {
  try {
    yield put(actions.henterVirksomhet(action.virksomhetsnummer));
    const url = `${process.env.REACT_APP_SYFOOPPFOLGINGSPLANSERVICE_PROXY_PATH}/v2/virksomhet/${action.virksomhetsnummer}`;
    const virksomhet = yield call(get, url);
    yield put(actions.virksomhetHentet(virksomhet, action.virksomhetsnummer));
  } catch (e) {
    yield put(actions.hentVirksomhetFeilet(action.virksomhetsnummer));
  }
}

export default function* virksomhetSagas() {
  yield takeEvery(actions.HENT_VIRKSOMHET_FORESPURT, hentVirksomhetSaga);
}
