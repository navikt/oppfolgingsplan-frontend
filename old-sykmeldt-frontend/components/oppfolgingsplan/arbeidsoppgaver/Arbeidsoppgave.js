import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { arbeidsoppgavePt, arbeidsoppgaverReducerPt } from '../../../propTypes/opproptypes';
import ArbeidsoppgaveInformasjon from './ArbeidsoppgaveInformasjon';
import ArbeidsoppgaveOverskrift from './ArbeidsoppgaveOverskrift';
import LagreArbeidsoppgaveSkjema from './LagreArbeidsoppgaveSkjema';
import ArbeidsoppgaveVarselFeil from './ArbeidsoppgaveVarselFeil';

const texts = {
  updateError: 'En midlertidig feil gjør at vi ikke kan lagre endringene dine akkurat nå. Prøv igjen senere.',
};

const ArbeidsoppgaveVarselFeilStyled = styled.div`
  padding: 0 1em;
`;

class Arbeidsoppgave extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visLagreSkjema: false,
      visLagringFeilet: false,
      visSlettingFeilet: false,
      varselTekst: '',
    };
    this.visLagreSkjema = this.visLagreSkjema.bind(this);
    this.visElementInformasjon = this.visElementInformasjon.bind(this);
    this.visFeil = this.visFeil.bind(this);
    this.sendSlett = this.sendSlett.bind(this);
    this.sendLagre = this.sendLagre.bind(this);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.element.arbeidsoppgaveId === nextProps.arbeidsoppgaverReducer.feiletOppgaveId) {
      if (
        ((nextProps.arbeidsoppgaverReducer.lagringFeilet &&
          nextProps.arbeidsoppgaverReducer.lagringFeilet !== this.props.arbeidsoppgaverReducer.lagringFeilet) ||
          (nextProps.arbeidsoppgaverReducer.slettingFeilet &&
            nextProps.arbeidsoppgaverReducer.slettingFeilet !== this.props.arbeidsoppgaverReducer.slettingFeilet)) &&
        nextProps.arbeidsoppgaverReducer.feiletOppgaveId > 0
      ) {
        if (nextProps.arbeidsoppgaverReducer.slettingFeilet) {
          this.props.visFeilMelding(true);
          this.visFeil(false, true, texts.updateError);
        } else if (nextProps.arbeidsoppgaverReducer.lagringFeilet) {
          this.props.visFeilMelding(true);
          this.visFeil(true, false, texts.updateError);
          this.setState({
            visLagreSkjema: true,
          });
        } else if (
          !nextProps.arbeidsoppgaverReducer.lagringFeilet &&
          !nextProps.arbeidsoppgaverReducer.slettingFeilet
        ) {
          this.visFeil(false, false, '');
        }
      } else if (!nextProps.arbeidsoppgaverReducer.lagringFeilet && !nextProps.arbeidsoppgaverReducer.slettingFeilet) {
        this.visFeil(false, false, '');
      }
    } else if (!nextProps.arbeidsoppgaverReducer.lagringFeilet && !nextProps.arbeidsoppgaverReducer.slettingFeilet) {
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
      visLagreSkjema: true,
    });
    this.props.visFeilMelding(false);
  }

  visElementInformasjon() {
    this.setState({
      visLagreSkjema: false,
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
    const { element, fnr, arbeidsoppgaverReducer, feilMelding } = this.props;
    return (() => {
      return (
        <article
          className="arbeidsoppgaverListe__rad arbeidsoppgaverListe__rad--element"
          aria-label={element.arbeidsoppgavenavn}
        >
          <div>
            <div className="arbeidsoppgaverListe__radoverskrift">
              <ArbeidsoppgaveOverskrift
                fnr={fnr}
                arbeidsoppgave={element}
                lagreSkjema={this.state.visLagreSkjema}
                visLagreSkjema={this.visLagreSkjema}
                sendSlett={this.sendSlett}
              />
            </div>
            {!this.state.visLagreSkjema && <ArbeidsoppgaveInformasjon element={element} />}
            {this.state.visLagreSkjema && (
              <LagreArbeidsoppgaveSkjema
                sendLagre={this.sendLagre}
                arbeidsoppgave={element}
                form={element.arbeidsoppgaveId.toString()}
                avbryt={this.visElementInformasjon}
                oppdateringFeilet={this.state.visLagringFeilet && feilMelding}
                varselTekst={this.state.varselTekst}
                arbeidsoppgaverReducer={arbeidsoppgaverReducer}
              />
            )}
          </div>

          {this.state.visSlettingFeilet && feilMelding && (
            <ArbeidsoppgaveVarselFeilStyled>
              <ArbeidsoppgaveVarselFeil tekst={texts.updateError} />
            </ArbeidsoppgaveVarselFeilStyled>
          )}
        </article>
      );
    })();
  }
}

Arbeidsoppgave.propTypes = {
  element: arbeidsoppgavePt,
  fnr: PropTypes.string,
  sendSlett: PropTypes.func,
  sendLagre: PropTypes.func,
  rootUrlImg: PropTypes.string,
  visFeilMelding: PropTypes.func,
  feilMelding: PropTypes.bool,
  arbeidsoppgaverReducer: arbeidsoppgaverReducerPt,
};

Arbeidsoppgave.defaultProps = {
  Overskrift: 'H3',
};

export const mapStateToProps = (state) => {
  return {
    arbeidsoppgaverReducer: state.arbeidsoppgaver,
  };
};

const ArbeidsoppgaveContainer = connect(mapStateToProps, null, null, { pure: false })(Arbeidsoppgave);

export default ArbeidsoppgaveContainer;
