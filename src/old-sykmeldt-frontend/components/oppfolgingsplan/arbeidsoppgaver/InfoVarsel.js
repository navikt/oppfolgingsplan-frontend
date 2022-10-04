import React from "react";
import PropTypes from "prop-types";
import { Alert } from "@navikt/ds-react";
const InfoVarsel = ({ tekst }) => {
  return (
    <Alert className="alertstripe--notifikasjonboks" variant="info">
      {tekst}
    </Alert>
  );
};
InfoVarsel.propTypes = {
  tekst: PropTypes.string,
};

export default InfoVarsel;
