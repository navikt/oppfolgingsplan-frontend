import * as actions from '../actions/oppfolgingsplan/kontaktinfo_actions';
import { HENTER_OPPFOLGINGSDIALOGER } from '../actions/oppfolgingsplan/oppfolgingsdialog_actions';

const initiellState = {
  henter: [],
  hentet: [],
  hentingFeilet: [],
  data: [],
};

const kontaktinfo = (state = initiellState, action = {}) => {
  switch (action.type) {
    case actions.HENTER_KONTAKTINFO: {
      return Object.assign({}, state, {
        henter: state.henter.concat(action.fnr),
        hentingFeilet: state.hentingFeilet.filter((hentingFeilet) => {
          return hentingFeilet.fnr !== action.fnr;
        }),
      });
    }
    case actions.KONTAKTINFO_HENTET: {
      return Object.assign({}, state, {
        henter: state.henter.filter((henter) => {
          return henter !== action.fnr;
        }),
        data: state.data.concat({ fnr: action.fnr, kontaktinfo: action.kontaktinfo }),
        hentet: state.hentet.concat(action.fnr),
        hentingFeilet: state.hentingFeilet.filter((hentingFeilet) => {
          return hentingFeilet.fnr !== action.fnr;
        }),
      });
    }
    case actions.HENT_KONTAKTINFO_FEILET: {
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

export default kontaktinfo;
