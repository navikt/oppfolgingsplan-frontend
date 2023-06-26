import { NextPage } from "next";
import React from "react";

import { beskyttetSideUtenProps } from "../../../auth/beskyttetSide";
import { useInnloggetFnr } from "../../../api/queries/oppfolgingsplan/oppfolgingsplanQueries";
import { useAktivPlanSM } from "../../../api/queries/sykmeldt/oppfolgingsplanerQueriesSM";
import { NyArbeidsoppgaveSM } from "../../../components/arbeidsoppgaver/NyArbeidsoppgaveSM";
import { LagredeArbeidsoppgaver } from "../../../components/arbeidsoppgaver/LagredeArbeidsoppgaver";
import {
  OppfolgingsplanPageSM,
  Page,
} from "../../../components/blocks/wrappers/oppfolgingsplanpagesm/OppfolgingsplanPageSM";
const Arbeidsoppgaver: NextPage = () => {
  const aktivPlan = useAktivPlanSM();
  const innloggetFnr = useInnloggetFnr(aktivPlan);

  return (
    <OppfolgingsplanPageSM page={Page.ARBEIDSOPPGAVER}>
      {innloggetFnr && aktivPlan && (
        <div>
          <NyArbeidsoppgaveSM />
          {aktivPlan.arbeidsoppgaveListe && (
            <LagredeArbeidsoppgaver
              arbeidsoppgaver={aktivPlan.arbeidsoppgaveListe}
              arbeidstakerFnr={innloggetFnr}
            />
          )}
        </div>
      )}
    </OppfolgingsplanPageSM>
  );
};

export const getServerSideProps = beskyttetSideUtenProps;

export default Arbeidsoppgaver;
