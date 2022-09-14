import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Alert } from "@navikt/ds-react";
import * as oppfolgingsplanProptypes from '../../propTypes/opproptypes';
import {
  finnOgHentArbeidsforholdSomMangler,
  finnOgHentKontaktinfoSomMangler,
  finnOgHentNaermesteLedereSomMangler,
  finnOgHentPersonerSomMangler,
  finnOgHentVirksomheterSomMangler,
} from '@/common/utils/reducerUtils';
import {
  harNaermesteLeder,
  inneholderGodkjenninger,
  inneholderGodkjenningerAvArbeidstaker,
  inneholderGodkjentPlan,
  utenSamtykke,
} from '@/common/utils/oppfolgingsdialogUtils';
import getContextRoot from '@/common/utils/getContextRoot';
import Arbeidsoppgaver from './arbeidsoppgaver/Arbeidsoppgaver';
import AvbruttGodkjentPlanVarsel from './AvbruttGodkjentPlanVarsel';
import LagreOgAvsluttKnapp from './LagreOgAvsluttKnapp';
import NavigasjonsBunn from './NavigasjonsBunn';
import NavigasjonsTopp from './NavigasjonsTopp';
import ReleasetPlanAT from './godkjenn/releasetplan/ReleasetPlanAT';
import IngenlederInfoboks from '../oppfolgingsdialoger/IngenlederInfoboks';
import Samtykke from './godkjenn/samtykke/Samtykke';
import SideOverskrift from './SideOverskrift';
import Tiltak from './tiltak/Tiltak';
import Godkjenn from './godkjenn/godkjenn/Godkjenn';
import Godkjenninger from './godkjenn/godkjenninger/Godkjenninger';

const textOverskrift = (arbeidsgiver) => {
  return `Oppfølgingsplan hos ${arbeidsgiver}`;
};

export const tekster = {
  lagreOppgaveAdvarselTekst: 'Du har ulagrede arbeidsoppgaver. Vil du fortsette?',
  lagreTiltakAdvarselTekst: 'Du har ulagrede tiltak. Vil du fortsette?',
};

const skalViseSamtykke = (oppfolgingsdialog) => {
  return (
    harNaermesteLeder(oppfolgingsdialog) &&
    utenSamtykke(oppfolgingsdialog) &&
    (inneholderGodkjentPlan(oppfolgingsdialog) || inneholderGodkjenningerAvArbeidstaker(oppfolgingsdialog))
  );
};

const skalViseLagreAdvarsel = (inputFormer) => {
  return inputFormer !== undefined && Object.keys(inputFormer).length > 0;
};

export const LagreAdvarselstripe = (props) => {
  return props.steg === 1 ? (
    <Alert variant="warning">{tekster.lagreOppgaveAdvarselTekst}</Alert>
  ) : (
    <Alert variant="warning">{tekster.lagreTiltakAdvarselTekst}</Alert>
  );
};

LagreAdvarselstripe.propTypes = {
  steg: PropTypes.number.isRequired,
};

export const erAvvistAvArbeidstaker = (oppfolgingsdialog) => {
  return (
    oppfolgingsdialog.godkjenninger.length === 1 &&
    !oppfolgingsdialog.godkjenninger[0].godkjent &&
    oppfolgingsdialog.arbeidstaker.fnr === oppfolgingsdialog.godkjenninger[0].godkjentAv.fnr
  );
};

