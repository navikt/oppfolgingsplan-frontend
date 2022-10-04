import React from "react";
import { Heading } from "@navikt/ds-react";
import { OppfolgingsplanStepper } from "@/common/components/stepper/OppfolgingsplanStepper";
import { OppfolgingsplanDTO } from "@/server/service/schema/oppfolgingsplanSchema";

const textOverskrift = (arbeidsgiver: string) => {
  return `Oppfølgingsplan hos ${arbeidsgiver}`;
};

export const tekster = {
  lagreOppgaveAdvarselTekst:
    "Du har ulagrede arbeidsoppgaver. Vil du fortsette?",
  lagreTiltakAdvarselTekst: "Du har ulagrede tiltak. Vil du fortsette?",
};

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
  aktivPlan: OppfolgingsplanDTO;
}

const Oppfolgingsplan = ({ aktivPlan }: Props) => {
  //
  // const oppfolgingsdialogAvbruttOgNyOpprettet =
  //   this.props.avbrytdialogReducer.sendt &&
  //   this.props.avbrytdialogReducer.nyPlanId === oppfolgingsdialog.id &&
  //   !inneholderGodkjenninger(oppfolgingsdialog);
  // let panel;
  // let disableNavigation = false;
  // let skalViseAvsluttOgLagre = false;
  // let visLagreAdvarsel = false;
  // if (
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
      <Heading spacing={true} level="1" size="large">
        {textOverskrift(aktivPlan?.virksomhet?.navn ?? "")}
      </Heading>
      <OppfolgingsplanStepper activeStep={1} />

      {/*<Arbeidsoppgaver*/}
      {/*              arbeidsoppgaver={arbeidsoppgaver}*/}
      {/*              oppfolgingsdialog={aktivPlan}*/}
      {/*              lagreArbeidsoppgave={() => console.log("todo lagre arbeidsoppgave")}*/}
      {/*              slettArbeidsoppgave={() => console.log("todo slett arbeidsoppgave")}*/}
      {/*            />*/}
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
};

export default Oppfolgingsplan;
