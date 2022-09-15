import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from "@navikt/ds-react";

const TiltakVarselVurdering = ({ tekst }) => {
  return (
    <Alert className="tiltakVurderingVarsel alertstripe--notifikasjonboks" variant="info">
      {tekst}
    </Alert>
  );
};
TiltakVarselVurdering.propTypes = {
  tekst: PropTypes.string,
};

export default TiltakVarselVurdering;
