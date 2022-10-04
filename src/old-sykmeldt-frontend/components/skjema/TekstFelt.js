import React from "react";
import PropTypes from "prop-types";
import Feilmelding from "./Feilmelding";
import { fieldPropTypes } from "../../propTypes/fieldproptypes";

const Tekstfelt = (props) => {
  const { className, id, input, meta } = props;
  return (
    <div className="skjemaelement">
      <input
        autoComplete="off"
        placeholder={props.placeholder}
        type={props.type || "text"}
        id={id}
        className={`skjemaelement__input ${className}${
          meta.touched && meta.error ? " skjemaelement__input--harFeil" : ""
        }`}
        {...input}
        value={input.value}
      />
      <Feilmelding {...meta} />
    </div>
  );
};

Tekstfelt.propTypes = {
  meta: fieldPropTypes.meta,
  id: PropTypes.string,
  input: fieldPropTypes.input,
  type: PropTypes.string,
  className: PropTypes.string,
  onKeyUp: PropTypes.func,
  placeholder: PropTypes.string,
  autoFocus: PropTypes.bool,
};

export default Tekstfelt;
