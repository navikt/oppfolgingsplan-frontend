import { BEKREFT_NY_NAERMESTELEDER } from "../actions/oppfolgingsplan/nyNaermesteleder_actions";

const initiellState = {
  bekreftet: false,
};

const nyNaermesteLeder = (state = initiellState, action = {}) => {
  switch (action.type) {
    case BEKREFT_NY_NAERMESTELEDER: {
      return Object.assign({}, state, {
        bekreftet: true,
      });
    }
    default:
      return state;
  }
};

export default nyNaermesteLeder;
