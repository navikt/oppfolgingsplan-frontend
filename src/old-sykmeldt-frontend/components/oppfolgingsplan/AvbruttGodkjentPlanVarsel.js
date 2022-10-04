import React from "react";
import { Alert } from "@navikt/ds-react";

const tekster = {
  varsel:
    "Du har åpnet oppfølgingsplanen for å endre den. Når du har gjort endringene, må du sende den til ny godkjenning hos den andre.",
};

const AvbruttGodkjentPlanVarsel = () => {
  return (
    <Alert className="alertstripe--notifikasjonboks" variant="info">
      {tekster.varsel}
    </Alert>
  );
};

export default AvbruttGodkjentPlanVarsel;
