import { call, put, takeEvery } from 'redux-saga/effects';
import { post } from '../../api/axios';
import * as actions from '../../actions/oppfolgingsplan/tiltak_actions';
import { input2RSTiltak } from '../../../common/utils/tiltakUtils';

export function* lagreTiltak(action) {
  try {
    yield put(actions.lagrerTiltak(action.fnr, action.tiltak.tiltakId));
    const url = `${process.env.REACT_APP_SYFOOPPFOLGINGSPLANSERVICE_PROXY_PATH}/oppfolgingsplan/actions/${action.id}/lagreTiltak`;
    const data = yield call(post, url, input2RSTiltak(action.tiltak));
    yield put(actions.tiltakLagret(action.id, data, action.tiltak, action.fnr));
  } catch (e) {
    if (e.code === 409) {
      window.location.reload();
      return;
    }
    yield put(actions.lagreTiltakFeilet(action.fnr, action.tiltak));
  }
}

export function* slettTiltak(action) {
  try {
    yield put(actions.sletterTiltak(action.fnr));
    const url = `${process.env.REACT_APP_SYFOOPPFOLGINGSPLANSERVICE_PROXY_PATH}/tiltak/actions/${action.tiltakId}/slett`;
    yield call(post, url);
    yield put(actions.tiltakSlettet(action.id, action.tiltakId, action.fnr));
  } catch (e) {
    if (e.code === 409) {
      window.location.reload();
      return;
    }
    yield put(actions.slettTiltakFeilet(action.fnr, action.tiltakId));
  }
}

export default function* tiltakSagas() {
  yield takeEvery(actions.LAGRE_TILTAK_FORESPURT, lagreTiltak);
  yield takeEvery(actions.SLETT_TILTAK_FORESPURT, slettTiltak);
}
