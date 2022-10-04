import { call, put, takeEvery } from "redux-saga/effects";
import { post } from "../../api/axios";
import * as actions from "../../actions/oppfolgingsplan/sett_actions";

export function* settDialoger(action) {
  try {
    yield put(actions.setterSettDialog());
    const url = `${process.env.REACT_APP_SYFOOPPFOLGINGSPLANSERVICE_PROXY_PATH}/oppfolgingsplan/actions/${action.id}/sett`;
    yield call(post, url);
    yield put(actions.dialogSett(action.id));
  } catch (e) {
    yield put(actions.settDialogFeilet());
  }
}

export default function* settDialogSagas() {
  yield takeEvery(actions.SETT_DIALOG_FORESPURT, settDialoger);
}
