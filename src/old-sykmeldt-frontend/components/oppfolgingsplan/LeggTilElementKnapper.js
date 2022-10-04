import React from "react";
import PropTypes from "prop-types";

const texts = {
  knapp: "+ Legg til",
};

const LeggTilElementKnapper = ({ visSkjema, toggleSkjema }) => {
  return (
    <div className="knapperad">
      <button
        className="knapp knapperad__element"
        aria-pressed={visSkjema}
        onClick={toggleSkjema}
      >
        {texts.knapp}
      </button>
    </div>
  );
};
LeggTilElementKnapper.propTypes = {
  visSkjema: PropTypes.bool,
  toggleSkjema: PropTypes.func,
};

export default LeggTilElementKnapper;
