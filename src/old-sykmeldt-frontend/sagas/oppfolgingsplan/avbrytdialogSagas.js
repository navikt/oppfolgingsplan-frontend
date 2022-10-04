import { call, put, takeEvery } from "redux-saga/effects";
import { post } from "../../api/axios";
import * as actions from "../../actions/oppfolgingsplan/avbrytdialog_actions";

export function* avbrytDialog(action) {
  try {
    yield put(actions.avbryterDialog(action.fnr));
    const url = `${process.env.REACT_APP_SYFOOPPFOLGINGSPLANSERVICE_PROXY_PATH}/oppfolgingsplan/actions/${action.id}/avbryt`;
    yield call(post, url);
    yield put(actions.dialogAvbrutt(action.id, action.fnr));
  } catch (e) {
    if (e.code === 409) {
      window.location.reload();
      return;
    }
    yield put(actions.avbrytDialogFeilet(action.fnr));
  }
}

export default function* avbrytdialogSagas() {
  yield takeEvery(actions.AVBRYT_DIALOG_FORESPURT, avbrytDialog);
}
