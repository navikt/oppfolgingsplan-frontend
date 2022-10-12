import {NyArbeidsoppgave} from "@/common/components/arbeidsoppgaver/NyArbeidsoppgave";
import { useAktivPlanSM } from "@/common/api/queries/sykmeldt/oppfolgingsplanerQueriesSM";
import {OppfolgingsplanPageSM, Page,} from "@/common/components/wrappers/OppfolgingsplanPageSM";
import {NextPage} from "next";
import React from "react";

const Arbeidsoppgaver: NextPage = () => {
  const aktivPlan = useAktivPlanSM();

  return (
    <OppfolgingsplanPageSM page={Page.ARBEIDSOPPGAVER}>
      {aktivPlan && (
          <div>
            <NyArbeidsoppgave />
          </div>
      )}
    </OppfolgingsplanPageSM>
  );
};

export default Arbeidsoppgaver;
