import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from "@navikt/ds-react";
import { isLabs } from '@/common/utils/urlUtils';

const TiltakVarselFeil = ({ tekst }) => {
  return (
    <Alert className="tiltakVarselFeil alertstripe--notifikasjonboks" variant="warning">
      {isLabs() ? 'Denne funksjonen virker ikke på testsiden' : tekst}
    </Alert>
  );
};
TiltakVarselFeil.propTypes = {
  tekst: PropTypes.string,
};

export default TiltakVarselFeil;
