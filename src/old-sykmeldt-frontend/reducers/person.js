import * as actions from '../actions/oppfolgingsplan/person_actions';
import { HENTER_OPPFOLGINGSDIALOGER } from '../actions/oppfolgingsplan/oppfolgingsdialog_actions';

const initiellState = {
  henter: [],
  hentet: [],
  hentingFeilet: [],
  data: [],
};

const person = (state = initiellState, action = {}) => {
  switch (action.type) {
    case actions.HENTER_PERSON: {
      return Object.assign({}, state, {
        henter: state.henter.concat(action.fnr),
        hentingFeilet: state.hentingFeilet.filter((hentingFeilet) => {
          return hentingFeilet.fnr !== action.fnr;
        }),
      });
    }
    case actions.PERSON_HENTET: {
      return Object.assign({}, state, {
        henter: state.henter.filter((henter) => {
          return henter !== action.fnr;
        }),
        hentet: state.hentet.concat(action.fnr),
        hentingFeilet: state.hentingFeilet.filter((hentingFeilet) => {
          return hentingFeilet.fnr !== action.fnr;
        }),
        data: state.data.concat({ fnr: action.fnr, navn: action.person.navn }),
      });
    }
    case actions.HENT_PERSON_FEILET: {
      return Object.assign({}, state, {
        henter: state.henter.filter((henter) => {
          return henter.fnr !== action.fnr;
        }),
        hentingFeilet: state.hentingFeilet.concat(action.fnr),
      });
    }
    case HENTER_OPPFOLGINGSDIALOGER:
      return initiellState;
    default:
      return state;
  }
};

export default person;
