import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import { arbeidsoppgaverReducerPt, oppfolgingsplanPt } from '../../../propTypes/opproptypes';
import getContextRoot from '@/common/utils/getContextRoot';
import { capitalizeFirstLetter } from '@/common/utils/textUtils';
import { isEmpty } from '@/common/utils/oppfolgingsdialogUtils';
import { sorterArbeidsoppgaverEtterOpprettet } from '@/common/utils/arbeidsoppgaveUtils';
import OppfolgingsplanInfoboks from '../../app/OppfolgingsplanInfoboks';
import ArbeidsoppgaverInfoboks from './ArbeidsoppgaverInfoboks';
import NotifikasjonBoksVurderingOppgave from './NotifikasjonBoksVurderingOppgave';
import LeggTilElementKnapper from '../LeggTilElementKnapper';
import LagreArbeidsoppgaveSkjema from './LagreArbeidsoppgaveSkjema';
import ArbeidsoppgaverListe from './ArbeidsoppgaverListe';
import StegTittel from '../StegTittel';
import ObligatoriskeFelterInfotekst from '../ObligatoriskeFelterInfotekst';
import { scrollTo } from '@/common/utils/browserUtils';
import { ArbeidsoppgaveOnboardingImage } from '@/common/images/imageComponents';

const texts = {
  tittel: 'Arbeidsoppgaver',
  updateError: 'En midlertidig feil gjør at vi ikke kan lagre endringene dine akkurat nå. Prøv igjen senere.',
  infoboks: {
    title: 'Hva er oppgavene dine på denne arbeidsplassen?',
    info: `
            Du starter med å lage en oversikt over arbeidsoppgavene dine. 
            Samtidig tar du stilling til om du kan gjøre noen av dem mens du er sykmeldt.
        `,
  },
  arbeidsoppgaverInfoboksStilling: {
    title: 'Legg til arbeidsoppgaver',
  },
};

const textStilling = (stilling) => {
  return `Du jobber hos denne arbeidsgiveren som ${stilling.yrke.toLowerCase()} ${stilling.prosent} %`;
};

export const ArbeidsoppgaverInfoboksStilling = ({
  oppfolgingsplan,
  visArbeidsoppgaveSkjema,
  toggleArbeidsoppgaveSkjema,
}) => {
  return (
    <ArbeidsoppgaverInfoboks
      tittel={texts.arbeidsoppgaverInfoboksStilling.title}
      visSkjema={visArbeidsoppgaveSkjema}
      toggleSkjema={toggleArbeidsoppgaveSkjema}
    >
      {oppfolgingsplan.arbeidstaker.stillinger.length > 0 && (
        <div>
          {oppfolgingsplan.arbeidstaker.stillinger.map((stilling, idx) => {
            return <p key={idx}>{textStilling(stilling)}</p>;
          })}
        </div>
      )}
    </ArbeidsoppgaverInfoboks>
  );
};

ArbeidsoppgaverInfoboksStilling.propTypes = {
  oppfolgingsplan: oppfolgingsplanPt,
  visArbeidsoppgaveSkjema: PropTypes.bool,
  toggleArbeidsoppgaveSkjema: PropTypes.func,
};

