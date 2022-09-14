import { call, put, takeEvery } from 'redux-saga/effects';
import * as actions from '../../actions/oppfolgingsplan/arbeidsforhold_actions';
import { get } from '../../api/axios';

export function* hentArbeidsforhold(action) {
  try {
    yield put(actions.henterArbeidsforhold(action.fnr, action.virksomhetsnummer));
    const url = `${process.env.REACT_APP_SYFOOPPFOLGINGSPLANSERVICE_PROXY_PATH}/v2/arbeidsforhold?fnr=${action.fnr}&virksomhetsnummer=${action.virksomhetsnummer}&fom=${action.fom}`;
    const stillinger = yield call(get, url);
    yield put(actions.hentetArbeidsforhold(stillinger, action.fnr, action.virksomhetsnummer));
  } catch (e) {
    yield put(actions.hentArbeidsforholdFeilet(action.fnr, action.virksomhetsnummer));
  }
}

export default function* arbeidsforholdSagas() {
  yield takeEvery(actions.HENT_ARBEIDSFORHOLD_FORESPURT, hentArbeidsforhold);
}
