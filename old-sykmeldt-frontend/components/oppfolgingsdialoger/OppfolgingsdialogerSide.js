import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as oppfolgingsplanProptypes from '../../propTypes/opproptypes';
import { populerPlanFraState } from '@/common/utils/stateUtils';
import { kopierOppfolgingsdialog } from '../../actions/oppfolgingsplan/kopierOppfolgingsdialog_actions';
import { hentOppfolgingsdialoger, opprettOppfolgingsdialog } from '../../actions/oppfolgingsplan/oppfolgingsdialog_actions';
import { hentNaermesteLeder } from '../../actions/oppfolgingsplan/naermesteLeder_actions';
import { bekreftNyNaermesteLeder } from '../../actions/oppfolgingsplan/nyNaermesteleder_actions';
import { hentPerson } from '../../actions/oppfolgingsplan/person_actions';
import { sjekkTilgang } from '../../actions/oppfolgingsplan/sjekkTilgang_actions';
import { hentVirksomhet } from '../../actions/oppfolgingsplan/virksomhet_actions';
import getContextRoot from '@/common/utils/getContextRoot';
import Side from '../../sider/Side';
import Feilmelding from '../Feilmelding';
import history from '../../history';
import { brodsmule as brodsmulePt, dinesykmeldingerReducerPt, ledereReducerPt } from '../../propTypes';
import {
  henterEllerHarHentetOppfolgingsplaner,
  henterEllerHarHentetTilgang,
  oppfolgingsplanHarBlittOpprettet,
} from '@/common/utils/reducerUtils';
import { hentDineSykmeldinger } from '../../actions/dineSykmeldinger_actions';
import { hentLedere } from '../../actions/ledere_actions';
import Oppfolgingsdialoger from './Oppfolgingsdialoger';
import OppfolgingsplanInfoboks from '../app/OppfolgingsplanInfoboks';
import { OppfolgingsdialogIkkeTilgangImage } from '@/common/images/imageComponents';
import AppSpinner from "@/common/spinner/AppSpinner";

const texts = {
  pageTitle: 'Oppfølgingsplaner - Oversikt',
  brodsmuler: {
    dittSykefravaer: 'Ditt sykefravær',
    dineOppfolgingsplaner: 'Dine oppfølgingsplaner',
  },
  infoboksNoAccess: {
    title: 'Du har ikke tilgang til oppfølgingsplanen',
    info:
      'Du er registrert med en adressesperre og har av sikkerhetsgrunner derfor ikke tilgang til oppfølgingsplanen digitalt.',
  },
};

export class Container extends Component {
  UNSAFE_componentWillMount() {
    const { tilgang, oppfolgingsdialogerReducer } = this.props;
    if (!henterEllerHarHentetTilgang(tilgang)) {
      this.props.sjekkTilgang();
    }
    this.props.hentDineSykmeldinger();
    if (!henterEllerHarHentetOppfolgingsplaner(oppfolgingsdialogerReducer)) {
      this.props.hentOppfolgingsdialoger();
    }
    window.sessionStorage.setItem('hash', 'arbeidsoppgaver');
    window.sessionStorage.removeItem('startdato');
    window.sessionStorage.removeItem('sluttdato');
    window.sessionStorage.removeItem('evalueringsdato');
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { kopierDialogReducer, oppfolgingsdialogerReducer } = this.props;
    if (oppfolgingsplanHarBlittOpprettet(oppfolgingsdialogerReducer, nextProps.oppfolgingsdialogerReducer)) {
      window.sessionStorage.setItem('hash', 'arbeidsoppgaver');
      this.props.hentOppfolgingsdialoger();
    }
    if (kopierDialogReducer.sender && nextProps.kopierDialogReducer.sendt) {
      window.sessionStorage.setItem('hash', 'arbeidsoppgaver');
      this.props.hentOppfolgingsdialoger();
    }
    if (
      oppfolgingsdialogerReducer.opprettet &&
      !oppfolgingsdialogerReducer.hentet &&
      nextProps.oppfolgingsdialogerReducer.hentet
    ) {
      history.push(`${getContextRoot()}/oppfolgingsplaner/${nextProps.oppfolgingsdialogerReducer.opprettetId}`);
    }
    if (
      kopierDialogReducer.sendt &&
      !oppfolgingsdialogerReducer.hentet &&
      nextProps.oppfolgingsdialogerReducer.hentet
    ) {
      history.push(`${getContextRoot()}/oppfolgingsplaner/${nextProps.kopierDialogReducer.data}`);
    }
  }

