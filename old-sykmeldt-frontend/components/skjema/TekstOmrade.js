import React from 'react';
import PropTypes from 'prop-types';
import { fieldPropTypes } from '../../propTypes/fieldproptypes';
import {Textarea} from "@navikt/ds-react";

const Tekstomrade = (props) => {
  const { meta, input, id, maxLength, label } = props;

  const feilmelding = meta.error && meta.touched ? { feilmelding: meta.error } : undefined;

  return (
    <Textarea
      maxLength={maxLength}
      id={id}
      error={feilmelding ? feilmelding.feilmelding : undefined}
      label={label}
      value={...input}
    />
  );
};

Tekstomrade.propTypes = {
  meta: fieldPropTypes.meta,
  id: PropTypes.string,
  rows: PropTypes.string,
  input: fieldPropTypes.input,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  autoFocus: PropTypes.bool,
  maxLength: PropTypes.number,
  label: PropTypes.string,
};

export default Tekstomrade;
