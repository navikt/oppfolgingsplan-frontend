import { call, put, takeEvery } from "redux-saga/effects";
import { post } from "../../api/axios";
import * as actions from "../../actions/oppfolgingsplan/nullstillGodkjenning_actions";

export function* nullstillGodkjenning(action) {
  try {
    yield put(actions.nullstillerGodkjenning(action.fnr));
    const url = `${process.env.REACT_APP_SYFOOPPFOLGINGSPLANSERVICE_PROXY_PATH}/oppfolgingsplan/actions/${action.id}/nullstillGodkjenning`;
    yield call(post, url);
    yield put(actions.nullstiltGodkjenning(action.id, action.fnr));
  } catch (e) {
    yield put(actions.nullstillGodkjenningFeilet(action.fnr));
  }
}

export default function* nullstillGodkjenningSagas() {
  yield takeEvery(
    actions.NULLSTILL_GODKJENNING_FORESPURT,
    nullstillGodkjenning
  );
}
