import { useAktivPlanSM } from "api/queries/sykmeldt/oppfolgingsplanerQueriesSM";

import { NextPage } from "next";
import React from "react";
import {
  OppfolgingsplanPageSM,
  Page,
} from "components/blocks/wrappers/OppfolgingsplanPageSM";
import { LagredeArbeidsoppgaver } from "components/arbeidsoppgaver/LagredeArbeidsoppgaver";
import { NyArbeidsoppgave } from "components/arbeidsoppgaver/NyArbeidsoppgave";
import { beskyttetSideUtenProps } from "../../../auth/beskyttetSide";

const Arbeidsoppgaver: NextPage = () => {
  const aktivPlan = useAktivPlanSM();

  const arbeidstakerFnr = aktivPlan?.arbeidstaker.fnr;
  if (!arbeidstakerFnr) return null;

  return (
    <OppfolgingsplanPageSM page={Page.ARBEIDSOPPGAVER}>
      {aktivPlan && (
        <div>
          <NyArbeidsoppgave />
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
