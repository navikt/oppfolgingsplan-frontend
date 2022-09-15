import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Text = styled.p`
  font-size: 1em;
  font-weight: 100;
  margin: 0;
  margin-left: 1em;
`;

const Div = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 1em;
  align-items: flex-start;
`;

const Img = styled.img`
  width: 1.5em;
  min-width: 1.5em;
`;

const BildeTekstLinje = ({ imgAlt, imgUrl, tekst }) => {
  return (
    <Div>
      <Img alt={imgAlt} src={imgUrl} />
      <Text>{tekst}</Text>
    </Div>
  );
};
BildeTekstLinje.propTypes = {
  imgAlt: PropTypes.string,
  imgUrl: PropTypes.objectOf(PropTypes.any),
  tekst: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
};
export default BildeTekstLinje;
