import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from "@navikt/ds-react";

const hentTekst = (antallTiltak) => {
  const tekst = antallTiltak > 1 ? 'arbeidsoppgaver' : 'arbeidsoppgave';
  return `Lederen din ønsker en vurdering av ${antallTiltak} ${tekst}`;
};

const NotifikasjonBoksVurderingOppgave = ({ antallIkkeVurderte }) => {
  return (
    <Alert className="alertstripe--notifikasjonboks" variant="warning">
      {hentTekst(antallIkkeVurderte)}
    </Alert>
  );
};
NotifikasjonBoksVurderingOppgave.propTypes = {
  antallIkkeVurderte: PropTypes.number,
};

export default NotifikasjonBoksVurderingOppgave;
