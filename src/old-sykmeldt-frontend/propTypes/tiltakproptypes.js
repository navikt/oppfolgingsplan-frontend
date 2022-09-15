import PropTypes from 'prop-types';

export const tiltakSkjemaFeltPt = PropTypes.shape({
  navn: PropTypes.string,
  tekst: PropTypes.string,
});

export const datovelgerFeltPt = PropTypes.shape({
  navn: PropTypes.string,
  tekst: PropTypes.string,
});

export const tiltakSkjemaFelterPt = PropTypes.shape({
  tiltaknavn: tiltakSkjemaFeltPt,
  beskrivelse: tiltakSkjemaFeltPt,
  gjennomfoering: tiltakSkjemaFeltPt,
  beskrivelseIkkeAktuelt: tiltakSkjemaFeltPt,
  startdato: tiltakSkjemaFeltPt,
  sluttdato: tiltakSkjemaFeltPt,
});
