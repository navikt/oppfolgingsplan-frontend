import React from 'react';
import PropTypes from 'prop-types';
import Feilomrade from './Feilomrade';
import Checkbox from './Checkbox';
import { fieldPropTypes } from '../../propTypes/fieldproptypes';

const CheckboxSelvstendig = ({ input, meta, label, id }) => {
  return (
    <Feilomrade {...meta}>
      <Checkbox input={input} id={id} label={label} />
    </Feilomrade>
  );
};

CheckboxSelvstendig.propTypes = {
  input: fieldPropTypes.input,
  meta: fieldPropTypes.meta,
  label: PropTypes.string,
  id: PropTypes.string,
};

export default CheckboxSelvstendig;
