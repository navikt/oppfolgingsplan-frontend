import * as actions from '../actions/oppfolgingsplan/kommentar_actions';
import { LAGRER_TILTAK, SLETTER_TILTAK } from '../actions/oppfolgingsplan/tiltak_actions';
import { SETT_AKTIVT_STEG } from '../actions/oppfolgingsplan/toggle_actions';

const initiellState = {
  slettet: false,
  sletter: false,
  slettingFeilet: false,
  lagrer: false,
  lagret: false,
  lagringFeilet: false,
  feiletTiltakId: 0,
  feiletKommentarId: 0,
  tiltakId: 0,
};

const kommentar = (state = initiellState, action = {}) => {
  switch (action.type) {
    case SETT_AKTIVT_STEG: {
      return Object.assign({}, state, {
        feiletTiltakId: 0,
        lagringFeilet: false,
        slettingFeilet: false,
      });
    }
    case actions.LAGRER_KOMMENTAR: {
      return Object.assign({}, state, {
        lagrer: true,
        lagret: false,
        lagringFeilet: false,
        tiltakId: action.tiltakId,
      });
    }
    case actions.KOMMENTAR_LAGRET: {
      return Object.assign({}, state, {
        lagrer: false,
        lagret: true,
        lagringFeilet: false,
        tiltakId: action.tiltakId,
      });
    }
    case actions.LAGRE_KOMMENTAR_FEILET: {
      return Object.assign({}, state, {
        lagrer: false,
        sletter: false,
        lagringFeilet: true,
        slettingFeilet: false,
        feiletTiltakId: action.tiltakId,
      });
    }
    case actions.SLETTER_KOMMENTAR: {
      return Object.assign({}, state, {
        sletter: true,
        slettingFeilet: false,
        slettet: false,
      });
    }
    case actions.KOMMENTAR_SLETTET: {
      return Object.assign({}, state, {
        sletter: false,
        slettingFeilet: false,
        slettet: true,
      });
    }
    case actions.SLETT_KOMMENTAR_FEILET: {
      return Object.assign({}, state, {
        sletter: false,
        lagrer: false,
        slettingFeilet: true,
        lagringFeilet: false,
        feiletTiltakId: action.tiltakId,
        feiletKommentarId: action.kommentarId,
      });
    }
    case LAGRER_TILTAK:
    case SLETTER_TILTAK: {
      return Object.assign({}, state, {
        sletter: false,
        lagrer: false,
        lagringFeilet: false,
        slettingFeilet: false,
        feiletTiltakId: 0,
        feiletKommentarId: 0,
      });
    }
    default:
      return state;
  }
};

export default kommentar;
