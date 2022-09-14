import React from 'react';
import styled from 'styled-components';

const Spinner = styled.div`
  display: inline-flex;
  margin: 0;
  margin-left: 0.2rem;
  width: 2rem;
  height: 2rem;
`;

const MiniSpinner = () => {
  return <Spinner className="app-spinner" aria-label="Vent litt mens siden laster" />;
};

export default MiniSpinner;