class Oppfolgingsdialog extends Component {
  UNSAFE_componentWillMount() {
    window.location.hash = 'godkjenn';
    window.sessionStorage.setItem('hash', 'godkjenn');

    const {
      oppfolgingsdialog,
      virksomhet,
      person,
      kontaktinfo,
      naermesteleder,
      hentVirksomhet,
      hentPerson,
      hentNaermesteLeder,
      hentKontaktinfo,
      arbeidsforhold,
      hentArbeidsforhold,
    } = this.props;
    this.props.settDialog(oppfolgingsdialog.id);
    finnOgHentVirksomheterSomMangler([oppfolgingsdialog], virksomhet, hentVirksomhet);
    finnOgHentPersonerSomMangler([oppfolgingsdialog], person, hentPerson);
    finnOgHentNaermesteLedereSomMangler([oppfolgingsdialog], naermesteleder, hentNaermesteLeder);
    finnOgHentKontaktinfoSomMangler([oppfolgingsdialog], kontaktinfo, hentKontaktinfo);
    finnOgHentArbeidsforholdSomMangler([oppfolgingsdialog], arbeidsforhold, hentArbeidsforhold);
  }

  render() {
    const {
      arbeidsoppgaver,
      tiltak,
      lagreKommentar,
      slettKommentar,
      oppfolgingsdialog,
      settAktivtSteg,
      avvisDialog,
      godkjennDialog,
      giSamtykke,
      navigasjontoggles,
      nullstillGodkjenning,
      avbrytDialog,
      lagreTiltak,
      slettTiltak,
      lagreArbeidsoppgave,
      slettArbeidsoppgave,
      delMedNavFunc,
      delmednav,
      fastlegeDeling,
      delMedFastlege,
      oppfolgingsdialoger,
      alleInputFormer,
    } = this.props;
    const oppfolgingsdialogAvbruttOgNyOpprettet =
      this.props.avbrytdialogReducer.sendt &&
      this.props.avbrytdialogReducer.nyPlanId === oppfolgingsdialog.id &&
      !inneholderGodkjenninger(oppfolgingsdialog);
    let panel;
    let disableNavigation = false;
    let skalViseAvsluttOgLagre = false;
    let visLagreAdvarsel = false;
    if (skalViseSamtykke(oppfolgingsdialog)) {
      disableNavigation = true;
      panel = <Samtykke sendSamtykke={giSamtykke} oppfolgingsdialog={oppfolgingsdialog} />;
    } else if (
      harNaermesteLeder(oppfolgingsdialog) &&
      inneholderGodkjenninger(oppfolgingsdialog) &&
      !erAvvistAvArbeidstaker(oppfolgingsdialog)
    ) {
      disableNavigation = true;
      panel = (
        <Godkjenninger
          avvisDialog={avvisDialog}
          oppfolgingsdialog={oppfolgingsdialog}
          godkjennPlan={godkjennDialog}
          nullstillGodkjenning={nullstillGodkjenning}
          rootUrlPlaner={`${getContextRoot()}`}
        />
      );
    } else if (harNaermesteLeder(oppfolgingsdialog) && inneholderGodkjentPlan(oppfolgingsdialog)) {
      disableNavigation = true;
      panel = (
        <ReleasetPlanAT
          oppfolgingsdialog={oppfolgingsdialog}
          giSamtykke={giSamtykke}
          avbrytDialog={avbrytDialog}
          delMedNavFunc={delMedNavFunc}
          delmednav={delmednav}
          fastlegeDeling={fastlegeDeling}
          delMedFastlege={delMedFastlege}
          oppfolgingsdialoger={oppfolgingsdialoger}
        />
      );
    } else {
      (() => {
        if (navigasjontoggles.steg === 1) {
          skalViseAvsluttOgLagre = true;
          visLagreAdvarsel = skalViseLagreAdvarsel(alleInputFormer);
          panel = (
            <Arbeidsoppgaver
              arbeidsoppgaver={arbeidsoppgaver}
              oppfolgingsdialog={oppfolgingsdialog}
              lagreArbeidsoppgave={lagreArbeidsoppgave}
              slettArbeidsoppgave={slettArbeidsoppgave}
            />
          );
        } else if (navigasjontoggles.steg === 2) {
          skalViseAvsluttOgLagre = true;
          visLagreAdvarsel = skalViseLagreAdvarsel(alleInputFormer);
          panel = (
            <Tiltak
              tiltak={tiltak}
              oppfolgingsdialog={oppfolgingsdialog}
              lagreTiltak={lagreTiltak}
              slettTiltak={slettTiltak}
              lagreKommentar={lagreKommentar}
              slettKommentar={slettKommentar}
            />
          );
        } else if (!harNaermesteLeder(oppfolgingsdialog)) {
          panel = <IngenlederInfoboks />;
        } else {
          panel = (
            <Godkjenn
              oppfolgingsdialog={oppfolgingsdialog}
              settAktivtSteg={settAktivtSteg}
              godkjennPlan={godkjennDialog}
              rootUrl={`${getContextRoot()}`}
            />
          );
        }
      })();
    }

    return (
      <div className="oppfolgingsdialog">
        {oppfolgingsdialogAvbruttOgNyOpprettet && <AvbruttGodkjentPlanVarsel />}
        <SideOverskrift tittel={textOverskrift(oppfolgingsdialog.virksomhet.navn)} />
        {!disableNavigation && (
          <NavigasjonsTopp
            disabled={disableNavigation}
            navn={oppfolgingsdialog.virksomhet.navn}
            settAktivtSteg={settAktivtSteg}
            steg={navigasjontoggles.steg}
          />
        )}
        <div id="oppfolgingsdialogpanel" className="blokk">
          {panel}
        </div>
        {visLagreAdvarsel && <LagreAdvarselstripe steg={navigasjontoggles.steg} />}
        <NavigasjonsBunn
          disabled={disableNavigation}
          settAktivtSteg={settAktivtSteg}
          steg={navigasjontoggles.steg}
          rootUrlPlaner={getContextRoot()}
        />
        {skalViseAvsluttOgLagre && <LagreOgAvsluttKnapp />}
      </div>
    );
  }
}

