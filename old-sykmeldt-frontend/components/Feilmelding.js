import React from 'react';
import PropTypes from 'prop-types';

const Feilmelding = ({
  tittel = 'Beklager, det oppstod en feil',
  melding = 'Vennligst prøv igjen litt senere.',
  children,
}) => {
  return (
    <div className="panel">
      <div className="hode hode--feil">
        <h1 className="hode__tittel">{tittel}</h1>
        <p className="hode__melding">{children || melding}</p>
      </div>
    </div>
  );
};

Feilmelding.propTypes = {
  tittel: PropTypes.string,
  melding: PropTypes.string,
  children: PropTypes.any,
};

export default Feilmelding;
