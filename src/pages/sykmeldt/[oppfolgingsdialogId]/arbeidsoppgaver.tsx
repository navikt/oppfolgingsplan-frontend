import { useAktivPlanSM } from "api/queries/sykmeldt/oppfolgingsplanerQueriesSM";

import { NextPage } from "next";
import React from "react";
import {
  OppfolgingsplanPageSM,
  Page,
} from "components/blocks/wrappers/OppfolgingsplanPageSM";
import { LagredeArbeidsoppgaver } from "components/arbeidsoppgaver/LagredeArbeidsoppgaver";
import { NyArbeidsoppgaveSM } from "components/arbeidsoppgaver/NyArbeidsoppgaveSM";
import { beskyttetSideUtenProps } from "../../../auth/beskyttetSide";
import {SpacedDiv} from "../../../components/blocks/wrappers/SpacedDiv";
import Feilmelding from "../../../components/blocks/error/Feilmelding";

const Arbeidsoppgaver: NextPage = () => {
  const aktivPlan = useAktivPlanSM();

  const arbeidstakerFnr = aktivPlan?.arbeidstaker.fnr;
  if (!arbeidstakerFnr) {
    return  (
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
    <OppfolgingsplanPageSM page={Page.ARBEIDSOPPGAVER}>
      {aktivPlan && (
        <div>
          <NyArbeidsoppgaveSM />
          {aktivPlan.arbeidsoppgaveListe && (
            <LagredeArbeidsoppgaver
              arbeidstakerFnr={arbeidstakerFnr}
              arbeidsoppgaver={aktivPlan.arbeidsoppgaveListe}
            />
          )}
        </div>
      )}
    </OppfolgingsplanPageSM>
  );
};

export const getServerSideProps = beskyttetSideUtenProps;

export default Arbeidsoppgaver;
