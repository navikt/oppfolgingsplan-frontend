import { NextPage } from "next";
import React from "react";
import {
  OppfolgingsplanPageAG,
  Page,
} from "components/blocks/wrappers/OppfolgingsplanPageAG";
import { LagredeArbeidsoppgaver } from "components/arbeidsoppgaver/LagredeArbeidsoppgaver";
import { beskyttetSideUtenProps } from "../../../../auth/beskyttetSide";
import { NyArbeidsoppgaveAG } from "../../../../components/arbeidsoppgaver/NyArbeidsoppgaveAG";
import { useAktivPlanAG } from "../../../../api/queries/arbeidsgiver/oppfolgingsplanerQueriesAG";

const Arbeidsoppgaver: NextPage = () => {
  const aktivPlan = useAktivPlanAG();
  const innloggetFnr = aktivPlan?.arbeidsgiver.naermesteLeder?.fnr;

  return (
    <OppfolgingsplanPageAG page={Page.ARBEIDSOPPGAVER}>
      {innloggetFnr && aktivPlan && (
        <div>
          <NyArbeidsoppgaveAG />
          {aktivPlan.arbeidsoppgaveListe && (
            <LagredeArbeidsoppgaver
              innloggetFnr={innloggetFnr}
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
