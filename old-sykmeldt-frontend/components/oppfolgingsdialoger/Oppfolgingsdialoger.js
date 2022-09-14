import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { dinesykmeldingerReducerPt, ledereReducerPt } from '../../propTypes';
import Sidetopp from '../Sidetopp';
import {
  erSykmeldtUtenOppfolgingsdialogerOgNaermesteLedere,
  finnGodkjentedialogerAvbruttAvMotpartSidenSistInnlogging,
  finnTidligereOppfolgingsdialoger,
  harTidligereOppfolgingsdialoger,
  isEmpty,
} from '@/common/utils/oppfolgingsdialogUtils';
import { sykmeldtHarGyldigSykmelding, sykmeldtHarIngenSendteSykmeldinger } from '@/common/utils/sykmeldingUtils';
import IngenledereInfoboks from './IngenledereInfoboks';
import getContextRoot from '@/common/utils/getContextRoot';
import OppfolgingsdialogerVisning from './OppfolgingsdialogerVisning';
import OppfolgingsdialogerInfoPersonvern from './OppfolgingsdialogerInfoPersonvern';
import * as oppfolgingsplanProptypes from '../../propTypes/opproptypes';
import {
  finnOgHentNaermesteLedereListeSomMangler,
  finnOgHentNaermesteLedereSomMangler,
  finnOgHentPersonerSomMangler,
  finnOgHentVirksomheterSomMangler,
} from '@/common/utils/reducerUtils';
import AvbruttPlanNotifikasjonBoksAdvarsel from './AvbruttPlanNotifikasjonBoksAdvarsel';
import OppfolgingsdialogUtenGyldigSykmelding from './OppfolgingsdialogUtenGyldigSykmelding';
import OppfolgingsdialogerUtenAktivSykmelding from './OppfolgingsdialogerUtenAktivSykmelding';

const texts = {
  pageTitle: 'Oppfølgingsplaner',
  noActiveSykmelding: {
    titleTidligerePlaner: 'Tidligere oppfølgingsplaner',
  },
};

class Oppfolgingsdialoger extends Component {
  UNSAFE_componentWillMount() {
    const {
      oppfolgingsdialoger,
      virksomhet,
      person,
      naermesteleder,
      hentPerson,
      hentVirksomhet,
      hentLedere,
      hentNaermesteLeder,
      naermesteLedere,
      dinesykmeldinger,
    } = this.props;

    finnOgHentVirksomheterSomMangler(oppfolgingsdialoger, virksomhet, hentVirksomhet);
    finnOgHentPersonerSomMangler(oppfolgingsdialoger, person, hentPerson);
    finnOgHentNaermesteLedereListeSomMangler(dinesykmeldinger, naermesteLedere, hentLedere);
    finnOgHentNaermesteLedereSomMangler(oppfolgingsdialoger, naermesteleder, hentNaermesteLeder);

    window.sessionStorage.removeItem('hash');
  }

  render() {
    const {
      oppfolgingsdialoger = [],
      kopierOppfolgingsdialog,
      opprettOppfolgingsdialog,
      dinesykmeldinger,
      naermesteLedere,
    } = this.props;
    let panel;
    const dialogerAvbruttAvMotpartSidenSistInnlogging = finnGodkjentedialogerAvbruttAvMotpartSidenSistInnlogging(
      oppfolgingsdialoger
    );
    if (
      erSykmeldtUtenOppfolgingsdialogerOgNaermesteLedere(
        oppfolgingsdialoger,
        dinesykmeldinger.data,
        naermesteLedere.data
      )
    ) {
      panel = <IngenledereInfoboks />;
    } else if (!sykmeldtHarGyldigSykmelding(dinesykmeldinger.data)) {
      panel = (
        <div>
          <div className="blokk--l">
            <OppfolgingsdialogUtenGyldigSykmelding
              sykmeldtHarIngenSendteSykmeldinger={sykmeldtHarIngenSendteSykmeldinger(dinesykmeldinger.data)}
            />
          </div>

          {!isEmpty(oppfolgingsdialoger) && harTidligereOppfolgingsdialoger(oppfolgingsdialoger) && (
            <OppfolgingsdialogerUtenAktivSykmelding
              oppfolgingsdialoger={finnTidligereOppfolgingsdialoger(oppfolgingsdialoger)}
              tittel={texts.noActiveSykmelding.titleTidligerePlaner}
            />
          )}
        </div>
      );
    } else {
      panel = (
        <OppfolgingsdialogerVisning
          oppfolgingsdialoger={oppfolgingsdialoger}
          dinesykmeldinger={dinesykmeldinger}
          naermesteLedere={naermesteLedere}
          kopierOppfolgingsdialog={kopierOppfolgingsdialog}
          opprettOppfolgingsdialog={opprettOppfolgingsdialog}
        />
      );
    }
    return (
      <div>
        {dialogerAvbruttAvMotpartSidenSistInnlogging.length > 0 && (
          <AvbruttPlanNotifikasjonBoksAdvarsel
            motpartnavn={dialogerAvbruttAvMotpartSidenSistInnlogging[0].sistEndretAv.navn}
            rootUrl={getContextRoot()}
          />
        )}
        <Sidetopp tittel={texts.pageTitle} />
        <OppfolgingsdialogerInfoPersonvern />

        {panel}
      </div>
    );
  }
}

Oppfolgingsdialoger.propTypes = {
  dinesykmeldinger: dinesykmeldingerReducerPt,
  naermesteleder: oppfolgingsplanProptypes.naermestelederReducerPt,
  naermesteLedere: ledereReducerPt,
  person: oppfolgingsplanProptypes.personReducerPt,
  virksomhet: oppfolgingsplanProptypes.virksomhetReducerPt,
  oppfolgingsdialoger: PropTypes.arrayOf(oppfolgingsplanProptypes.oppfolgingsplanPt),
  hentVirksomhet: PropTypes.func,
  hentPerson: PropTypes.func,
  hentLedere: PropTypes.func,
  hentNaermesteLeder: PropTypes.func,
  kopierOppfolgingsdialog: PropTypes.func,
  opprettOppfolgingsdialog: PropTypes.func,
};

export default Oppfolgingsdialoger;
