import * as actiontyper from '../actions/actiontyper';
import { toDate } from '../../common/utils/datoUtils';

const initiellState = {
  henter: false,
  hentingFeilet: false,
  hentet: false,
  data: [],
};

export const parseSykmelding = (sykmelding) => {
  return Object.assign({}, sykmelding, {
    sykmeldingsperioder: sykmelding.sykmeldingsperioder.map((p) => {
      return {
        fom: toDate(p.fom),
        tom: toDate(p.tom),
      };
    }),
  });
};

const dineSykmeldinger = (state = initiellState, action = {}) => {
  switch (action.type) {
    case actiontyper.SET_DINE_SYKMELDINGER: {
      if (!state.data || state.data.length === 0) {
        return {
          data: action.sykmeldinger.map((s) => {
            return parseSykmelding(s);
          }),
          henter: false,
          hentingFeilet: false,
          hentet: true,
        };
      }
      return {
        data: state.data.map((gammelSykmelding) => {
          const nySykmelding = action.sykmeldinger.filter((sykmld) => {
            return sykmld.id === gammelSykmelding.id;
          })[0];
          return {
            ...gammelSykmelding,
            ...parseSykmelding(nySykmelding),
          };
        }),
        henter: false,
        hentingFeilet: false,
        hentet: true,
      };
    }
    case actiontyper.HENTER_DINE_SYKMELDINGER: {
      return {
        data: state.data,
        henter: true,
        hentingFeilet: false,
        hentet: false,
      };
    }
    case actiontyper.HENT_DINE_SYKMELDINGER_FEILET: {
      return {
        data: [],
        henter: false,
        hentingFeilet: true,
        hentet: true,
      };
    }
    default: {
      return state;
    }
  }
};

export default dineSykmeldinger;
