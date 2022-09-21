import React from 'react';
import NavigasjonsTopp from './NavigasjonsTopp';
import SideOverskrift from './SideOverskrift';
import {Oppfolgingsplan} from "@/types/oppfolgingsplanservice/oppfolgingsplanTypes";

const textOverskrift = (arbeidsgiver: string) => {
    return `Oppfølgingsplan hos ${arbeidsgiver}`;
};

export const tekster = {
    lagreOppgaveAdvarselTekst: 'Du har ulagrede arbeidsoppgaver. Vil du fortsette?',
    lagreTiltakAdvarselTekst: 'Du har ulagrede tiltak. Vil du fortsette?',
};

// const skalViseSamtykke = (oppfolgingsplan: Oppfolgingsplan) => {
//   return (
//     harNaermesteLeder(oppfolgingsplan) &&
//     utenSamtykke(oppfolgingsplan) &&
//     (inneholderGodkjentPlan(oppfolgingsplan) || inneholderGodkjenningerAvArbeidstaker(oppfolgingsplan))
//   );
// };
//
// const skalViseLagreAdvarsel = (inputFormer) => {
//   return inputFormer !== undefined && Object.keys(inputFormer).length > 0;
// };
//
// export const LagreAdvarselstripe = (props) => {
//   return props.steg === 1 ? (
//     <Alert variant="warning">{tekster.lagreOppgaveAdvarselTekst}</Alert>
//   ) : (
//     <Alert variant="warning">{tekster.lagreTiltakAdvarselTekst}</Alert>
//   );
// };
//
// export const erAvvistAvArbeidstaker = (oppfolgingsdialog) => {
//   return (
//     oppfolgingsdialog.godkjenninger.length === 1 &&
//     !oppfolgingsdialog.godkjenninger[0].godkjent &&
//     oppfolgingsdialog.arbeidstaker.fnr === oppfolgingsdialog.godkjenninger[0].godkjentAv.fnr
//   );
// };

interface Props {
    aktivPlan: Oppfolgingsplan
}

const Oppfolgingsplan = ({aktivPlan}: Props) => {


    //
    // const oppfolgingsdialogAvbruttOgNyOpprettet =
    //   this.props.avbrytdialogReducer.sendt &&
    //   this.props.avbrytdialogReducer.nyPlanId === oppfolgingsdialog.id &&
    //   !inneholderGodkjenninger(oppfolgingsdialog);
    // let panel;
    // let disableNavigation = false;
    // let skalViseAvsluttOgLagre = false;
    // let visLagreAdvarsel = false;
    // if (skalViseSamtykke(oppfolgingsdialog)) {
    //   disableNavigation = true;
    //   panel = <Samtykke sendSamtykke={giSamtykke} oppfolgingsdialog={oppfolgingsdialog} />;
    // } else if (
    //   harNaermesteLeder(oppfolgingsdialog) &&
    //   inneholderGodkjenninger(oppfolgingsdialog) &&
    //   !erAvvistAvArbeidstaker(oppfolgingsdialog)
    // ) {
    //   disableNavigation = true;
    //   panel = (
    //     <Godkjenninger
    //       avvisDialog={avvisDialog}
    //       oppfolgingsdialog={oppfolgingsdialog}
    //       godkjennPlan={godkjennDialog}
    //       nullstillGodkjenning={nullstillGodkjenning}
    //       rootUrlPlaner={`${getContextRoot()}`}
    //     />
    //   );
    // } else if (harNaermesteLeder(oppfolgingsdialog) && inneholderGodkjentPlan(oppfolgingsdialog)) {
    //   disableNavigation = true;
    //   panel = (
    //     <ReleasetPlanAT
    //       oppfolgingsdialog={oppfolgingsdialog}
    //       giSamtykke={giSamtykke}
    //       avbrytDialog={avbrytDialog}
    //       delMedNavFunc={delMedNavFunc}
    //       delmednav={delmednav}
    //       fastlegeDeling={fastlegeDeling}
    //       delMedFastlege={delMedFastlege}
    //       oppfolgingsdialoger={oppfolgingsdialoger}
    //     />
    //   );
    // } else {
    //   (() => {
    //     if (navigasjontoggles.steg === 1) {
    //       skalViseAvsluttOgLagre = true;
    //       visLagreAdvarsel = skalViseLagreAdvarsel(alleInputFormer);
    //       panel = (
    //         <Arbeidsoppgaver
    //           arbeidsoppgaver={arbeidsoppgaver}
    //           oppfolgingsdialog={oppfolgingsdialog}
    //           lagreArbeidsoppgave={lagreArbeidsoppgave}
    //           slettArbeidsoppgave={slettArbeidsoppgave}
    //         />
    //       );
    //     } else if (navigasjontoggles.steg === 2) {
    //       skalViseAvsluttOgLagre = true;
    //       visLagreAdvarsel = skalViseLagreAdvarsel(alleInputFormer);
    //       panel = (
    //         <Tiltak
    //           tiltak={tiltak}
    //           oppfolgingsdialog={oppfolgingsdialog}
    //           lagreTiltak={lagreTiltak}
    //           slettTiltak={slettTiltak}
    //           lagreKommentar={lagreKommentar}
    //           slettKommentar={slettKommentar}
    //         />
    //       );
    //     } else if (!harNaermesteLeder(oppfolgingsdialog)) {
    //       panel = <IngenlederInfoboks />;
    //     } else {
    //       panel = (
    //         <Godkjenn
    //           oppfolgingsdialog={oppfolgingsdialog}
    //           settAktivtSteg={settAktivtSteg}
    //           godkjennPlan={godkjennDialog}
    //           rootUrl={`${getContextRoot()}`}
    //         />
    //       );
    //     }
    //   })();
    // }

    return (
        <div>
            {/*{oppfolgingsdialogAvbruttOgNyOpprettet && <AvbruttGodkjentPlanVarsel />}*/}
            <SideOverskrift tittel={textOverskrift(aktivPlan.virksomhet.navn)}/>
            <NavigasjonsTopp
                disabled={false}
                navn={aktivPlan.virksomhet.navn}
                settAktivtSteg={() => {
                    console.log("b")
                }}
                steg={1}
            />
            <div id="oppfolgingsdialogpanel" className="blokk">
                {/*{panel}*/}
            </div>
            {/*{visLagreAdvarsel && <LagreAdvarselstripe steg={navigasjontoggles.steg} />}*/}
            {/*<NavigasjonsBunn*/}
            {/*  disabled={disableNavigation}*/}
            {/*  settAktivtSteg={settAktivtSteg}*/}
            {/*  steg={navigasjontoggles.steg}*/}
            {/*  rootUrlPlaner={getContextRoot()}*/}
            {/*/>*/}
            {/*{skalViseAvsluttOgLagre && <LagreOgAvsluttKnapp />}*/}
        </div>
    );
}

