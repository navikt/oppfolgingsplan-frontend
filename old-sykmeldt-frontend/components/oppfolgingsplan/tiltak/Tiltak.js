import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import getContextRoot from '@/common/utils/getContextRoot';
import { oppfolgingsplanPt, tiltakReducerPt } from '../../../propTypes/opproptypes';
import { STATUS_TILTAK } from '@/common/konstanter';
import { isEmpty } from '@/common/utils/oppfolgingsdialogUtils';
import { sorterTiltakEtterNyeste } from '@/common/utils/tiltakUtils';
import { capitalizeFirstLetter } from '@/common/utils/textUtils';
import OppfolgingsplanInfoboks from '../../app/OppfolgingsplanInfoboks';
import LeggTilElementKnapper from '../LeggTilElementKnapper';
import TiltakInfoboks from './TiltakInfoboks';
import TiltakSkjema from './TiltakSkjema';
import TiltakListe from './liste/TiltakListe';
import StegTittel from '../StegTittel';
import ObligatoriskeFelterInfotekst from '../ObligatoriskeFelterInfotekst';
import { scrollTo } from '@/common/utils/browserUtils';
import { TiltakOnboardingImage, VarseltrekantImage } from '@/common/images/imageComponents';

const texts = {
  tittel: 'Tiltak',
  updateError: 'En midlertidig feil gjør at vi ikke kan lagre endringene dine akkurat nå. Prøv igjen senere.',
  infoboks: {
    title: 'Hva kan gjøre det lettere å jobbe?',
    info:
      'Når dere har fått oversikt over arbeidsoppgavene dine, kan dere se på hva slags tilrettelegging det er mulig å tilby.',
  },
};

