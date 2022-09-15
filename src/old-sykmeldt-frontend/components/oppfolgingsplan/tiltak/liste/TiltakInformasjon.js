import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { STATUS_TILTAK } from '@/common/konstanter';
import { kommentarReducerPt, tiltakPt } from '../../../../propTypes/opproptypes';
import TiltakVarselFeil from './../TiltakVarselFeil';
import KommentarListe from '../kommentar/KommentarListe';
import LagreKommentarSkjema from '../kommentar/LagreKommentarSkjema';
import TiltakForeslaattAv from '../TiltakForeslaattAv';
import { sorterKommentarerEtterOpprettet } from '@/common/utils/tiltakUtils';
import TiltakVarselVurdering from './TiltakVarselVurdering';

const texts = {
  tiltakInformasjonBeskrivelse: {
    label: 'BESKRIVELSE',
  },
  tiltakInformasjonGjennomfoering: {
    label: 'OPPFØLGING OG GJENNOMFØRING',
  },
  tabellTiltakBeskrivelseIkkeAktuelt: {
    label: 'ARBEIDSGIVERS VURDERING',
  },
  tiltakInformasjon: {
    updateError: 'En midlertidig feil gjør at vi ikke kan lagre endringene dine akkurat nå. Prøv igjen senere.',
    tiltakVarselVurdering: 'Dette tiltaket mangler en vurdering fra lederen din',
  },
};

export const TiltakInformasjonBeskrivelse = ({ tiltak }) => {
  return (
    <div className="tiltaktabell__rad__utvidbar--rad">
      {tiltak && tiltak.beskrivelse && (
        <label className="tiltaktabell--beskrivelse">{texts.tiltakInformasjonBeskrivelse.label}</label>
      )}
      {tiltak && tiltak.beskrivelse && <p>{tiltak.beskrivelse}</p>}
    </div>
  );
};
TiltakInformasjonBeskrivelse.propTypes = {
  tiltak: tiltakPt,
};

export const TiltakInformasjonGjennomfoering = ({ tiltak }) => {
  return (
    <div className="tiltaktabell__rad__utvidbar--rad">
      {tiltak && tiltak.gjennomfoering && (
        <label className="tiltaktabell--oppfoelging">{texts.tiltakInformasjonGjennomfoering.label}</label>
      )}
      {tiltak && tiltak.gjennomfoering && <p>{tiltak.gjennomfoering}</p>}
    </div>
  );
};
TiltakInformasjonGjennomfoering.propTypes = {
  tiltak: tiltakPt,
};

export const TabellTiltakBeskrivelseIkkeAktuelt = ({ tiltak }) => {
  return (
    <div className="tiltaktabell__rad__utvidbar--rad">
      {tiltak && tiltak.beskrivelseIkkeAktuelt && (
        <label className="tiltaktabell--oppfoelging">{texts.tabellTiltakBeskrivelseIkkeAktuelt.label}</label>
      )}
      {tiltak && tiltak.beskrivelseIkkeAktuelt && <p>{tiltak.beskrivelseIkkeAktuelt}</p>}
    </div>
  );
};
TabellTiltakBeskrivelseIkkeAktuelt.propTypes = {
  tiltak: tiltakPt,
};

export const visVarsel = (fnr, tiltak) => {
  return (
    tiltak &&
    !tiltak.gjennomfoering &&
    !tiltak.beskrivelseIkkeAktuelt &&
    fnr === (tiltak.opprettetAv && tiltak.opprettetAv.fnr) &&
    tiltak.sistEndretAv.fnr === fnr
  );
};

class TiltakInformasjon extends Component {
  constructor() {
    super();
    this.state = {
      visLagringKommentarFeilet: false,
      varselTekst: '',
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (
      this.props.element.tiltakId === nextProps.kommentarReducer.feiletTiltakId &&
      nextProps.kommentarReducer.lagringFeilet &&
      nextProps.kommentarReducer.lagringFeilet !== this.props.kommentarReducer.lagringFeilet
    ) {
      this.props.visFeilMelding(true);
      this.setState({
        visLagringKommentarFeilet: true,
        varselTekst: texts.tiltakInformasjon.updateError,
      });
    } else if (!nextProps.kommentarReducer.lagringFeilet && !nextProps.kommentarReducer.slettingFeilet) {
      this.setState({
        visLagringKommentarFeilet: false,
        varselTekst: '',
      });
    }
  }

  render() {
    const {
      element,
      fnr,
      lagreKommentarSkjema,
      sendSlettKommentar,
      sendLagreKommentar,
      skjulLagreKommentarSkjema,
      oppdaterTiltakFeilet,
      varselTekst,
      kommentarReducer,
      feilMelding,
      visFeilMelding,
      rootUrlImg,
    } = this.props;
    return (
      <div className={'tiltaktabell__rad__utvidbar tiltakInformasjon'}>
        <TiltakInformasjonBeskrivelse tiltak={element} />

        <TiltakForeslaattAv tiltak={element} />

        {visVarsel(fnr, element) && <TiltakVarselVurdering tekst={texts.tiltakInformasjon.tiltakVarselVurdering} />}

        {element && element.gjennomfoering && element.status === STATUS_TILTAK.AVTALT && (
          <TiltakInformasjonGjennomfoering tiltak={element} />
        )}

        {element && element.beskrivelseIkkeAktuelt && element.status === STATUS_TILTAK.IKKE_AKTUELT && (
          <TabellTiltakBeskrivelseIkkeAktuelt tiltak={element} />
        )}

        {oppdaterTiltakFeilet && feilMelding && (
          <TiltakVarselFeil
            tekst={varselTekst}
            onTransitionEnd={() => {
              this.onTransitionEnd();
            }}
          />
        )}

        {lagreKommentarSkjema && (
          <LagreKommentarSkjema
            elementId={element.tiltakId}
            sendLagre={sendLagreKommentar}
            avbryt={skjulLagreKommentarSkjema}
            kommentarReducer={kommentarReducer}
            kommentarFeilet={this.state.visLagringKommentarFeilet && feilMelding}
            feilMelding={this.state.varselTekst}
            form={`${element.tiltakId}`}
            rootUrlImg={rootUrlImg}
          />
        )}

        {element.kommentarer && element.kommentarer.length > 0 && (
          <KommentarListe
            elementId={element.tiltakId}
            kommentarer={sorterKommentarerEtterOpprettet(element.kommentarer)}
            fnr={fnr}
            sendSlett={sendSlettKommentar}
            kommentarReducer={kommentarReducer}
            feilMelding={feilMelding}
            visFeilMelding={visFeilMelding}
            rootUrlImg={rootUrlImg}
          />
        )}
      </div>
    );
  }
}

TiltakInformasjon.propTypes = {
  element: tiltakPt,
  fnr: PropTypes.string,
  lagreKommentarSkjema: PropTypes.bool,
  sendLagreKommentar: PropTypes.func,
  sendSlettKommentar: PropTypes.func,
  skjulLagreKommentarSkjema: PropTypes.func,
  oppdaterTiltakFeilet: PropTypes.bool,
  varselTekst: PropTypes.string,
  kommentarReducer: kommentarReducerPt,
  feilMelding: PropTypes.bool,
  visFeilMelding: PropTypes.func,
  rootUrlImg: PropTypes.string,
};

export default TiltakInformasjon;
