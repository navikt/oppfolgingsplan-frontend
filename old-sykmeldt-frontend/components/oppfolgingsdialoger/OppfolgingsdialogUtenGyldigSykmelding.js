import PropTypes from 'prop-types';
import React from 'react';
import Panel from 'nav-frontend-paneler';
import { OppfolgingsdialogIkkeAktivSykmeldingImage } from '@/common/images/imageComponents';

const texts = {
  title: 'Aktiv oppfølgingsplan',
  infoIngenGyldigeSykmeldinger: 'Du kan ikke lage en ny oppfølgingsplan fordi du ikke er sykmeldt nå.',
  infoIngenSendteSykmeldinger: 'Du kan ikke lage en ny oppfølgingsplan fordi du ikke har sendt inn sykmeldingen din.',
};

const OppfolgingsdialogUtenGyldigSykmelding = ({ sykmeldtHarIngenSendteSykmeldinger }) => {
  return (
    <div className="oppfolgingsdialogUtenAktivSykmelding">
      <header className="oppfolgingsdialogUtenAktivSykmelding__header">
        <h2>{texts.title}</h2>
      </header>
      <Panel border>
        <div className="oppfolgingsdialogUtenAktivSykmelding__blokk">
          <img alt="" src={OppfolgingsdialogIkkeAktivSykmeldingImage} />
          <div className="inngangspanel__innhold">
            <div>
              {sykmeldtHarIngenSendteSykmeldinger ? (
                <p className="oppfolgingsdialoger__start_tekst">{texts.infoIngenSendteSykmeldinger}</p>
              ) : (
                <p className="oppfolgingsdialoger__start_tekst">{texts.infoIngenGyldigeSykmeldinger}</p>
              )}
            </div>
          </div>
        </div>
      </Panel>
    </div>
  );
};

OppfolgingsdialogUtenGyldigSykmelding.propTypes = {
  sykmeldtHarIngenSendteSykmeldinger: PropTypes.bool,
};

export default OppfolgingsdialogUtenGyldigSykmelding;
