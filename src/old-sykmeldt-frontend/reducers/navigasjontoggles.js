import { SETT_AKTIVT_STEG } from '../actions/oppfolgingsplan/toggle_actions';

const initiellState = {
  steg: 1,
};

const navigasjontoggles = (state = initiellState, action = {}) => {
  switch (action.type) {
    case SETT_AKTIVT_STEG: {
      return Object.assign({}, state, {
        steg: action.steg,
      });
    }
    default:
      return state;
  }
};

export default navigasjontoggles;