Oppfolgingsdialog.propTypes = {
  avbrytdialogReducer: oppfolgingsplanProptypes.avbrytplanReducerPt,
  arbeidsoppgaver: oppfolgingsplanProptypes.arbeidsoppgaverReducerPt,
  tiltak: oppfolgingsplanProptypes.tiltakReducerPt,
  oppfolgingsdialog: oppfolgingsplanProptypes.oppfolgingsplanPt,
  navigasjontoggles: oppfolgingsplanProptypes.navigasjonstogglesReducerPt,
  virksomhet: oppfolgingsplanProptypes.virksomhetReducerPt,
  person: oppfolgingsplanProptypes.personReducerPt,
  naermesteleder: oppfolgingsplanProptypes.naermestelederReducerPt,
  kontaktinfo: oppfolgingsplanProptypes.kontaktinfoReducerPt,
  arbeidsforhold: oppfolgingsplanProptypes.arbeidsforholdReducerPt,
  fastlegeDeling: oppfolgingsplanProptypes.delMedFastlegePt,
  oppfolgingsdialoger: PropTypes.arrayOf(oppfolgingsplanProptypes.oppfolgingsplanPt),
  delmednav: oppfolgingsplanProptypes.delmednavPt,
  lagreKommentar: PropTypes.func,
  slettKommentar: PropTypes.func,
  delMedFastlege: PropTypes.func,
  delMedNavFunc: PropTypes.func,
  godkjennDialog: PropTypes.func,
  nullstillGodkjenning: PropTypes.func,
  giSamtykke: PropTypes.func,
  lagreArbeidsoppgave: PropTypes.func,
  slettArbeidsoppgave: PropTypes.func,
  lagreTiltak: PropTypes.func,
  slettTiltak: PropTypes.func,
  settAktivtSteg: PropTypes.func,
  avvisDialog: PropTypes.func,
  avbrytDialog: PropTypes.func,
  settDialog: PropTypes.func,
  hentVirksomhet: PropTypes.func,
  hentKontaktinfo: PropTypes.func,
  hentPerson: PropTypes.func,
  hentNaermesteLeder: PropTypes.func,
  hentArbeidsforhold: PropTypes.func,
  alleInputFormer: PropTypes.objectOf(PropTypes.any),
};

export default Oppfolgingsdialog;