class Tiltak extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visTiltakSkjema: false,
      oppdatertTiltak: false,
      nyttTiltak: false,
      lagreNyTiltakFeilet: false,
      varselTekst: '',
      oppdaterTiltakFeilet: false,
    };
    this.sendLagreTiltak = this.sendLagreTiltak.bind(this);
    this.sendSlettTiltak = this.sendSlettTiltak.bind(this);
    this.sendLagreKommentar = this.sendLagreKommentar.bind(this);
    this.sendSlettKommentar = this.sendSlettKommentar.bind(this);
    this.toggleTiltakSkjema = this.toggleTiltakSkjema.bind(this);
    this.visOppdateringFeilet = this.visOppdateringFeilet.bind(this);
    this.skjulSkjema = this.skjulSkjema.bind(this);
    this.formRef = React.createRef();
  }

  UNSAFE_componentWillMount() {
    window.location.hash = 'tiltak';
    window.sessionStorage.setItem('hash', 'tiltak');
  }

  componentDidMount() {
    window.scrollTo(0, this.formRef.current.offsetTop);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (
      !nextProps.tiltak.feiletTiltakId &&
      nextProps.tiltak.lagringFeilet &&
      this.props.tiltak.lagringFeilet !== nextProps.tiltak.lagringFeilet
    ) {
      this.setState({
        lagreNyTiltakFeilet: true,
        visTiltakSkjema: true,
        varselTekst: texts.updateError,
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevState.visTiltakSkjema && this.state.visTiltakSkjema && this.lagreSkjema) {
      // eslint-disable-next-line react/no-find-dom-node
      const form = findDOMNode(this.lagreSkjema);
      scrollTo(form, 300);
    }
  }

  visOppdateringFeilet(feilet) {
    this.setState({
      oppdaterTiltakFeilet: feilet,
      lagreNyTiltakFeilet: false,
    });
  }

  sendLagreTiltak(values) {
    if (!values.tiltakId) {
      this.state.nyttTiltak = true;
      this.state.oppdatertTiltak = false;
    } else {
      this.state.nyttTiltak = false;
      this.state.oppdatertTiltak = true;
    }
    const nyeValues = {
      ...values,
      status: STATUS_TILTAK.FORSLAG,
      tiltaknavn: capitalizeFirstLetter(values.tiltaknavn),
    };
    this.props.lagreTiltak(this.props.oppfolgingsdialog.id, nyeValues);
    this.setState({
      visTiltakSkjema: false,
    });
  }

  sendSlettTiltak(tiltakId) {
    this.props.slettTiltak(this.props.oppfolgingsdialog.id, tiltakId);
    this.setState({
      sjekkLargingFeil: true,
    });
  }

  sendLagreKommentar(tiltakId, values) {
    this.props.lagreKommentar(this.props.oppfolgingsdialog.id, tiltakId, values);
  }

  sendSlettKommentar(tiltakId, kommentarId) {
    this.props.slettKommentar(this.props.oppfolgingsdialog.id, tiltakId, kommentarId);
  }

  toggleTiltakSkjema() {
    this.setState({
      visTiltakSkjema: !this.state.visTiltakSkjema,
    });
  }

  skjulSkjema() {
    this.setState({
      visTiltakSkjema: false,
      lagreNyTiltakFeilet: false,
    });
  }

  render() {
    const { oppfolgingsdialog, tiltak } = this.props;
    return (() => {
      return (
        <div>
          <StegTittel tittel={texts.tittel} />
          <ObligatoriskeFelterInfotekst />
          {isEmpty(oppfolgingsdialog.tiltakListe) ? (
            <div ref={this.formRef}>
              {!this.state.visTiltakSkjema ? (
                <OppfolgingsplanInfoboks
                  svgUrl={TiltakOnboardingImage}
                  svgAlt=""
                  tittel={texts.infoboks.title}
                  tekst={texts.infoboks.info}
                  feilType={this.state.feilType}
                  feilTekst={this.state.feilTekst}
                >
                  <LeggTilElementKnapper
                    visSkjema={this.state.visTiltakSkjema}
                    toggleSkjema={this.toggleTiltakSkjema}
                  />
                </OppfolgingsplanInfoboks>
              ) : (
                <div>
                  <TiltakInfoboks visTiltakSkjema={this.state.visTiltakSkjema} toggleSkjema={this.toggleTiltakSkjema} />
                  <TiltakSkjema
                    sendLagre={this.sendLagreTiltak}
                    avbryt={this.skjulSkjema}
                    fnr={oppfolgingsdialog.arbeidstaker.fnr}
                    varselTekst={this.state.varselTekst}
                    oppdateringFeilet={this.state.lagreNyTiltakFeilet}
                    tiltakReducer={tiltak}
                    rootUrlImg={getContextRoot()}
                  />
                </div>
              )}
            </div>
          ) : (
            <div ref={this.formRef}>
              <TiltakInfoboks visTiltakSkjema={this.state.visTiltakSkjema} toggleSkjema={this.toggleTiltakSkjema} />
              {this.state.visTiltakSkjema && (
                <TiltakSkjema
                  sendLagre={this.sendLagreTiltak}
                  avbryt={this.skjulSkjema}
                  fnr={oppfolgingsdialog.arbeidstaker.fnr}
                  ref={(lagreSkjema) => {
                    this.lagreSkjema = lagreSkjema;
                  }}
                  varselTekst={this.state.varselTekst}
                  oppdateringFeilet={this.state.lagreNyTiltakFeilet}
                  tiltakReducer={tiltak}
                  rootUrlImg={getContextRoot()}
                />
              )}
              <TiltakListe
                liste={sorterTiltakEtterNyeste(oppfolgingsdialog.tiltakListe)}
                urlImgVarsel={VarseltrekantImage}
                sendLagre={this.sendLagreTiltak}
                sendSlett={this.sendSlettTiltak}
                sendLagreKommentar={this.sendLagreKommentar}
                sendSlettKommentar={this.sendSlettKommentar}
                fnr={oppfolgingsdialog.arbeidstaker.fnr}
                visFeilMelding={this.visOppdateringFeilet}
                feilMelding={this.state.oppdaterTiltakFeilet}
                rootUrlImg={getContextRoot()}
              />
            </div>
          )}
        </div>
      );
    })();
  }
}

Tiltak.propTypes = {
  tiltak: tiltakReducerPt,
  oppfolgingsdialog: oppfolgingsplanPt,
  lagreTiltak: PropTypes.func,
  slettTiltak: PropTypes.func,
  lagreKommentar: PropTypes.func,
  slettKommentar: PropTypes.func,
};

export default Tiltak;
