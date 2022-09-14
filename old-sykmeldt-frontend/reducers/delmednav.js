import * as actions from '../actions/oppfolgingsplan/delmednav_actions';

const initiellState = {
  sender: false,
  sendt: false,
  sendingFeilet: false,
  data: {},
};

const delermednav = (state = initiellState, action = {}) => {
  switch (action.type) {
    case actions.DELER_MED_NAV: {
      return Object.assign({}, state, {
        sender: true,
        sendt: false,
        sendingFeilet: false,
        data: {},
      });
    }
    case actions.DEL_MED_NAV_FEILET: {
      return Object.assign({}, state, {
        sender: false,
        sendingFeilet: true,
        data: {},
      });
    }
    case actions.DELT_MED_NAV: {
      return Object.assign({}, state, {
        sender: false,
        sendt: true,
        sendingFeilet: false,
        data: action.id,
      });
    }
    default:
      return state;
  }
};

export default delermednav;
