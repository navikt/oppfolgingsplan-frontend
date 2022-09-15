import React from 'react';
import PropTypes from 'prop-types';
import * as opProptypes from '../../propTypes/opproptypes';
import OppfolgingsdialogTeaser from './OppfolgingsdialogTeaser';
import OppfolgingsdialogTidligereTeaser from './OppfolgingsdialogTidligereTeaser';

const OppfolgingsdialogTeasere = ({
  oppfolgingsdialoger,
  className,
  tittel = '',
  id,
  rootUrlPlaner,
  harTidligerOppfolgingsdialoger,
}) => {
  return (
    <div className="blokk--l">
      <header className="oppfolgingsdialogTeasere__header">
        <h2>{tittel}</h2>
      </header>
      <div id={id} className={className || 'js-content'}>
        {!harTidligerOppfolgingsdialoger &&
          oppfolgingsdialoger.map((oppfolgingsdialog, idx) => {
            return (
              <OppfolgingsdialogTeaser oppfolgingsdialog={oppfolgingsdialog} key={idx} rootUrlPlaner={rootUrlPlaner} />
            );
          })}
        {harTidligerOppfolgingsdialoger &&
          oppfolgingsdialoger.map((oppfolgingsdialog, idx) => {
            return (
              <OppfolgingsdialogTidligereTeaser
                oppfolgingsdialog={oppfolgingsdialog}
                key={idx}
                rootUrlPlaner={rootUrlPlaner}
              />
            );
          })}
      </div>
    </div>
  );
};

OppfolgingsdialogTeasere.propTypes = {
  oppfolgingsdialoger: PropTypes.arrayOf(opProptypes.oppfolgingsplanPt),
  harTidligerOppfolgingsdialoger: PropTypes.bool,
  className: PropTypes.string,
  tittel: PropTypes.string,
  id: PropTypes.string,
  rootUrlPlaner: PropTypes.string,
};

export default OppfolgingsdialogTeasere;
