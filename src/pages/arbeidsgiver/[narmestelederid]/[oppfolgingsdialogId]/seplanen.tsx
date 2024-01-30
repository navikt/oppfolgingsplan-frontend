import { NextPage } from "next";
import { OppfolgingsplanOversikt } from "../../../../components/seplanen/OppfolgingsplanOversikt";
import { beskyttetSideUtenProps } from "../../../../auth/beskyttetSide";
import { SendTilGodkjenningAG } from "../../../../components/seplanen/sendtilgodkjenning/SendTilGodkjenningAG";
import { useOppfolgingsplanerAG } from "../../../../api/queries/arbeidsgiver/oppfolgingsplanerQueriesAG";
import { GodkjennEgenPlanAG } from "../../../../components/seplanen/sendtilgodkjenning/GodkjennEgenPlanAG";
import {
  OppfolgingsplanPageAG,
  Page,
} from "../../../../components/blocks/wrappers/oppfolgingsplanpageag/OppfolgingsplanPageAG";
import { useOppfolgingsplanRouteId } from "../../../../hooks/routeHooks";
import React from "react";
import { findAktivPlan } from "../../../../utils/oppfolgingplanUtils";
import { OppfolgingsplanDTO } from "../../../../schema/oppfolgingsplanSchema";

interface ContentProps {
  aktivPlan?: OppfolgingsplanDTO;
}

const SePlanenContent = ({ aktivPlan }: ContentProps) => {
  if (!aktivPlan) return null;
  const arbeidstakerFnr = aktivPlan?.arbeidstaker.fnr;
  const narmesteLederFnr = aktivPlan?.arbeidsgiver?.naermesteLeder?.navn;

  const isOwnLeader =
    narmesteLederFnr && arbeidstakerFnr && narmesteLederFnr === arbeidstakerFnr;

  return (
    <>
      <OppfolgingsplanOversikt oppfolgingsplan={aktivPlan} />
      {!isOwnLeader && aktivPlan && (
        <SendTilGodkjenningAG oppfolgingsplan={aktivPlan} />
      )}
      {isOwnLeader && aktivPlan && (
        <GodkjennEgenPlanAG oppfolgingsplan={aktivPlan} />
      )}
    </>
  );
};

const Seplanen: NextPage = () => {
  const allePlaner = useOppfolgingsplanerAG();
  const id = useOppfolgingsplanRouteId();

  return (
    <OppfolgingsplanPageAG page={Page.SEPLANEN}>
      {allePlaner.isSuccess ? (
        <SePlanenContent aktivPlan={findAktivPlan(id, allePlaner.data)} />
      ) : null}
    </OppfolgingsplanPageAG>
  );
};

export const getServerSideProps = beskyttetSideUtenProps;

export default Seplanen;
