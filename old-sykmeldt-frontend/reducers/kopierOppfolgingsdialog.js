import {
  KOPIERER_OPPFOLGINGSDIALOG,
  OPPFOLGINGSDIALOG_KOPIERT,
  KOPIER_OPPFOLGINGSDIALOG_FEILET,
} from '../actions/oppfolgingsplan/kopierOppfolgingsdialog_actions';

const initiellState = {
  sender: false,
  sendt: false,
  sendingFeilet: false,
  data: null,
};

const kopierOppfolgingsdialog = (state = initiellState, action = {}) => {
  switch (action.type) {
    case KOPIERER_OPPFOLGINGSDIALOG: {
      return Object.assign({}, state, {
        sender: true,
        sendt: false,
        sendingFeilet: false,
        data: null,
      });
    }
    case OPPFOLGINGSDIALOG_KOPIERT: {
      return Object.assign({}, state, {
        sender: false,
        sendt: true,
        sendingFeilet: false,
        data: action.id,
      });
    }
    case KOPIER_OPPFOLGINGSDIALOG_FEILET: {
      return Object.assign({}, state, {
        sender: false,
        sendt: false,
        sendingFeilet: true,
      });
    }
    default:
      return state;
  }
};

export default kopierOppfolgingsdialog;
