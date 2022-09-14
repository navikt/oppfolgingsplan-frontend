import {
  LAGRER_TILTAK,
  TILTAK_LAGRET,
  LAGRE_TILTAK_FEILET,
  SLETTER_TILTAK,
  TILTAK_SLETTET,
  SLETT_TILTAK_FEILET,
} from '../actions/oppfolgingsplan/tiltak_actions';
import {
  KOMMENTAR_LAGRET,
  KOMMENTAR_SLETTET,
  LAGRER_KOMMENTAR,
  SLETTER_KOMMENTAR,
} from '../actions/oppfolgingsplan/kommentar_actions';
import { SETT_AKTIVT_STEG } from '../actions/oppfolgingsplan/toggle_actions';

const initiellState = {
  slettet: false,
  sletter: false,
  slettingFeilet: false,
  lagrer: false,
  lagret: false,
  lagringFeilet: false,
  godkjenner: false,
  godkjent: false,
  godkjenningFeilet: false,
  feiletTiltakId: 0,
  tiltakId: 0,
  tiltak: null,
};

const tiltak = (state = initiellState, action = {}) => {
  switch (action.type) {
    case SETT_AKTIVT_STEG: {
      return Object.assign({}, state, {
        feiletTiltakId: 0,
        lagringFeilet: false,
        slettingFeilet: false,
        tiltakId: 0,
        tiltak: null,
      });
    }
    case LAGRER_TILTAK: {
      return Object.assign({}, state, {
        lagrer: true,
        lagret: false,
        lagringFeilet: false,
        feiletTiltakId: 0,
        tiltakId: action.tiltakId,
        tiltak: null,
      });
    }
    case TILTAK_LAGRET: {
      return Object.assign({}, state, {
        lagrer: false,
        lagret: true,
        lagringFeilet: false,
        feiletTiltakId: 0,
        tiltakId: action.tiltak.tiltakId,
        tiltak: null,
      });
    }
    case LAGRE_TILTAK_FEILET: {
      return Object.assign({}, state, {
        lagrer: false,
        sletter: false,
        lagret: false,
        lagringFeilet: true,
        slettingFeilet: false,
        feiletTiltakId: action.tiltak.tiltakId,
        tiltak: action.tiltak,
      });
    }
    case SLETTER_TILTAK: {
      return Object.assign({}, state, {
        sletter: true,
        slettingFeilet: false,
        slettet: false,
        feiletTiltakId: 0,
        tiltak: null,
      });
    }
    case TILTAK_SLETTET: {
      return Object.assign({}, state, {
        lagret: false,
        lagringFeilet: false,
        sletter: false,
        slettingFeilet: false,
        slettet: true,
        feiletTiltakId: 0,
        tiltak: null,
      });
    }
    case SLETT_TILTAK_FEILET: {
      return Object.assign({}, state, {
        sletter: false,
        slettingFeilet: true,
        lagringFeilet: false,
        feiletTiltakId: action.tiltakId,
        tiltak: null,
      });
    }
    case KOMMENTAR_LAGRET: {
      return Object.assign({}, state, {
        lagret: false,
      });
    }
    case KOMMENTAR_SLETTET: {
      return Object.assign({}, state, {
        lagret: false,
        tiltak: null,
      });
    }
    case LAGRER_KOMMENTAR:
    case SLETTER_KOMMENTAR: {
      return Object.assign({}, state, {
        lagringFeilet: false,
        slettingFeilet: false,
        feiletTiltakId: 0,
        tiltak: null,
      });
    }
    default:
      return state;
  }
};

export default tiltak;