// Oppfolgingsdialog.propTypes = {
//   avbrytdialogReducer: oppfolgingsplanProptypes.avbrytplanReducerPt,
//   arbeidsoppgaver: oppfolgingsplanProptypes.arbeidsoppgaverReducerPt,
//   tiltak: oppfolgingsplanProptypes.tiltakReducerPt,
//   oppfolgingsdialog: oppfolgingsplanProptypes.oppfolgingsplanPt,
//   navigasjontoggles: oppfolgingsplanProptypes.navigasjonstogglesReducerPt,
//   virksomhet: oppfolgingsplanProptypes.virksomhetReducerPt,
//   person: oppfolgingsplanProptypes.personReducerPt,
//   naermesteleder: oppfolgingsplanProptypes.naermestelederReducerPt,
//   kontaktinfo: oppfolgingsplanProptypes.kontaktinfoReducerPt,
//   arbeidsforhold: oppfolgingsplanProptypes.arbeidsforholdReducerPt,
//   fastlegeDeling: oppfolgingsplanProptypes.delMedFastlegePt,
//   oppfolgingsdialoger: PropTypes.arrayOf(oppfolgingsplanProptypes.oppfolgingsplanPt),
//   delmednav: oppfolgingsplanProptypes.delmednavPt,
//   lagreKommentar: PropTypes.func,
//   slettKommentar: PropTypes.func,
//   delMedFastlege: PropTypes.func,
//   delMedNavFunc: PropTypes.func,
//   godkjennDialog: PropTypes.func,
//   nullstillGodkjenning: PropTypes.func,
//   giSamtykke: PropTypes.func,
//   lagreArbeidsoppgave: PropTypes.func,
//   slettArbeidsoppgave: PropTypes.func,
//   lagreTiltak: PropTypes.func,
//   slettTiltak: PropTypes.func,
//   settAktivtSteg: PropTypes.func,
//   avvisDialog: PropTypes.func,
//   avbrytDialog: PropTypes.func,
//   settDialog: PropTypes.func,
//   hentVirksomhet: PropTypes.func,
//   hentKontaktinfo: PropTypes.func,
//   hentPerson: PropTypes.func,
//   hentNaermesteLeder: PropTypes.func,
//   hentArbeidsforhold: PropTypes.func,
//   alleInputFormer: PropTypes.objectOf(PropTypes.any),
// };

export default Oppfolgingsplan;
