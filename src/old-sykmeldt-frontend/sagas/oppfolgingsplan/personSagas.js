import { call, put, takeEvery } from "redux-saga/effects";
import { get } from "../../api/axios";
import * as actions from "../../actions/oppfolgingsplan/person_actions";

export function* hentPersonSaga(action) {
  try {
    yield put(actions.henterPerson(action.fnr));
    const url = `${process.env.REACT_APP_SYFOOPPFOLGINGSPLANSERVICE_PROXY_PATH}/v2/person/${action.fnr}`;
    const person = yield call(get, url);

    yield put(actions.personHentet(person, action.fnr));
  } catch (e) {
    yield put(actions.hentPersonFeilet(action.fnr));
  }
}

export default function* personSagas() {
  yield takeEvery(actions.HENT_PERSON_FORESPURT, hentPersonSaga);
}
