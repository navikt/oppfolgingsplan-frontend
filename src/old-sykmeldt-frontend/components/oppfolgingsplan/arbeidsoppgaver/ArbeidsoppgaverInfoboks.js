import React from "react";
import PropTypes from "prop-types";
import { Button } from "@navikt/ds-react";

const tekster = {
  knapp: "+ Legg til ny arbeidsoppgave",
};

const ArbeidsoppgaverInfoboks = ({
  children,
  tittel,
  visSkjema,
  toggleSkjema,
}) => {
  return (
    <div className="arbeidsoppgaverInfoboks">
      <h3>{tittel}</h3>
      {children}
      {!visSkjema && (
        <Button
          variant={"secondary"}
          size={"small"}
          onClick={() => {
            toggleSkjema();
          }}
        >
          {tekster.knapp}
        </Button>
      )}
    </div>
  );
};

ArbeidsoppgaverInfoboks.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  tittel: PropTypes.string,
  visSkjema: PropTypes.bool,
  toggleSkjema: PropTypes.func,
};

export default ArbeidsoppgaverInfoboks;
