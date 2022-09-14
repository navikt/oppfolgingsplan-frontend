import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import getContextRoot from '@/common/utils/getContextRoot';
import history from '../../history';
import Side from '../../sider/Side';
import Feilmelding from '../Feilmelding';
import { populerPlanFraState } from '@/common/utils/stateUtils';
import {
  erOppfolgingsdialogKnyttetTilGyldigSykmelding,
  erOppfolgingsdialogTidligere,
  finnNyOppfolgingsplanMedVirkshomhetEtterAvbrutt,
  getOppfolgingsdialog,
} from '@/common/utils/oppfolgingsdialogUtils';
import Oppfolgingsdialog from './Oppfolgingsdialog';
import { hentArbeidsforhold } from '../../actions/oppfolgingsplan/arbeidsforhold_actions';
import { lagreArbeidsoppgave, slettArbeidsoppgave } from '../../actions/oppfolgingsplan/arbeidsoppgave_actions';
import { avbrytDialog, dialogAvbruttOgNyOpprettet } from '../../actions/oppfolgingsplan/avbrytdialog_actions';
import { delMedFastlege } from '../../actions/oppfolgingsplan/delMedFastlege_actions';
import { delMedNav as delMedNavFunc } from '../../actions/oppfolgingsplan/delmednav_actions';
import { hentKontaktinfo } from '../../actions/oppfolgingsplan/kontaktinfo_actions';
import { lagreKommentar, slettKommentar } from '../../actions/oppfolgingsplan/kommentar_actions';
import {
  avvisDialog,
  godkjennDialog,
  hentOppfolgingsdialoger,
} from '../../actions/oppfolgingsplan/oppfolgingsdialog_actions';
import { hentNaermesteLeder } from '../../actions/oppfolgingsplan/naermesteLeder_actions';
import { nullstillGodkjenning } from '../../actions/oppfolgingsplan/nullstillGodkjenning_actions';
import { hentPerson } from '../../actions/oppfolgingsplan/person_actions';
import { giSamtykke } from '../../actions/oppfolgingsplan/samtykke_actions';
import { settDialog } from '../../actions/oppfolgingsplan/sett_actions';
import { sjekkTilgang } from '../../actions/oppfolgingsplan/sjekkTilgang_actions';
import { lagreTiltak, slettTiltak } from '../../actions/oppfolgingsplan/tiltak_actions';
import { settAktivtSteg } from '../../actions/oppfolgingsplan/toggle_actions';
import { hentVirksomhet } from '../../actions/oppfolgingsplan/virksomhet_actions';
import { hentDineSykmeldinger } from '../../actions/dineSykmeldinger_actions';
import {
  henterEllerHarHentetOppfolgingsplaner,
  henterEllerHarHentetTilgang,
  oppfolgingsplanHarBlittAvbrutt,
} from '@/common/utils/reducerUtils';
import { brodsmule as brodsmulePt, dinesykmeldingerReducerPt } from '../../propTypes';
import * as oppfolgingsplanProptypes from '../../propTypes/opproptypes';
import OppfolgingsplanInfoboks from '../app/OppfolgingsplanInfoboks';
import { OppfolgingsdialogIkkeTilgangImage } from '@/common/images/imageComponents';
import AppSpinner from "@/common/spinner/AppSpinner";

const pageTitleArbeidsoppgaver = 'Oppfølgingsplan - Arbeidsoppgaver';
const pageTitleTiltak = 'Oppfølgingsplan - Tiltak';
const pageTitleSePlanen = 'Oppfølgingsplan - Se planen';
const pageTitleOppsummering = 'Oppfølgingsplan - Oppsummering';

const texts = {
  pageTitles: [pageTitleArbeidsoppgaver, pageTitleTiltak, pageTitleSePlanen],
  brodsmuler: {
    dittSykefravaer: 'Ditt sykefravær',
    dineOppfolgingsplaner: 'Dine oppfølgingsplaner',
    dinOppfolgingsplan: 'Oppfølgingsplan',
  },
  infoboksNotAvailable: {
    title: 'Du har ikke tilgang til oppfølgingsplanen',
  },
  infoboksNoAccess: {
    title: 'Du har ikke tilgang til oppfølgingsplanen',
    text:
      'Du er registrert med en adressesperre og har av sikkerhetsgrunner derfor ikke tilgang til oppfølgingsplanen digitalt.',
  },
};

export class Container extends Component {
  constructor(props) {
    super(props);
    const hashValue = window.sessionStorage.getItem('hash');
    if (hashValue === 'arbeidsoppgaver' && hashValue !== window.location.hash) {
      window.location.hash = hashValue;
      this.props.settAktivtSteg(1);
    }
    this.state = { currentPageTitle: pageTitleOppsummering };
  }

