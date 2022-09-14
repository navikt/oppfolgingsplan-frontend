import { call, put, takeEvery } from 'redux-saga/effects';
import { post } from '../../api/axios';
import * as actions from '../../actions/oppfolgingsplan/samtykke_actions';

export function* giSamtykke(action) {
  yield put(actions.girSamtykke(action.fnr));
  try {
    const url = `${process.env.REACT_APP_SYFOOPPFOLGINGSPLANSERVICE_PROXY_PATH}/oppfolgingsplan/actions/${action.id}/samtykk?samtykke=${action.samtykke}`;
    yield call(post, url);
    yield put(actions.samtykkeGitt(action.id, action.samtykke, action.fnr));
  } catch (e) {
    yield put(actions.giSamtykkeFeilet(action.fnr));
  }
}

export default function* samtykkeSagas() {
  yield takeEvery(actions.GI_SAMTYKKE_FORESPURT, giSamtykke);
}
