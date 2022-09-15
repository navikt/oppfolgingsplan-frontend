import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Icon = styled.img`
  height: auto;
  width: ${(props) => {
    if (props.liteikon) {
      return '2em';
    } else if (props.mediumIcon) {
      return '4em';
    }
    return '8em';
  }};
`;

const OppfolgingsplanInfoboks = ({ classnames = '', svgUrl, svgAlt, tittel, children, liteikon, mediumIcon }) => {
  return (
    <div className={`panel ${classnames}`}>
      <div className="illustrertTittel">
        <Icon src={svgUrl} alt={svgAlt} liteikon={liteikon} mediumIcon={mediumIcon} />
        <h2 className="illustrertTittel__tittel">{tittel}</h2>
      </div>
      {children}
    </div>
  );
};

OppfolgingsplanInfoboks.propTypes = {
  classnames: PropTypes.string,
  svgUrl: PropTypes.objectOf(PropTypes.any),
  liteikon: PropTypes.bool,
  mediumIcon: PropTypes.bool,
  svgAlt: PropTypes.string,
  tittel: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

export default OppfolgingsplanInfoboks;
