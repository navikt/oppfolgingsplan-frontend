import {
  SJEKKER_TILGANG,
  SJEKKET_TILGANG,
  SJEKK_TILGANG_FEILET,
  SJEKK_TILGANG_403,
} from "../actions/oppfolgingsplan/sjekkTilgang_actions";

const initiellState = {
  data: {},
};

const tilgang = (state = initiellState, action = {}) => {
  switch (action.type) {
    case SJEKKER_TILGANG: {
      return Object.assign({}, state, {
        henter: true,
        hentet: false,
        hentingFeilet: false,
        data: {},
      });
    }
    case SJEKKET_TILGANG: {
      return Object.assign({}, state, {
        data: action.data,
        henter: false,
        hentet: true,
        hentingFeilet: false,
      });
    }
    case SJEKK_TILGANG_FEILET: {
      return Object.assign({}, state, {
        henter: false,
        hentet: false,
        hentingFeilet: true,
        data: {},
      });
    }
    case SJEKK_TILGANG_403: {
      return Object.assign({}, state, {
        henter: false,
        hentet: false,
        hentingFeilet: false,
        data: {
          harTilgang: false,
        },
      });
    }
    default:
      return state;
  }
};

export default tilgang;