class Arbeidsoppgaver extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nyArbeidsoppgave: false,
      oppdatertArbeidsoppgave: false,
      visArbeidsoppgaveSkjema: false,
      lagreNyOppgaveFeilet: false,
      varselTekst: '',
      oppdaterOppgaveFeilet: false,
    };
    this.sendLagreArbeidsoppgave = this.sendLagreArbeidsoppgave.bind(this);
    this.sendSlettArbeidsoppgave = this.sendSlettArbeidsoppgave.bind(this);
    this.toggleArbeidsoppgaveSkjema = this.toggleArbeidsoppgaveSkjema.bind(this);
    this.scrollToForm = this.scrollToForm.bind(this);
    this.visFeilMelding = this.visFeilMelding.bind(this);
    this.skjulSkjema = this.skjulSkjema.bind(this);
    this.formRef = React.createRef();
  }

  UNSAFE_componentWillMount() {
    window.location.hash = 'arbeidsoppgaver';
    window.sessionStorage.setItem('hash', 'arbeidsoppgaver');
  }

  componentDidMount() {
    if (this.state.visArbeidsoppgaveSkjema && this.lagreSkjema) {
      this.scrollToForm();
    } else {
      window.scrollTo(0, this.formRef.current.offsetTop);
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (
      !nextProps.arbeidsoppgaver.feiletOppgaveId &&
      nextProps.arbeidsoppgaver.lagringFeilet &&
      this.props.arbeidsoppgaver.lagringFeilet !== nextProps.arbeidsoppgaver.lagringFeilet
    ) {
      this.setState({
        lagreNyOppgaveFeilet: true,
        visArbeidsoppgaveSkjema: true,
        varselTekst: texts.updateError,
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevState.visArbeidsoppgaveSkjema && this.state.visArbeidsoppgaveSkjema && this.lagreSkjema) {
      this.scrollToForm();
    }
  }

  visFeilMelding(feilet) {
    this.setState({
      oppdaterOppgaveFeilet: feilet,
      lagreNyOppgaveFeilet: false,
    });
  }

  sendLagreArbeidsoppgave(values) {
    if (!values.arbeidsoppgaveId) {
      this.state.nyArbeidsoppgave = true;
      this.state.oppdatertArbeidsoppgave = false;
    } else {
      this.state.nyArbeidsoppgave = false;
      this.state.oppdatertArbeidsoppgave = true;
    }
    const nyeValues = {
      ...values,
      arbeidsoppgavenavn: capitalizeFirstLetter(values.arbeidsoppgavenavn),
    };
    this.props.lagreArbeidsoppgave(
      this.props.oppfolgingsdialog.id,
      nyeValues,
      this.props.oppfolgingsdialog.arbeidstaker.fnr
    );
    this.setState({
      visArbeidsoppgaveSkjema: false,
    });
  }

  sendSlettArbeidsoppgave(arbeidsoppgaveId) {
    this.props.slettArbeidsoppgave(this.props.oppfolgingsdialog.id, arbeidsoppgaveId);
  }

  toggleArbeidsoppgaveSkjema() {
    this.setState({
      visArbeidsoppgaveSkjema: !this.state.visArbeidsoppgaveSkjema,
    });
  }

  scrollToForm() {
    // eslint-disable-next-line react/no-find-dom-node
    const form = findDOMNode(this.lagreSkjema);
    scrollTo(form, 300);
  }

  skjulSkjema() {
    this.setState({
      visArbeidsoppgaveSkjema: false,
      lagreNyOppgaveFeilet: false,
    });
  }

  render() {
    const { oppfolgingsdialog, arbeidsoppgaver } = this.props;
    const antallIkkeVurdererteArbOppgaver = oppfolgingsdialog.arbeidsoppgaveListe.filter((arbeidsoppgave) => {
      return !arbeidsoppgave.gjennomfoering;
    }).length;
    return (() => {
      return (
        <div>
          <StegTittel tittel={texts.tittel} />
          <ObligatoriskeFelterInfotekst />
          {isEmpty(oppfolgingsdialog.arbeidsoppgaveListe) ? (
            <div ref={this.formRef}>
              {this.state.visArbeidsoppgaveSkjema && (
                <ArbeidsoppgaverInfoboksStilling
                  oppfolgingsplan={oppfolgingsdialog}
                  visArbeidsoppgaveSkjema={this.state.visArbeidsoppgaveSkjema}
                  toggleArbeidsoppgaveSkjema={this.toggleArbeidsoppgaveSkjema}
                />
              )}
              {!this.state.visArbeidsoppgaveSkjema ? (
                <OppfolgingsplanInfoboks
                  svgUrl={ArbeidsoppgaveOnboardingImage}
                  svgAlt=""
                  tittel={texts.infoboks.title}
                  tekst={texts.infoboks.info}
                >
                  <LeggTilElementKnapper
                    visSkjema={this.state.visArbeidsoppgaveSkjema}
                    toggleSkjema={this.toggleArbeidsoppgaveSkjema}
                  />
                </OppfolgingsplanInfoboks>
              ) : (
                <LagreArbeidsoppgaveSkjema
                  varselTekst={this.state.varselTekst}
                  oppdateringFeilet={this.state.lagreNyOppgaveFeilet}
                  sendLagre={this.sendLagreArbeidsoppgave}
                  avbryt={this.skjulSkjema}
                  arbeidsoppgaverReducer={arbeidsoppgaver}
                  rootUrlImg={getContextRoot()}
                />
              )}
            </div>
          ) : (
            <div ref={this.formRef}>
              {antallIkkeVurdererteArbOppgaver > 0 && (
                <NotifikasjonBoksVurderingOppgave
                  antallIkkeVurderte={antallIkkeVurdererteArbOppgaver}
                  rootUrl={getContextRoot()}
                  tekst="oppfolgingsdialog.notifikasjonBoksVurderingOppgave.arbeidstaker.tekst"
                />
              )}
              <ArbeidsoppgaverInfoboksStilling
                oppfolgingsplan={oppfolgingsdialog}
                visArbeidsoppgaveSkjema={this.state.visArbeidsoppgaveSkjema}
                toggleArbeidsoppgaveSkjema={this.toggleArbeidsoppgaveSkjema}
              />
              {this.state.visArbeidsoppgaveSkjema && (
                <LagreArbeidsoppgaveSkjema
                  sendLagre={this.sendLagreArbeidsoppgave}
                  avbryt={this.skjulSkjema}
                  ref={(lagreSkjema) => {
                    this.lagreSkjema = lagreSkjema;
                  }}
                  varselTekst={this.state.varselTekst}
                  oppdateringFeilet={this.state.lagreNyOppgaveFeilet}
                  arbeidsoppgaverReducer={arbeidsoppgaver}
                  rootUrlImg={getContextRoot()}
                />
              )}
              <ArbeidsoppgaverListe
                liste={sorterArbeidsoppgaverEtterOpprettet(oppfolgingsdialog.arbeidsoppgaveListe)}
                sendLagre={this.sendLagreArbeidsoppgave}
                sendSlett={this.sendSlettArbeidsoppgave}
                fnr={oppfolgingsdialog.arbeidstaker.fnr}
                rootUrlImg={getContextRoot()}
                visFeilMelding={this.visFeilMelding}
                feilMelding={this.state.oppdaterOppgaveFeilet}
              />
            </div>
          )}
        </div>
      );
    })();
  }
}

Arbeidsoppgaver.propTypes = {
  arbeidsoppgaver: arbeidsoppgaverReducerPt,
  oppfolgingsdialog: oppfolgingsplanPt,
  lagreArbeidsoppgave: PropTypes.func,
  slettArbeidsoppgave: PropTypes.func,
};

export default Arbeidsoppgaver;
