import React from 'react';
import PropTypes from 'prop-types';

const SideOverskrift = ({ tittel, children }) => {
  return (
    <div className="sidetopp">
      <h1 className="sidetopp__tittel">{tittel}</h1>
      {children}
    </div>
  );
};
SideOverskrift.propTypes = {
  children: PropTypes.element,
  tittel: PropTypes.string,
};

export default SideOverskrift;
