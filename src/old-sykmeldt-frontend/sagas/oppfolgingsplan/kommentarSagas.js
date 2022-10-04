import { call, put, takeEvery } from "redux-saga/effects";
import { post } from "../../api/axios";
import * as actions from "../../actions/oppfolgingsplan/kommentar_actions";

export function* lagreKommentar(action) {
  try {
    yield put(actions.lagrerKommentar(action.fnr, action.tiltakId));
    const url = `${process.env.REACT_APP_SYFOOPPFOLGINGSPLANSERVICE_PROXY_PATH}/tiltak/actions/${action.tiltakId}/lagreKommentar`;
    const data = yield call(post, url, action.kommentar);
    yield put(
      actions.kommentarLagret(
        action.id,
        action.tiltakId,
        data,
        action.kommentar,
        action.fnr
      )
    );
  } catch (e) {
    if (e.code === 409) {
      window.location.reload();
      return;
    }
    yield put(actions.lagreKommentarFeilet(action.fnr, action.tiltakId));
  }
}

export function* slettKommentar(action) {
  try {
    yield put(actions.sletterKommentar(action.fnr));
    const url = `${process.env.REACT_APP_SYFOOPPFOLGINGSPLANSERVICE_PROXY_PATH}/kommentar/actions/${action.kommentarId}/slett`;
    yield call(post, url);
    yield put(
      actions.kommentarSlettet(
        action.id,
        action.tiltakId,
        action.kommentarId,
        action.fnr
      )
    );
  } catch (e) {
    if (e.code === 409) {
      window.location.reload();
      return;
    }
    yield put(
      actions.slettKommentarFeilet(
        action.fnr,
        action.tiltakId,
        action.kommentarId
      )
    );
  }
}

export default function* kommentarSagas() {
  yield takeEvery(actions.LAGRE_KOMMENTAR_FORESPURT, lagreKommentar);
  yield takeEvery(actions.SLETT_KOMMENTAR_FORESPURT, slettKommentar);
}
