import { call, put, takeEvery } from 'redux-saga/effects';
import { post } from '../../api/axios';
import * as actions from '../../actions/oppfolgingsplan/delMedFastlege_actions';

export function* delMedFastlege(action) {
  try {
    yield put(actions.delerMedFastlege(action.fnr));
    const url = `${process.env.REACT_APP_SYFOOPPFOLGINGSPLANSERVICE_PROXY_PATH}/oppfolgingsplan/actions/${action.id}/delmedfastlege`;
    yield call(post, url);
    yield put(actions.deltMedFastlege(action.id, action.fnr));
  } catch (e) {
    yield put(actions.delMedFastlegeFeilet(action.fnr));
  }
}

export default function* delMedFastlegeSagas() {
  yield takeEvery(actions.DEL_MED_FASTLEGE_FORESPURT, delMedFastlege);
}
