import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Stegnavigasjon from './Stegnavigasjon';

const tekster = {
  steg: {
    arbeidsoppgaver: 'Arbeidsoppgaver',
    tiltak: 'Tiltak',
    plan: 'Se planen',
  },
};

const stegListe = [
  { url: '#', tekst: tekster.steg.arbeidsoppgaver },
  { url: '#', tekst: tekster.steg.tiltak },
  { url: '#', tekst: tekster.steg.plan },
];

class NavigasjonsTopp extends Component {
  UNSAFE_componentWillMount() {
    if (this.props.disabled) {
      this.props.settAktivtSteg(3);
    }
  }
  render() {
    const { steg, disabled, settAktivtSteg } = this.props;
    return (
      <div className="navigasjonsTopp">
        <Stegnavigasjon aktivtSteg={steg} settAktivtSteg={settAktivtSteg} disabled={disabled} stegliste={stegListe} />
      </div>
    );
  }
}
NavigasjonsTopp.propTypes = {
  steg: PropTypes.number,
  settAktivtSteg: PropTypes.func,
  disabled: PropTypes.bool,
};

export default NavigasjonsTopp;
