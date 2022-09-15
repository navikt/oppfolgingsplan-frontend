import React from 'react';
import PropTypes from 'prop-types';
import { oppfolgingsplanPt } from '../../propTypes/opproptypes';
import OppfolgingsdialogTidligereUtenSykmelding from './OppfolgingsdialogTidligereUtenSykmelding';

const OppfolgingsdialogerUtenAktivSykmelding = ({ oppfolgingsdialoger, tittel = '' }) => {
  return (
    <div className="blokk--l">
      <header className="oppfolgingsdialogTeasere__header">
        <h2>{tittel}</h2>
      </header>
      <div className={'js-content'}>
        {oppfolgingsdialoger.map((oppfolgingsdialog, idx) => {
          return <OppfolgingsdialogTidligereUtenSykmelding oppfolgingsdialog={oppfolgingsdialog} key={idx} />;
        })}
      </div>
    </div>
  );
};

OppfolgingsdialogerUtenAktivSykmelding.propTypes = {
  oppfolgingsdialoger: PropTypes.arrayOf(oppfolgingsplanPt),
  tittel: PropTypes.string,
};

export default OppfolgingsdialogerUtenAktivSykmelding;
