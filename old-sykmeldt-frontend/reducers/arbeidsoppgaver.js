import * as actions from '../actions/oppfolgingsplan/arbeidsoppgave_actions';
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
  feiletOppgaveId: 0,
  arbeidsoppgave: null,
};

const arbeidsoppgaver = (state = initiellState, action = {}) => {
  switch (action.type) {
    case SETT_AKTIVT_STEG: {
      return Object.assign({}, state, {
        feiletTiltakId: 0,
        lagringFeilet: false,
        slettingFeilet: false,
        arbeidsoppgave: null,
      });
    }
    case actions.LAGRER_ARBEIDSOPPGAVE: {
      return Object.assign({}, state, {
        lagrer: true,
        lagret: false,
        lagringFeilet: false,
        slettingFeilet: false,
        arbeidsoppgave: null,
      });
    }
    case actions.ARBEIDSOPPGAVE_LAGRET: {
      return Object.assign({}, state, {
        lagrer: false,
        lagret: true,
        lagringFeilet: false,
        feiletOppgaveId: 0,
        arbeidsoppgave: null,
      });
    }
    case actions.LAGRE_ARBEIDSOPPGAVE_FEILET: {
      return Object.assign({}, state, {
        lagrer: false,
        lagret: false,
        lagringFeilet: true,
        slettingFeilet: false,
        feiletOppgaveId: action.arbeidsoppgave.arbeidsoppgaveId,
        arbeidsoppgave: action.arbeidsoppgave,
      });
    }
    case actions.SLETTER_ARBEIDSOPPGAVE: {
      return Object.assign({}, state, {
        sletter: true,
        slettingFeilet: false,
        slettet: false,
        lagringFeilet: false,
        arbeidsoppgave: null,
      });
    }
    case actions.ARBEIDSOPPGAVE_SLETTET: {
      return Object.assign({}, state, {
        lagret: false,
        lagringFeilet: false,
        sletter: false,
        slettingFeilet: false,
        slettet: true,
        arbeidsoppgave: null,
      });
    }
    case actions.SLETT_ARBEIDSOPPGAVE_FEILET: {
      return Object.assign({}, state, {
        sletter: false,
        slettingFeilet: true,
        lagringFeilet: false,
        feiletOppgaveId: action.arbeidsoppgaveId,
        arbeidsoppgave: null,
      });
    }
    default:
      return state;
  }
};

export default arbeidsoppgaver;
