import React from 'react';
import PropTypes from 'prop-types';
import { fieldPropTypes } from '../../propTypes/fieldproptypes';

const Checkbox = ({ input, label, id, children }) => {
  return (
    <div className="checkboksContainer" id={`cb-${id}`}>
      <div className="skjemaelement  skjema__input-container">
        <input id={id} type="checkbox" className="skjemaelement__input checkboks" checked={input.value} {...input} />
        <label className="skjemaelement__label" htmlFor={id}>
          {label}
        </label>
      </div>
      {input.value === true && children && <div className="ekstrasporsmal">{children}</div>}
    </div>
  );
};

Checkbox.propTypes = {
  input: fieldPropTypes.input,
  label: PropTypes.string,
  id: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

export default Checkbox;
