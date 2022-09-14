import React from 'react';
import PropTypes from 'prop-types';
import { arbeidsoppgavePt } from '../../../propTypes/opproptypes';
import Arbeidsoppgave from './Arbeidsoppgave';

const ArbeidsoppgaverListe = ({ liste, sendLagre, sendSlett, fnr, rootUrlImg, feilMelding, visFeilMelding }) => {
  return (
    <div className="oppfolgingsdialogtabell">
      {liste.map((element) => {
        return (
          <Arbeidsoppgave
            key={element.arbeidsoppgaveId}
            element={element}
            fnr={fnr}
            sendSlett={sendSlett}
            sendLagre={sendLagre}
            id={element.arbeidsoppgaveId}
            rootUrlImg={rootUrlImg}
            visFeilMelding={visFeilMelding}
            feilMelding={feilMelding}
          />
        );
      })}
    </div>
  );
};

ArbeidsoppgaverListe.propTypes = {
  liste: PropTypes.arrayOf(arbeidsoppgavePt),
  fnr: PropTypes.string,
  sendLagre: PropTypes.func,
  sendSlett: PropTypes.func,
  rootUrlImg: PropTypes.string,
  visFeilMelding: PropTypes.func,
  feilMelding: PropTypes.bool,
};

export default ArbeidsoppgaverListe;
