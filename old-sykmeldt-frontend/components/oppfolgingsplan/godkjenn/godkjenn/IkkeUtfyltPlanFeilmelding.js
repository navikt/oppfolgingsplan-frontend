import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from "@navikt/ds-react";
import { oppfolgingsplanPt } from '../../../../propTypes/opproptypes';

const texts = {
  description:
    'Ups, her mangler det litt før du kan sende planen. Den må inneholde minst én oppgave og ett tiltak. Kanskje lederen din kan hjelpe til?',
  linkArbeidsoppgave: 'Legg til en arbeidsoppgave',
  linkTiltak: 'Legg til et tiltak',
};

const handleKeyPress = (settAktivtSteg, nesteSteg, e) => {
  e.preventDefault();
  if (e.nativeEvent.keyCode === 13) {
    settAktivtSteg(nesteSteg);
  }
};

const IkkeUtfyltPlanFeilmelding = ({ oppfolgingsdialog, settAktivtSteg }) => {
  return (
    <Alert className="ikkeUtfyltPlanFeilmelding" variant={"warning"}>
      <p>{texts.description}</p>
      <div className="ikkeUtfyltPlanFeilmelding__lenker">
        {oppfolgingsdialog.arbeidsoppgaveListe.length === 0 && (
          <button
            className="lenke"
            onKeyPress={(e) => {
              handleKeyPress(settAktivtSteg, 1, e);
            }}
            onMouseDown={() => {
              settAktivtSteg(1);
            }}
          >
            {texts.linkArbeidsoppgave}
          </button>
        )}
        {oppfolgingsdialog.tiltakListe.length === 0 && (
          <button
            className="lenke"
            onKeyPress={(e) => {
              handleKeyPress(settAktivtSteg, 2, e);
            }}
            onMouseDown={() => {
              settAktivtSteg(2);
            }}
          >
            {texts.linkTiltak}
          </button>
        )}
      </div>
    </Alert>
  );
};
IkkeUtfyltPlanFeilmelding.propTypes = {
  oppfolgingsdialog: oppfolgingsplanPt,
  settAktivtSteg: PropTypes.func,
};

export default IkkeUtfyltPlanFeilmelding;