  UNSAFE_componentWillMount() {
    const { tilgang, oppfolgingsdialogerReducer } = this.props;
    if (!henterEllerHarHentetTilgang(tilgang)) {
      this.props.sjekkTilgang();
    }
    if (!henterEllerHarHentetOppfolgingsplaner(oppfolgingsdialogerReducer)) {
      this.props.hentOppfolgingsdialoger();
    }
    this.props.hentDineSykmeldinger();
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { oppfolgingsdialogerReducer, avbrytdialogReducer, dialogAvbruttOgNyOpprettetConnected } = this.props;
    if (oppfolgingsplanHarBlittAvbrutt(avbrytdialogReducer, nextProps.avbrytdialogReducer)) {
      this.props.hentOppfolgingsdialoger();
    }
    if (avbrytdialogReducer.sendt && oppfolgingsdialogerReducer.henter && nextProps.oppfolgingsdialogerReducer.hentet) {
      const nyOpprettetDialog = finnNyOppfolgingsplanMedVirkshomhetEtterAvbrutt(
        nextProps.oppfolgingsdialoger,
        nextProps.oppfolgingsdialog.virksomhet.virksomhetsnummer
      );
      if (nyOpprettetDialog) {
        dialogAvbruttOgNyOpprettetConnected(nyOpprettetDialog.id);
        history.push(`${getContextRoot()}/oppfolgingsplaner/${nyOpprettetDialog.id}`);
        window.location.hash = 'arbeidsoppgaver';
      }
    }
  }

  componentDidUpdate() {
    const navigasjonSteg = this.props.navigasjontoggles.steg;
    const utfyllingssideHashes = ['#arbeidsoppgaver', '#tiltak', '#godkjenn'];

    if (window.location.hash === '' && window.sessionStorage.getItem('hash')) {
      window.location.hash = window.sessionStorage.getItem('hash');
    }

    if (window.location.hash === '#arbeidsoppgaver' && navigasjonSteg !== 1) {
      this.props.settAktivtSteg(1);
    }

    if (window.location.hash === '#tiltak' && navigasjonSteg !== 2) {
      this.props.settAktivtSteg(2);
    }

    if (window.location.hash === '#godkjenn' && navigasjonSteg !== 3) {
      this.props.settAktivtSteg(3);
    }

    if (utfyllingssideHashes.includes(window.location.hash)) {
      const selectedPageTitle = texts.pageTitles[navigasjonSteg - 1];
      this.setPageTitle(selectedPageTitle);
    } else {
      this.setPageTitle(pageTitleOppsummering);
    }
  }

  setPageTitle(title) {
    if (this.state.currentPageTitle !== title) {
      this.setState({ currentPageTitle: title });
    }
  }

