import { NextPage } from "next";
import React from "react";
import {
  OppfolgingsplanPageAG,
  Page,
} from "../../../../components/blocks/wrappers/OppfolgingsplanPageAG";
import { LagredeArbeidsoppgaver } from "../../../../components/arbeidsoppgaver/LagredeArbeidsoppgaver";
import { beskyttetSideUtenProps } from "../../../../auth/beskyttetSide";
import { NyArbeidsoppgaveAG } from "../../../../components/arbeidsoppgaver/NyArbeidsoppgaveAG";
import { useAktivPlanAG } from "../../../../api/queries/arbeidsgiver/oppfolgingsplanerQueriesAG";
import { useInnloggetFnr } from "../../../../api/queries/oppfolgingsplan/oppfolgingsplanQueries";

const Arbeidsoppgaver: NextPage = () => {
  const aktivPlan = useAktivPlanAG();
  const innloggetFnr = useInnloggetFnr(aktivPlan);

  return (
    <OppfolgingsplanPageAG page={Page.ARBEIDSOPPGAVER}>
      {innloggetFnr && aktivPlan && (
        <div>
          <NyArbeidsoppgaveAG />
          {aktivPlan.arbeidsoppgaveListe && (
            <LagredeArbeidsoppgaver
              arbeidsoppgaver={aktivPlan.arbeidsoppgaveListe}
              arbeidstakerFnr={aktivPlan.arbeidstaker.fnr}
            />
          )}
        </div>
      )}
    </OppfolgingsplanPageAG>
  );
};

export const getServerSideProps = beskyttetSideUtenProps;

export default Arbeidsoppgaver;
