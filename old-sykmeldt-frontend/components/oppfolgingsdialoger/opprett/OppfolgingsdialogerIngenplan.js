import React from 'react';
import PropTypes from 'prop-types';
import Panel from 'nav-frontend-paneler';
import { opprettOppfolgingArbeidsgiverPt } from '../../../propTypes';
import { erOppfolgingsplanOpprettbarDirekte } from '@/common/utils/oppfolgingsdialogUtils';
import { oppfolgingsplanPt } from '../../../propTypes/opproptypes';
import { OppfolgingsdialogTomImage } from '@/common/images/imageComponents';
import {Hovedknapp} from "@/common/old-designsystem/nav-frontend-knapper";

const texts = {
  tittel: 'Aktiv oppfølgingsplan',
  inngangspanel: {
    tittel: 'Du har ingen aktiv oppfølgingsplan',
    paragraph:
      'Dere kan når som helst lage en ny plan. Da legger dere inn arbeidsoppgavene dine og noen forslag til hva som skal til for at du skal klare dem.',
  },
  knapper: {
    lagNy: 'Lag en ny plan',
  },
};

export const OppfolgingsdialogerIngenplanKnapper = ({
  arbeidsgivere,
  oppfolgingsplaner,
  opprett,
  visOppfolgingsdialogOpprett,
}) => {
  return (
    <div className="knapperad knapperad--justervenstre">
      <div className="knapperad__element">
        {erOppfolgingsplanOpprettbarDirekte(arbeidsgivere, oppfolgingsplaner) ? (
          <Hovedknapp
            onClick={() => {
              opprett(arbeidsgivere[0].virksomhetsnummer);
            }}
          >
            {texts.knapper.lagNy}
          </Hovedknapp>
        ) : (
          <Hovedknapp
            onClick={() => {
              visOppfolgingsdialogOpprett(true);
            }}
          >
            {texts.knapper.lagNy}
          </Hovedknapp>
        )}
      </div>
    </div>
  );
};
OppfolgingsdialogerIngenplanKnapper.propTypes = {
  arbeidsgivere: PropTypes.arrayOf(opprettOppfolgingArbeidsgiverPt),
  oppfolgingsplaner: PropTypes.arrayOf(oppfolgingsplanPt),
  opprett: PropTypes.func,
  visOppfolgingsdialogOpprett: PropTypes.func,
};

const OppfolgingsdialogerIngenplan = ({ arbeidsgivere, oppfolgingsplaner, opprett, visOppfolgingsdialogOpprett }) => {
  return (
    <div className="oppfolgingsdialogerIngenplan">
      <header className="oppfolgingsdialogerIngenplan__header">
        <h2>{texts.tittel}</h2>
      </header>
      <Panel border>
        <div className="oppfolgingsdialogerIngenplan__blokk">
          <img alt="" src={OppfolgingsdialogTomImage} />
          <div className="inngangspanel__innhold">
            <header className="inngangspanel__header">
              <h3 className="js-title">
                <span className="inngangspanel__tittel">{texts.inngangspanel.tittel}</span>
              </h3>
            </header>
            <div>
              <p className="oppfolgingsdialoger__start_tekst">{texts.inngangspanel.paragraph}</p>
              <OppfolgingsdialogerIngenplanKnapper
                arbeidsgivere={arbeidsgivere}
                oppfolgingsplaner={oppfolgingsplaner}
                opprett={opprett}
                visOppfolgingsdialogOpprett={visOppfolgingsdialogOpprett}
              />
            </div>
          </div>
        </div>
      </Panel>
    </div>
  );
};

OppfolgingsdialogerIngenplan.propTypes = {
  arbeidsgivere: PropTypes.arrayOf(opprettOppfolgingArbeidsgiverPt),
  oppfolgingsplaner: PropTypes.arrayOf(oppfolgingsplanPt),
  opprett: PropTypes.func,
  visOppfolgingsdialogOpprett: PropTypes.func,
};

export default OppfolgingsdialogerIngenplan;
