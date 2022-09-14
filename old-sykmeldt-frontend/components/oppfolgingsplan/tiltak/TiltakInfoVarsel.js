import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from "@navikt/ds-react";

const TiltakInfoVarsel = ({ tekst }) => {
  return (
    <Alert variant="info" className="alertstripe--notifikasjonboks  alertstripe--notifikasjonboks--top-padded">
      {tekst}
    </Alert>
  );
};
TiltakInfoVarsel.propTypes = {
  tekst: PropTypes.string,
};

export default TiltakInfoVarsel;
