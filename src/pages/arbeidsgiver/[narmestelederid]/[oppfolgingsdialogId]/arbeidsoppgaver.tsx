import { useChosenAktivOppfolgingsplanAG } from "api/queries/arbeidsgiver/oppfolgingsplanerQueriesAG";

import { NextPage } from "next";
import React from "react";
import {
  OppfolgingsplanPageAG,
  Page,
} from "components/blocks/wrappers/OppfolgingsplanPageAG";
import { LagredeArbeidsoppgaver } from "components/arbeidsoppgaver/LagredeArbeidsoppgaver";
import { beskyttetSideUtenProps } from "../../../../auth/beskyttetSide";
import { NyArbeidsoppgaveAG } from "../../../../components/arbeidsoppgaver/NyArbeidsoppgaveAG";
import {SpacedDiv} from "../../../../components/blocks/wrappers/SpacedDiv";
import Feilmelding from "../../../../components/blocks/error/Feilmelding";

const Arbeidsoppgaver: NextPage = () => {
  const aktivPlan = useChosenAktivOppfolgingsplanAG();
  const arbeidstakerFnr = aktivPlan?.arbeidstaker.fnr;
  if (!arbeidstakerFnr) {
    return (
        <SpacedDiv>
          <Feilmelding
              description={
                "Oppfolgingsplan mangler arbeidstakers fødselsnummer. Vennligst prøv igjen senere."
              }
          />
        </SpacedDiv>
    )
  }

  return (
    <OppfolgingsplanPageAG page={Page.ARBEIDSOPPGAVER}>
      {aktivPlan && (
        <div>
          <NyArbeidsoppgaveAG />
          {aktivPlan.arbeidsoppgaveListe && (
            <LagredeArbeidsoppgaver
              arbeidstakerFnr={arbeidstakerFnr}
              arbeidsoppgaver={aktivPlan.arbeidsoppgaveListe}
            />
          )}
        </div>
      )}
    </OppfolgingsplanPageAG>
  );
};

export const getServerSideProps = beskyttetSideUtenProps;

export default Arbeidsoppgaver;
