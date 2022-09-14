import * as actions from '../actions/oppfolgingsplan/nullstillGodkjenning_actions';

const initiellState = {
  sender: false,
  sendt: false,
  sendingFeilet: false,
};

const nullstill = (state = initiellState, action = {}) => {
  switch (action.type) {
    case actions.NULLSTILLER_GODKJENNING: {
      return Object.assign({}, state, {
        sender: true,
        sendt: false,
        sendingFeilet: false,
      });
    }
    case actions.NULLSTILT_GODKJENNING: {
      return Object.assign({}, state, {
        sender: false,
        sendt: true,
        sendingFeilet: false,
      });
    }
    case actions.NULLSTILL_GODKJENNING_FEILET: {
      return Object.assign({}, state, {
        sender: false,
        sendingFeilet: true,
      });
    }
    default:
      return state;
  }
};

export default nullstill;
