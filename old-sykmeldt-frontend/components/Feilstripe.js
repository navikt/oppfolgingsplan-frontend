import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from "@navikt/ds-react";
import { isLabs } from '@/common/utils/urlUtils';

const Feilstripe = ({ vis, className }) => {
  const tekst = !isLabs()
    ? 'Beklager, det oppstod en feil! Vennligst prøv igjen senere.'
    : 'Denne funksjonen virker ikke på testsiden';
  return (
    <div aria-live="polite" role="alert">
      {vis ? (
        <Alert variant={"warning"} className={className}>
          <p className="sist">{tekst}</p>
        </Alert>
      ) : null}
    </div>
  );
};

Feilstripe.propTypes = {
  vis: PropTypes.bool,
  className: PropTypes.string,
};

export default Feilstripe;
