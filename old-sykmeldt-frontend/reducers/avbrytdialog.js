import * as actions from '../actions/oppfolgingsplan/avbrytdialog_actions';

const initiellState = {
  sender: false,
  sendt: false,
  sendingFeilet: false,
  nyPlanId: null,
  data: null,
};

const avbrytdialog = (state = initiellState, action = {}) => {
  switch (action.type) {
    case actions.AVBRYTER_DIALOG: {
      return Object.assign({}, state, {
        sender: true,
        sendt: false,
        sendingFeilet: false,
        data: null,
      });
    }
    case actions.AVBRYT_DIALOG_FEILET: {
      return Object.assign({}, state, {
        sender: false,
        sendt: false,
        sendingFeilet: true,
      });
    }
    case actions.DIALOG_AVBRUTT: {
      return Object.assign({}, state, {
        sender: false,
        sendt: true,
        sendingFeilet: false,
        data: action.id,
      });
    }
    case actions.DIALOG_AVBRUTT_OG_NY_OPPRETTET: {
      return Object.assign({}, state, {
        sender: false,
        sendt: true,
        sendingFeilet: false,
        nyPlanId: action.nyPlanId,
      });
    }
    default:
      return state;
  }
};

export default avbrytdialog;
