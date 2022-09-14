import React from 'react';
import PropTypes from 'prop-types';

const StegTittel = ({ tittel }) => {
  return <h2 className="steg__tittel">{tittel}</h2>;
};
StegTittel.propTypes = {
  tittel: PropTypes.string,
};

export default StegTittel;
