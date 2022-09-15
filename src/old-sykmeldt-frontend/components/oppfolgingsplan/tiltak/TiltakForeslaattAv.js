import React from 'react';
import { tiltakPt } from '../../../propTypes/opproptypes';

export const tekster = {
  foreslaattav: 'FORESLÅTT AV',
};

const TiltakForeslaattAv = ({ tiltak }) => {
  return (
    <div className="lagretiltakskjema__inputgruppe">
      {tiltak &&
        tiltak.opprettetAv && [
          <label className="tiltaktabell--beskrivelse" key={`tiltak-besk-label-${tiltak.tiltakId}`}>
            {tekster.foreslaattav}
          </label>,
          <p key={`tiltak-besk-p-${tiltak.opprettetAv.navn}`}>{tiltak.opprettetAv.navn}</p>,
        ]}
    </div>
  );
};

TiltakForeslaattAv.propTypes = {
  tiltak: tiltakPt,
};

export default TiltakForeslaattAv;