  render() {
    const { brodsmuler, henter, hentingFeilet, tilgang, hentet, sender, sendingFeilet } = this.props;
    return (
      <Side
        tittel={texts.pageTitle}
        brodsmuler={brodsmuler}
        laster={(henter || sender || !hentet) && !(sendingFeilet || hentingFeilet)}
      >
        {(() => {
          if (henter || sender) {
            return <AppSpinner />;
          } else if (hentingFeilet || sendingFeilet) {
            return <Feilmelding />;
          } else if (!tilgang.data.harTilgang) {
            return (
              <OppfolgingsplanInfoboks
                svgUrl={OppfolgingsdialogIkkeTilgangImage}
                svgAlt=""
                tittel={texts.infoboksNoAccess.title}
                tekst={texts.infoboksNoAccess.info}
              />
            );
          }
          return <Oppfolgingsdialoger {...this.props} />;
        })()}
      </Side>
    );
  }
}

Container.propTypes = {
  henter: PropTypes.bool,
  hentingFeilet: PropTypes.bool,
  hentet: PropTypes.bool,
  sender: PropTypes.bool,
  sendingFeilet: PropTypes.bool,
  dinesykmeldinger: dinesykmeldingerReducerPt,
  naermesteLedere: ledereReducerPt,
  kopierDialogReducer: oppfolgingsplanProptypes.kopierPlanReducerPt,
  oppfolgingsdialogerReducer: oppfolgingsplanProptypes.oppfolgingsplanerAtPt,
  person: oppfolgingsplanProptypes.personReducerPt,
  naermesteleder: oppfolgingsplanProptypes.naermestelederReducerPt,
  tilgang: oppfolgingsplanProptypes.tilgangReducerPt,
  virksomhet: oppfolgingsplanProptypes.virksomhetReducerPt,
  bekreftetNyNaermesteLeder: PropTypes.bool,
  oppfolgingsdialoger: PropTypes.arrayOf(oppfolgingsplanProptypes.oppfolgingsplanPt),
  brodsmuler: PropTypes.arrayOf(brodsmulePt),
  bekreftNyNaermesteLeder: PropTypes.func,
  hentDineSykmeldinger: PropTypes.func,
  hentLedere: PropTypes.func,
  hentNaermesteLeder: PropTypes.func,
  hentOppfolgingsdialoger: PropTypes.func,
  hentPerson: PropTypes.func,
  hentVirksomhet: PropTypes.func,
  kopierOppfolgingsdialog: PropTypes.func,
  opprettOppfolgingsdialog: PropTypes.func,
  sjekkTilgang: PropTypes.func,
};

export const mapStateToProps = (state) => {
  const oppfolgingsdialoger = state.oppfolgingsdialoger.data.map((oppfolgingsdialog) => {
    return populerPlanFraState(oppfolgingsdialog, state);
  });
  return {
    henter:
      state.oppfolgingsdialoger.henter || state.tilgang.henter || state.dineSykmeldinger.henter || state.ledere.henter,
    hentingFeilet:
      state.oppfolgingsdialoger.hentingFeilet ||
      state.tilgang.hentingFeilet ||
      state.dineSykmeldinger.hentingFeilet ||
      state.ledere.hentingFeilet,
    hentet:
      state.tilgang.hentet ||
      state.dineSykmeldinger.hentet ||
      state.ledere.hentet ||
      state.oppfolgingsdialoger.hentet ||
      state.oppfolgingsdialoger.opprettet,
    sender: state.oppfolgingsdialoger.oppretter || state.kopierDialogReducer.sender,
    sendingFeilet: state.oppfolgingsdialoger.hentingFeilet || state.kopierDialogReducer.sendingFeilet,
    dinesykmeldinger: state.dineSykmeldinger,
    naermesteleder: state.naermesteleder,
    kopierDialogReducer: state.kopierDialogReducer,
    naermesteLedere: state.ledere,
    oppfolgingsdialogerReducer: state.oppfolgingsdialoger,
    person: state.person,
    tilgang: state.tilgang,
    virksomhet: state.virksomhet,
    bekreftetNyNaermesteLeder: state.nyNaermesteLeder.bekreftet,
    oppfolgingsdialoger,
    brodsmuler: [
      {
        tittel: texts.brodsmuler.dittSykefravaer,
        sti: process.env.REACT_APP_SYKEFRAVAER_ROOT,
        erKlikkbar: true,
      },
      {
        tittel: texts.brodsmuler.dineOppfolgingsplaner,
        sti: '/oppfolgingsplaner',
      },
    ],
  };
};

export default connect(mapStateToProps, {
  hentOppfolgingsdialoger,
  sjekkTilgang,
  bekreftNyNaermesteLeder,
  hentDineSykmeldinger,
  hentLedere,
  hentVirksomhet,
  hentPerson,
  hentNaermesteLeder,
  kopierOppfolgingsdialog,
  opprettOppfolgingsdialog,
})(Container);
