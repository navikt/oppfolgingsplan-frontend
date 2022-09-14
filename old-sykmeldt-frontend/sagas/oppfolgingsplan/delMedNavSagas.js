import { call, put, takeEvery } from 'redux-saga/effects';
import { post } from '../../api/axios';
import * as actions from '../../actions/oppfolgingsplan/delmednav_actions';

export function* delMedNav(action) {
  try {
    yield put(actions.delerMedNav(action.fnr));
    const url = `${process.env.REACT_APP_SYFOOPPFOLGINGSPLANSERVICE_PROXY_PATH}/oppfolgingsplan/actions/${action.id}/delmednav`;
    yield call(post, url);
    yield put(actions.deltMedNav(action.id, action.fnr));
  } catch (e) {
    yield put(actions.delMedNavFeilet(action.fnr));
  }
}

export default function* delMedNavSagas() {
  yield takeEvery(actions.DEL_MED_NAV_FORESPURT, delMedNav);
}