  render() {
    const {
      brodsmuler,
      henter,
      hentet,
      hentingFeilet,
      sender,
      sendingFeilet,
      tilgang,
      navigasjontoggles,
      erOppfolgingsdialogTilgjengelig,
    } = this.props;
    return (
      <Side
        tittel={this.state.currentPageTitle}
        brodsmuler={brodsmuler}
        laster={(henter || sender || !hentet) && !(sendingFeilet || hentingFeilet)}
      >
        {(() => {
          if (henter || sender) {
            return <AppSpinner />;
          } else if (hentingFeilet || sendingFeilet) {
            return <Feilmelding />;
          } else if (!erOppfolgingsdialogTilgjengelig) {
            return (
              <OppfolgingsplanInfoboks
                svgUrl={OppfolgingsdialogIkkeTilgangImage}
                svgAlt=""
                tittel={texts.infoboksNotAvailable.title}
              />
            );
          } else if (!tilgang.data.harTilgang) {
            return (
              <OppfolgingsplanInfoboks
                svgUrl={OppfolgingsdialogIkkeTilgangImage}
                svgAlt=""
                tittel={texts.infoboksNoAccess.title}
                tekst={texts.infoboksNoAccess.text}
              />
            );
          }
          return <Oppfolgingsdialog {...this.props} steg={navigasjontoggles.steg} />;
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
  avbrytdialogReducer: oppfolgingsplanProptypes.avbrytplanReducerPt,
  arbeidsforhold: oppfolgingsplanProptypes.arbeidsforholdReducerPt,
  arbeidsoppgaver: oppfolgingsplanProptypes.arbeidsoppgaverReducerPt,
  dineSykmeldinger: dinesykmeldingerReducerPt,
  navigasjontoggles: oppfolgingsplanProptypes.navigasjonstogglesReducerPt,
  naermesteleder: oppfolgingsplanProptypes.naermestelederReducerPt,
  oppfolgingsdialogerReducer: oppfolgingsplanProptypes.oppfolgingsplanerAtPt,
  person: oppfolgingsplanProptypes.personReducerPt,
  tilgang: oppfolgingsplanProptypes.tilgangReducerPt,
  tiltak: oppfolgingsplanProptypes.tiltakReducerPt,
  virksomhet: oppfolgingsplanProptypes.virksomhetReducerPt,
  oppfolgingsdialoger: PropTypes.arrayOf(oppfolgingsplanProptypes.oppfolgingsplanPt),
  oppfolgingsdialog: oppfolgingsplanProptypes.oppfolgingsplanPt,
  brodsmuler: PropTypes.arrayOf(brodsmulePt),
  erOppfolgingsdialogTilgjengelig: PropTypes.bool,
  lagreArbeidsoppgave: PropTypes.func,
  slettArbeidsoppgave: PropTypes.func,
  lagreTiltak: PropTypes.func,
  slettTiltak: PropTypes.func,
  hentOppfolgingsdialoger: PropTypes.func,
  lagreKommentar: PropTypes.func,
  slettKommentar: PropTypes.func,
  hentArbeidsforhold: PropTypes.func,
  sjekkTilgang: PropTypes.func,
  nullstillGodkjenning: PropTypes.func,
  delMedFastlege: PropTypes.func,
  delMedNav: PropTypes.func,
  godkjennDialog: PropTypes.func,
  avvisDialog: PropTypes.func,
  settAktivtSteg: PropTypes.func,
  avbrytDialog: PropTypes.func,
  dialogAvbruttOgNyOpprettetConnected: PropTypes.func,
  settDialog: PropTypes.func,
  hentDineSykmeldinger: PropTypes.func,
  hentVirksomhet: PropTypes.func,
  hentPerson: PropTypes.func,
  hentKontaktinfo: PropTypes.func,
  hentNaermesteLeder: PropTypes.func,
  alleInputFormer: PropTypes.objectOf(PropTypes.any),
};

export function mapStateToProps(state, ownProps) {
  const id = ownProps.params.oppfolgingsdialogId;
  let oppfolgingsdialog = getOppfolgingsdialog(state.oppfolgingsdialoger.data, id);
  oppfolgingsdialog = oppfolgingsdialog && populerPlanFraState(oppfolgingsdialog, state);
  const erOppfolgingsdialogTilgjengelig =
    oppfolgingsdialog &&
    (erOppfolgingsdialogTidligere(oppfolgingsdialog) ||
      erOppfolgingsdialogKnyttetTilGyldigSykmelding(oppfolgingsdialog, state.dineSykmeldinger.data));

  return {
    henter: state.oppfolgingsdialoger.henter || state.dineSykmeldinger.henter || state.tilgang.henter,
    hentingFeilet:
      state.oppfolgingsdialoger.hentingFeilet || state.dineSykmeldinger.hentingFeilet || state.tilgang.hentingFeilet,
    hentet:
      state.oppfolgingsdialoger.hentet ||
      state.dineSykmeldinger.hentet ||
      state.tilgang.hentet ||
      state.oppfolgingsdialoger.avviser ||
      state.oppfolgingsdialoger.godkjent ||
      state.avbrytdialogReducer.sendt ||
      state.nullstill.sendt,
    sender:
      state.oppfolgingsdialoger.avviser ||
      state.oppfolgingsdialoger.godkjenner ||
      state.avbrytdialogReducer.sender ||
      state.nullstill.sender ||
      state.samtykke.sender,
    sendingFeilet:
      state.oppfolgingsdialoger.avvisFeilet ||
      state.oppfolgingsdialoger.godkjenningFeilet ||
      state.avbrytdialogReducer.sendingFeilet ||
      state.nullstill.sendingFeilet ||
      state.samtykke.sendingFeilet,
    arbeidsforhold: state.arbeidsforhold,
    arbeidsoppgaver: state.arbeidsoppgaver,
    avbrytdialogReducer: state.avbrytdialogReducer,
    tiltak: state.tiltak,
    delmednav: state.delmednav,
    fastlegeDeling: state.fastlegeDeling,
    kontaktinfo: state.kontaktinfo,
    naermesteleder: state.naermesteleder,
    navigasjontoggles: state.navigasjontoggles,
    oppfolgingsdialogerReducer: state.oppfolgingsdialoger,
    person: state.person,
    dineSykmeldinger: state.dineSykmeldinger,
    tilgang: state.tilgang,
    oppfolgingsdialog,
    oppfolgingsdialoger: state.oppfolgingsdialoger.data,
    virksomhet: state.virksomhet,
    erOppfolgingsdialogTilgjengelig,
    brodsmuler: [
      {
        tittel: texts.brodsmuler.dittSykefravaer,
        sti: process.env.REACT_APP_SYKEFRAVAER_ROOT,
        erKlikkbar: true,
      },
      {
        tittel: texts.brodsmuler.dineOppfolgingsplaner,
        sti: '/oppfolgingsplaner',
        erKlikkbar: true,
      },
      {
        tittel: texts.brodsmuler.dinOppfolgingsplan,
      },
    ],
    alleInputFormer: state.form,
  };
}

export default connect(mapStateToProps, {
  lagreArbeidsoppgave,
  slettArbeidsoppgave,
  lagreTiltak,
  slettTiltak,
  lagreKommentar,
  slettKommentar,
  hentOppfolgingsdialoger,
  sjekkTilgang,
  godkjennDialog,
  avvisDialog,
  nullstillGodkjenning,
  settAktivtSteg,
  giSamtykke,
  settDialog,
  hentArbeidsforhold,
  avbrytDialog,
  dialogAvbruttOgNyOpprettetConnected: dialogAvbruttOgNyOpprettet,
  hentDineSykmeldinger,
  hentVirksomhet,
  hentPerson,
  hentKontaktinfo,
  hentNaermesteLeder,
  delMedFastlege,
  delMedNavFunc,
})(Container);
