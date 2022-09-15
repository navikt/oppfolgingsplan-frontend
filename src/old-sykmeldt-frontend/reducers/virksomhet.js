import * as actions from '../actions/oppfolgingsplan/virksomhet_actions';
import { HENTER_OPPFOLGINGSDIALOGER } from '../actions/oppfolgingsplan/oppfolgingsdialog_actions';

const initiellState = {
  henter: [],
  hentet: [],
  hentingFeilet: [],
  data: [],
};

const virksomhet = (state = initiellState, action = {}) => {
  switch (action.type) {
    case actions.HENTER_VIRKSOMHET: {
      return Object.assign({}, state, {
        henter: state.henter.concat(action.virksomhetsnummer),
        hentingFeilet: state.hentingFeilet.filter((hentingFeilet) => {
          return hentingFeilet.virksomhetsnummer !== action.virksomhetsnummer;
        }),
      });
    }
    case actions.VIRKSOMHET_HENTET: {
      return Object.assign({}, state, {
        henter: state.henter.filter((henter) => {
          return henter !== action.virksomhetsnummer;
        }),
        hentet: state.hentet.concat(action.virksomhetsnummer),
        hentingFeilet: state.hentingFeilet.filter((hentingFeilet) => {
          return hentingFeilet.virksomhetsnummer !== action.virksomhetsnummer;
        }),
        data: state.data.concat({ virksomhetsnummer: action.virksomhetsnummer, navn: action.virksomhet.navn }),
      });
    }
    case actions.HENT_VIRKSOMHET_FEILET: {
      return Object.assign({}, state, {
        henter: state.henter.filter((henter) => {
          return henter.virksomhetsnummer !== action.virksomhetsnummer;
        }),
        hentingFeilet: state.hentingFeilet.concat(action.virksomhetsnummer),
      });
    }
    case HENTER_OPPFOLGINGSDIALOGER:
      return initiellState;
    default:
      return state;
  }
};

export default virksomhet;
