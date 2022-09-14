import {
  DELER_MED_FASTLEGE,
  DELT_MED_FASTLEGE,
  DEL_MED_FASTLEGE_FEILET,
} from '../actions/oppfolgingsplan/delMedFastlege_actions';

const initiellState = {
  sender: false,
  sendt: false,
  sendingFeilet: false,
  data: {},
};

const fastlegeDeling = (state = initiellState, action = {}) => {
  switch (action.type) {
    case DELER_MED_FASTLEGE: {
      return Object.assign({}, state, {
        sender: true,
        sendt: false,
        sendingFeilet: false,
        data: {},
      });
    }
    case DELT_MED_FASTLEGE: {
      return Object.assign({}, state, {
        sender: false,
        sendt: true,
        data: action.id,
      });
    }
    case DEL_MED_FASTLEGE_FEILET: {
      return Object.assign({}, state, {
        sender: false,
        sendingFeilet: true,
      });
    }
    default:
      return state;
  }
};

export default fastlegeDeling;
