import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from "@navikt/ds-react";

const textAlertstripe = (counterPart) => {
  return `${counterPart} har startet en ny oppfølgingsplan. Den gamle er arkivert.`;
};

const AvbruttPlanNotifikasjonBoksAdvarsel = ({ motpartnavn }) => {
  return (
    <Alert className="alertstripe--notifikasjonboks" variant="info">
      {textAlertstripe(motpartnavn)}
    </Alert>
  );
};
AvbruttPlanNotifikasjonBoksAdvarsel.propTypes = {
  motpartnavn: PropTypes.string,
};

export default AvbruttPlanNotifikasjonBoksAdvarsel;
