import * as actions from '../actions/oppfolgingsplan/samtykke_actions';

const initiellState = {
  sender: false,
  sendingFeilet: false,
};

const samtykke = (state = initiellState, action = {}) => {
  switch (action.type) {
    case actions.GIR_SAMTYKKE: {
      return Object.assign({}, state, {
        sender: true,
        sendingFeilet: false,
      });
    }
    case actions.SAMTYKKE_GITT: {
      return Object.assign({}, state, {
        sender: false,
        sendingFeilet: false,
      });
    }
    case actions.GITT_SAMTYKKE_FEILET: {
      return Object.assign({}, state, {
        sender: false,
        sendingFeilet: true,
      });
    }
    default:
      return state;
  }
};

export default samtykke;
