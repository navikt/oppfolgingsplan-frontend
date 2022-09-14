import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { dinesykmeldingerReducerPt, ledereReducerPt } from '../../propTypes';
import { oppfolgingsplanPt } from '../../propTypes/opproptypes';
import {
  finnAktiveOppfolgingsdialoger,
  finnTidligereOppfolgingsdialoger,
  harTidligereOppfolgingsdialoger,
} from '@/common/utils/oppfolgingsdialogUtils';
import { finnArbeidsgivereForGyldigeSykmeldinger } from '@/common/utils/sykmeldingUtils';
import getContextRoot from '@/common/utils/getContextRoot';
import OppfolgingsplanFilm from './OppfolgingsplanFilm';
import OppfolgingsdialogerOpprett from './opprett/OppfolgingsdialogerOpprett';
import OppfolgingsdialogerIngenplan from './opprett/OppfolgingsdialogerIngenplan';
import OppfolgingsdialogTeasere from './OppfolgingsdialogTeasere';
import {Knapp} from "@/common/old-designsystem/nav-frontend-knapper";

const texts = {
  oppfolgingsdialogNyKnapp: {
    button: 'Lag en ny oppfølgingsplan',
  },
  oppfolgingsdialogerVisning: {
    teaserOutdatedPlaner: {
      title: 'Tidligere oppfølgingsplaner',
    },
    teaserAktive: {
      titleMultiplePlaner: 'Aktive oppfølgingsplaner',
      titleSinglePlan: 'Aktiv oppfølgingsplan',
    },
  },
};

export const OppfolgingsdialogNyKnapp = ({ visOppfolgingsdialogOpprett }) => {
  return (
    <div className="oppfolgingsdialogNyDialog">
      <Knapp
        onClick={() => {
          visOppfolgingsdialogOpprett(true);
        }}
      >
        {texts.oppfolgingsdialogNyKnapp.button}
      </Knapp>
    </div>
  );
};
OppfolgingsdialogNyKnapp.propTypes = {
  visOppfolgingsdialogOpprett: PropTypes.func,
};

class OppfolgingsdialogerVisning extends Component {
  constructor() {
    super();
    this.state = {
      visOppfolgingsdialogOpprett: false,
    };
    this.visOppfolgingsdialogOpprett = this.visOppfolgingsdialogOpprett.bind(this);
  }

  visOppfolgingsdialogOpprett(vis) {
    this.setState({
      visOppfolgingsdialogOpprett: vis,
    });
  }

  render() {
    const {
      oppfolgingsdialoger = [],
      opprettOppfolgingsdialog,
      kopierOppfolgingsdialog,
      dinesykmeldinger,
      naermesteLedere,
    } = this.props;
    const aktivOppfolgingsdialoger = finnAktiveOppfolgingsdialoger(oppfolgingsdialoger, dinesykmeldinger.data);
    const arbeidsgivereForSykmeldinger = finnArbeidsgivereForGyldigeSykmeldinger(
      dinesykmeldinger.data,
      naermesteLedere.data
    );
    return (
      <div>
        {this.state.visOppfolgingsdialogOpprett && (
          <OppfolgingsdialogerOpprett
            oppfolgingsdialoger={oppfolgingsdialoger}
            arbeidsgivere={arbeidsgivereForSykmeldinger}
            opprett={opprettOppfolgingsdialog}
            kopier={kopierOppfolgingsdialog}
            visOppfolgingsdialogOpprett={this.visOppfolgingsdialogOpprett}
          />
        )}
        {(oppfolgingsdialoger.length === 0 || !aktivOppfolgingsdialoger.length > 0) && (
          <div className="blokk--l">
            <OppfolgingsdialogerIngenplan
              arbeidsgivere={arbeidsgivereForSykmeldinger}
              oppfolgingsplaner={oppfolgingsdialoger}
              visOppfolgingsdialogOpprett={this.visOppfolgingsdialogOpprett}
              opprett={opprettOppfolgingsdialog}
            />
          </div>
        )}
        {aktivOppfolgingsdialoger.length > 0 && (
          <div>
            {arbeidsgivereForSykmeldinger.length > 1 && (
              <OppfolgingsdialogNyKnapp visOppfolgingsdialogOpprett={this.visOppfolgingsdialogOpprett} />
            )}
            <OppfolgingsdialogTeasere
              oppfolgingsdialoger={aktivOppfolgingsdialoger}
              tittel={
                aktivOppfolgingsdialoger.length > 1
                  ? texts.oppfolgingsdialogerVisning.teaserAktive.titleMultiplePlaner
                  : texts.oppfolgingsdialogerVisning.teaserAktive.titleSinglePlan
              }
              rootUrlPlaner={getContextRoot()}
            />
          </div>
        )}
        {harTidligereOppfolgingsdialoger(oppfolgingsdialoger) && (
          <OppfolgingsdialogTeasere
            oppfolgingsdialoger={finnTidligereOppfolgingsdialoger(oppfolgingsdialoger)}
            harTidligerOppfolgingsdialoger
            tittel={texts.oppfolgingsdialogerVisning.teaserOutdatedPlaner.title}
            id="OppfolgingsdialogTeasereAT"
            rootUrlPlaner={getContextRoot()}
          />
        )}
        <OppfolgingsplanFilm />
      </div>
    );
  }
}
OppfolgingsdialogerVisning.propTypes = {
  dinesykmeldinger: dinesykmeldingerReducerPt,
  naermesteLedere: ledereReducerPt,
  oppfolgingsdialoger: PropTypes.arrayOf(oppfolgingsplanPt),
  opprettOppfolgingsdialog: PropTypes.func,
  kopierOppfolgingsdialog: PropTypes.func,
};

export default OppfolgingsdialogerVisning;
