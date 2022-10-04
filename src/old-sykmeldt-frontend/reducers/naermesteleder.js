import * as actions from "../actions/oppfolgingsplan/naermesteLeder_actions";
import { HENTER_OPPFOLGINGSDIALOGER } from "../actions/oppfolgingsplan/oppfolgingsdialog_actions";

const initiellState = {
  henter: [],
  hentet: [],
  hentingFeilet: [],
  data: [],
};

const naermesteleder = (state = initiellState, action = {}) => {
  switch (action.type) {
    case actions.HENTER_NAERMESTELEDER: {
      return Object.assign({}, state, {
        henter: state.henter.concat({
          fnr: action.fnr,
          virksomhetsnummer: action.virksomhetsnummer,
        }),
        hentingFeilet: state.hentingFeilet.filter((hentingFeilet) => {
          return (
            hentingFeilet.fnr !== action.fnr &&
            hentingFeilet.virksomhetsnummer !== action.virksomhetsnummer
          );
        }),
      });
    }
    case actions.NAERMESTELEDER_HENTET: {
      return Object.assign({}, state, {
        henter: state.hentingFeilet.filter((henter) => {
          return (
            henter.fnr !== action.fnr &&
            henter.virksomhetsnummer !== action.virksomhetsnummer
          );
        }),
        hentet: state.hentet.concat({
          fnr: action.fnr,
          virksomhetsnummer: action.virksomhetsnummer,
        }),
        hentingFeilet: state.hentingFeilet.filter((hentingFeilet) => {
          return (
            hentingFeilet.fnr !== action.fnr &&
            hentingFeilet.virksomhetsnummer !== action.virksomhetsnummer
          );
        }),
        data: state.data.concat({
          fnr: action.fnr,
          virksomhetsnummer: action.virksomhetsnummer,
          naermesteLeder: action.naermesteLeder,
        }),
      });
    }
    case actions.INGEN_NAERMESTELEDER: {
      return Object.assign({}, state, {
        henter: state.henter.filter((henter) => {
          return (
            henter.fnr !== action.fnr &&
            henter.virksomhetsnummer !== action.virksomhetsnummer
          );
        }),
        hentet: state.hentet.concat({
          fnr: action.fnr,
          virksomhetsnummer: action.virksomhetsnummer,
        }),
        hentingFeilet: state.hentingFeilet.filter((hentingFeilet) => {
          return (
            hentingFeilet.fnr !== action.fnr &&
            hentingFeilet.virksomhetsnummer !== action.virksomhetsnummer
          );
        }),
      });
    }
    case actions.HENT_NAERMESTELEDER_FEILET: {
      return Object.assign({}, state, {
        henter: state.henter.filter((henter) => {
          return (
            henter.fnr !== action.fnr &&
            henter.virksomhetsnummer !== action.virksomhetsnummer
          );
        }),
        hentingFeilet: state.hentingFeilet.concat({
          fnr: action.fnr,
          virksomhetsnummer: action.virksomhetsnummer,
        }),
      });
    }
    case HENTER_OPPFOLGINGSDIALOGER:
      return initiellState;
    default:
      return state;
  }
};

export default naermesteleder;
