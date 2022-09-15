import { call, put, takeEvery } from 'redux-saga/effects';
import * as actions from '../actions/ledere_actions';
import * as actiontyper from '../actions/actiontyper';
import { get } from '../api/axios';

export function* hentLedere(action) {
  yield put(actions.henterLedere());
  try {
    const url = `${process.env.REACT_APP_SYFOOPPFOLGINGSPLANSERVICE_PROXY_PATH}/v2/narmesteledere/${action.fodselsnummer}`;
    const data = yield call(get, url);

    yield put(actions.ledereHentet(data));
  } catch (e) {
    yield put(actions.hentLedereFeilet());
  }
}

export default function* ledereSagas() {
  yield takeEvery(actiontyper.HENT_LEDERE_FORESPURT, hentLedere);
}
