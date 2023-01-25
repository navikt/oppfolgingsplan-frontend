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

const Arbeidsoppgaver: NextPage = () => {
  const aktivPlan = useAktivPlanSM();
  const arbeidstakerFnr = aktivPlan?.arbeidstaker.fnr;

  return (
    <OppfolgingsplanPageSM page={Page.ARBEIDSOPPGAVER}>
      {arbeidstakerFnr && aktivPlan && (
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
