import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import Radioknapper from '../../skjema/Radioknapper';
import {Button} from "@navikt/ds-react";

const texts = {
  question: 'Ønsker du å basere den nye planen på den som gjaldt sist?',
  answer: {
    yes: 'Ja, ta utgangspunkt i den tidligere planen',
    no: 'Nei, start en ny plan der vi ikke har fylt ut noe',
  },
  buttonSubmit: 'Start',
};

export const BaserTidligereSkjemaComponent = ({ handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit} className="baserTidligereSkjema">
      <label className="skjemaelement__label">{texts.question}</label>
      <Field name="baserPaaTidligerePlan" component={Radioknapper}>
        <input value label={texts.answer.yes} aria-labelledby="baserPaaTidligerePlan-overskrift" />
        <input value={false} label={texts.answer.no} aria-labelledby="baserPaaTidligerePlan-overskrift" />
      </Field>
      <div className="knapperad">
        <Button variant={"primary"}>{texts.buttonSubmit}</Button>
      </div>
    </form>
  );
};

BaserTidligereSkjemaComponent.propTypes = {
  handleSubmit: PropTypes.func,
};

function validate(values) {
  const feilmeldinger = {};
  if (!values.baserPaaTidligerePlan) {
    feilmeldinger.baserPaaTidligerePlan = 'Velg alternativ';
  }

  return feilmeldinger;
}
const ReduxSkjema = reduxForm({
  form: 'BASER_PAA_TIDLIGERE_PLAN',
  validate,
})(BaserTidligereSkjemaComponent);

export default ReduxSkjema;
