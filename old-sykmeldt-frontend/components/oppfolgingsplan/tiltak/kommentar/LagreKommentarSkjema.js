import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { tekstfeltRegex } from '@/common/konstanter';
import { kommentarReducerPt } from '../../../../propTypes/opproptypes';
import TekstOmrade from '../../../skjema/TekstOmrade';
import TiltakVarselFeil from '../TiltakVarselFeil';
import {Hovedknapp} from "@/common/old-designsystem/nav-frontend-knapper";

const texts = {
  kommentarBeskrivelse: {
    title: 'Kommenter',
  },
  lagreKommentarKnapper: {
    buttonSave: 'Lagre',
    buttonCancel: 'Avbryt',
  },
};

const MAX_LENGTH = 1000;

export const KommentarBeskrivelse = ({ felt, elementId }) => {
  return (
    <div className="skjemaelement lagreKommentarSkjema__inputgruppe">
      <Field
        className="tiltak_input--kommenter input--fullbredde"
        name={felt}
        id={`${elementId}`}
        aria-labelledby={felt}
        maxLength={MAX_LENGTH}
        label={texts.kommentarBeskrivelse.title}
        component={TekstOmrade}
        placeholder="Skriv inn tekst"
        rows="6"
        autoFocus
      />
    </div>
  );
};
KommentarBeskrivelse.propTypes = {
  felt: PropTypes.string,
  elementId: PropTypes.number,
};

const handleKeyPress = (avbryt, e) => {
  e.preventDefault();
  if (e.nativeEvent.keyCode === 13) {
    avbryt();
  }
};

export const LagreKommentarKnapper = ({ avbryt, spinner }) => {
  return (
    <div className="knapperad knapperad--justervenstre">
      <div className="knapperad__element">
        <Hovedknapp disabled={spinner} spinner={spinner} htmlType="submit">
          {texts.lagreKommentarKnapper.buttonSave}
        </Hovedknapp>
      </div>
      <div className="knapperad__element">
        <button
          className="lenke"
          type="button"
          onKeyPress={(e) => {
            handleKeyPress(avbryt, e);
          }}
          onMouseDown={avbryt}
        >
          {texts.lagreKommentarKnapper.buttonCancel}
        </button>
      </div>
    </div>
  );
};
LagreKommentarKnapper.propTypes = {
  avbryt: PropTypes.func,
  spinner: PropTypes.bool,
};

export class LagreKommentarSkjemaComponent extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      spinner: false,
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.kommentarReducer.tiltakId === this.props.elementId) {
      this.setState({
        spinner: nextProps.kommentarReducer.lagrer,
      });
    }
  }

  handleSubmit(kommentar) {
    this.props.sendLagre(this.props.elementId, kommentar);
  }

  render() {
    const { elementId, handleSubmit, avbryt, feilMelding, kommentarFeilet } = this.props;
    return (
      <form onSubmit={handleSubmit(this.handleSubmit)} className="lagreKommentarSkjema">
        <KommentarBeskrivelse felt="tekst" elementId={elementId} />

        {kommentarFeilet && <TiltakVarselFeil tekst={feilMelding} />}

        <LagreKommentarKnapper avbryt={avbryt} spinner={this.state.spinner} />
      </form>
    );
  }
}
LagreKommentarSkjemaComponent.propTypes = {
  elementId: PropTypes.number,
  handleSubmit: PropTypes.func,
  sendLagre: PropTypes.func,
  avbryt: PropTypes.func,
  kommentarReducer: kommentarReducerPt,
  kommentarFeilet: PropTypes.bool,
  feilMelding: PropTypes.string,
};

const validate = (values) => {
  const feilmeldinger = {};
  if (!values.tekst || values.tekst.trim().length === 0) {
    feilmeldinger.tekst = 'Fyll inn tekst';
  } else if (values.tekst.match(tekstfeltRegex)) {
    feilmeldinger.tekst = 'Ugyldig spesialtegn er oppgitt';
  }
  const tekstLengde = values.tekst ? values.tekst.length : 0;

  if (tekstLengde > MAX_LENGTH) {
    feilmeldinger.tekst = `Maks ${MAX_LENGTH} tegn tillatt`;
  }
  return feilmeldinger;
};

const ReduxSkjema = reduxForm({
  validate,
})(LagreKommentarSkjemaComponent);

export default ReduxSkjema;
