import React from 'react';
import PropTypes from 'prop-types';
import {Knapp} from "@/common/old-designsystem/nav-frontend-knapper";

const tekster = {
  knapp: '+ Legg til ny arbeidsoppgave',
};

const ArbeidsoppgaverInfoboks = ({ children, tittel, visSkjema, toggleSkjema }) => {
  return (
    <div className="arbeidsoppgaverInfoboks">
      <h3>{tittel}</h3>
      {children}
      {!visSkjema && (
        <Knapp
          mini
          onClick={() => {
            toggleSkjema();
          }}
        >
          {tekster.knapp}
        </Knapp>
      )}
    </div>
  );
};

ArbeidsoppgaverInfoboks.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  tittel: PropTypes.string,
  visSkjema: PropTypes.bool,
  toggleSkjema: PropTypes.func,
};

export default ArbeidsoppgaverInfoboks;
