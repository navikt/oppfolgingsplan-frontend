import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { kommentarReducerPt, tiltakPt, tiltakReducerPt } from '../../../../propTypes/opproptypes';
import TiltakSkjema from '../TiltakSkjema';
import TiltakListeRad from './TiltakListeRad';
import TiltakInformasjon from './TiltakInformasjon';
import TiltakVarselFeil from '../TiltakVarselFeil';

const texts = {
  updateError: 'En midlertidig feil gjør at vi ikke kan lagre endringene dine akkurat nå. Prøv igjen senere.',
};

const TiltakVarselFeilStyled = styled.div`
  padding: 0 1em;
`;

class Tiltak extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lagreKommentarSkjema: false,
      visLagreSkjema: false,
      visVurderingSkjema: false,
      visLagringFeilet: false,
      visSlettingFeilet: false,
      varselTekst: '',
    };
    this.visLagreSkjema = this.visLagreSkjema.bind(this);
    this.visElementInformasjon = this.visElementInformasjon.bind(this);
    this.visFeil = this.visFeil.bind(this);
    this.sendSlett = this.sendSlett.bind(this);
    this.sendLagre = this.sendLagre.bind(this);
    this.visLagreKommentarSkjema = this.visLagreKommentarSkjema.bind(this);
    this.skjulLagreKommentarSkjema = this.skjulLagreKommentarSkjema.bind(this);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (
      this.props.element.tiltakId === nextProps.kommentarReducer.tiltakId &&
      this.props.kommentarReducer.lagrer &&
      nextProps.kommentarReducer.lagret
    ) {
      this.skjulLagreKommentarSkjema();
    }
    if (this.props.element.tiltakId === nextProps.tiltakReducer.feiletTiltakId) {
      if (
        ((nextProps.tiltakReducer.lagringFeilet &&
          nextProps.tiltakReducer.lagringFeilet !== this.props.tiltakReducer.lagringFeilet) ||
          (nextProps.tiltakReducer.slettingFeilet &&
            nextProps.tiltakReducer.slettingFeilet !== this.props.tiltakReducer.slettingFeilet)) &&
        nextProps.tiltakReducer.feiletTiltakId > 0
      ) {
        if (nextProps.tiltakReducer.slettingFeilet) {
          this.visElementInformasjon();
          this.props.visFeilMelding(true);
          this.visFeil(false, true, texts.updateError);
        } else if (nextProps.tiltakReducer.lagringFeilet) {
          this.props.visFeilMelding(true);
          this.visFeil(true, false, texts.updateError);
          this.setState({
            lagreKommentarSkjema: false,
            visLagreSkjema: true,
          });
        } else if (!nextProps.tiltakReducer.lagringFeilet && !nextProps.tiltakReducer.slettingFeilet) {
          this.visFeil(false, false, '');
        }
      }
    } else if (!nextProps.tiltakReducer.lagringFeilet && !nextProps.tiltakReducer.slettingFeilet) {
      this.visFeil(false, false, '');
    }
  }

  visFeil(lagringFeilet, slettingFeilet, tekst) {
    this.setState({
      visLagringFeilet: lagringFeilet,
      visSlettingFeilet: slettingFeilet,
      varselTekst: tekst,
    });
  }

  visLagreSkjema(event) {
    event.stopPropagation();
    this.setState({
      lagreKommentarSkjema: false,
      visLagreSkjema: true,
    });
    this.props.visFeilMelding(false);
  }

  visElementInformasjon() {
    this.setState({
      lagreKommentarSkjema: false,
      visLagreSkjema: false,
    });
    this.props.visFeilMelding(false);
  }

  visLagreKommentarSkjema(event) {
    event.stopPropagation();
    this.setState({
      visLagreSkjema: false,
      lagreKommentarSkjema: true,
    });
  }

  skjulLagreKommentarSkjema() {
    this.setState({
      visInnhold: true,
      lagreKommentarSkjema: false,
    });
    this.props.visFeilMelding(false);
  }

  sendSlett(event, id) {
    event.stopPropagation();
    this.props.sendSlett(id);
  }

  sendLagre(nyeVerdier) {
    this.props.sendLagre(nyeVerdier);
    this.setState({
      visLagreSkjema: false,
    });
  }

  render() {
    const {
      element,
      fnr,
      sendSlettKommentar,
      sendLagreKommentar,
      kommentarReducer,
      tiltakReducer,
      feilMelding,
      visFeilMelding,
      rootUrlImg,
    } = this.props;
    return (() => {
      return (
        <article
          className="oppfolgingsdialogtabell__rad oppfolgingsdialogtabell__rad--element"
          aria-label={element.tiltaknavn}
        >
          <div className="oppfolgingsdialogtabell__radoverskrift">
            <TiltakListeRad
              tiltak={element}
              fnr={fnr}
              sendSlett={this.sendSlett}
              lagreSkjema={this.state.visLagreSkjema}
              visLagreSkjema={this.visLagreSkjema}
              lagreKommentarSkjema={this.state.lagreKommentarSkjema}
              visLagreKommentarSkjema={this.visLagreKommentarSkjema}
            />
          </div>
          {!this.state.visLagreSkjema && (
            <TiltakInformasjon
              element={element}
              fnr={fnr}
              lagreKommentarSkjema={this.state.lagreKommentarSkjema}
              skjulLagreKommentarSkjema={this.skjulLagreKommentarSkjema}
              sendLagreKommentar={sendLagreKommentar}
              sendSlettKommentar={sendSlettKommentar}
              oppdaterTiltakFeilet={this.state.visLagringFeilet}
              varselTekst={this.state.varselTekst}
              tiltakReducer={tiltakReducer}
              kommentarReducer={kommentarReducer}
              feilMelding={feilMelding}
              visFeilMelding={visFeilMelding}
              rootUrlImg={rootUrlImg}
            />
          )}
          {this.state.visLagreSkjema && (
            <TiltakSkjema
              sendLagre={this.sendLagre}
              tiltak={element}
              form={element.tiltakId.toString()}
              fnr={fnr}
              id={element.tiltakId}
              avbryt={this.visElementInformasjon}
              oppdateringFeilet={(this.state.visLagringFeilet || this.state.visSlettingFeilet) && feilMelding}
              varselTekst={this.state.varselTekst}
              visFeilMelding={visFeilMelding}
              tiltakReducer={tiltakReducer}
              rootUrlImg={rootUrlImg}
            />
          )}
          {this.state.visSlettingFeilet && feilMelding && (
            <TiltakVarselFeilStyled>
              <TiltakVarselFeil
                tekst={texts.updateError}
                onTransitionEnd={() => {
                  this.onTransitionEnd();
                }}
              />
            </TiltakVarselFeilStyled>
          )}
        </article>
      );
    })();
  }
}

Tiltak.propTypes = {
  element: tiltakPt,
  fnr: PropTypes.string,
  sendSlett: PropTypes.func,
  sendLagre: PropTypes.func,
  sendSlettKommentar: PropTypes.func,
  sendLagreKommentar: PropTypes.func,
  kommentarReducer: kommentarReducerPt,
  tiltakReducer: tiltakReducerPt,
  visFeilMelding: PropTypes.func,
  feilMelding: PropTypes.bool,
  rootUrlImg: PropTypes.string,
};

Tiltak.defaultProps = {
  Overskrift: 'H3',
};

export const mapStateToProps = (state) => {
  return {
    kommentarReducer: state.kommentar,
    tiltakReducer: state.tiltak,
  };
};

const TiltakContainer = connect(mapStateToProps, null, null, { pure: false })(Tiltak);

export default TiltakContainer;
