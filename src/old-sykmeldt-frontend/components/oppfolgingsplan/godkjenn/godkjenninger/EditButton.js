import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { oppfolgingsplanPt } from '../../../../propTypes/opproptypes';

const texts = {
  buttonDecline: 'Gå inn i planen for å gjøre endringer',
};

const StyledButton = styled.button`
  color: #0067c5;
  background: none;
  border: 0;
  padding: 0;
  margin: 1rem 0;
  text-decoration: underline;
`;

export const EditButton = ({ oppfolgingsdialog, avvisDialog }) => {
  return (
    <StyledButton
      onClick={() => {
        avvisDialog(oppfolgingsdialog.id, oppfolgingsdialog.arbeidstaker.fnr);
        window.location.hash = 'arbeidsoppgaver';
      }}
    >
      {texts.buttonDecline}
    </StyledButton>
  );
};

EditButton.propTypes = {
  oppfolgingsdialog: oppfolgingsplanPt,
  avvisDialog: PropTypes.func,
};
