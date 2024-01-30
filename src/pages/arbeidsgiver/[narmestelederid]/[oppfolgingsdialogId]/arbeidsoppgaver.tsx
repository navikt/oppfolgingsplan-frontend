import { NextPage } from "next";
import React from "react";
import { LagredeArbeidsoppgaver } from "../../../../components/arbeidsoppgaver/LagredeArbeidsoppgaver";
import { beskyttetSideUtenProps } from "../../../../auth/beskyttetSide";
import { NyArbeidsoppgaveAG } from "../../../../components/arbeidsoppgaver/NyArbeidsoppgaveAG";
import { useOppfolgingsplanerAG } from "../../../../api/queries/arbeidsgiver/oppfolgingsplanerQueriesAG";
import {
  OppfolgingsplanPageAG,
  Page,
} from "../../../../components/blocks/wrappers/oppfolgingsplanpageag/OppfolgingsplanPageAG";
import { useOppfolgingsplanRouteId } from "../../../../hooks/routeHooks";
import { findAktivPlan } from "../../../../utils/oppfolgingplanUtils";
import { OppfolgingsplanDTO } from "../../../../schema/oppfolgingsplanSchema";

interface ContentProps {
  aktivPlan?: OppfolgingsplanDTO;
}

const ArbeidsoppgaveContent = ({ aktivPlan }: ContentProps) => {
  if (!aktivPlan) return null;

  return (
    <div>
      <NyArbeidsoppgaveAG />
      {aktivPlan.arbeidsoppgaveListe && (
        <LagredeArbeidsoppgaver
          arbeidsoppgaver={aktivPlan.arbeidsoppgaveListe}
          arbeidstakerFnr={aktivPlan.arbeidstaker.fnr}
        />
      )}
    </div>
  );
};

const Arbeidsoppgaver: NextPage = () => {
  const allePlaner = useOppfolgingsplanerAG();
  const id = useOppfolgingsplanRouteId();

  return (
    <OppfolgingsplanPageAG page={Page.ARBEIDSOPPGAVER}>
      {allePlaner.isSuccess ? (
        <ArbeidsoppgaveContent aktivPlan={findAktivPlan(id, allePlaner.data)} />
      ) : null}
    </OppfolgingsplanPageAG>
  );
};

export const getServerSideProps = beskyttetSideUtenProps;

export default Arbeidsoppgaver;
