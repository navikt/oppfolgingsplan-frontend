import { NextPage } from "next";
import { useAktivPlanSM } from "../../../api/queries/sykmeldt/oppfolgingsplanerQueriesSM";
import { SendTilGodkjenningSM } from "../../../components/seplanen/sendtilgodkjenning/SendTilGodkjenningSM";
import { OppfolgingsplanOversikt } from "../../../components/seplanen/OppfolgingsplanOversikt";
import { beskyttetSideUtenProps } from "../../../auth/beskyttetSide";
import {
  OppfolgingsplanPageSM,
  Page,
} from "../../../components/blocks/wrappers/oppfolgingsplanpagesm/OppfolgingsplanPageSM";
import { GodkjennEgenPlan } from "../../../components/seplanen/sendtilgodkjenning/GodkjennEgenPlan";
import React from "react";

const Seplanen: NextPage = () => {
  const aktivPlan = useAktivPlanSM();
  const arbeidstakerFnr = aktivPlan?.arbeidstaker.fnr;
  const narmesteLederFnr = aktivPlan?.arbeidsgiver?.naermesteLeder?.fnr;

  const isOwnLeader =
    narmesteLederFnr && arbeidstakerFnr && narmesteLederFnr === arbeidstakerFnr;

  return (
    <OppfolgingsplanPageSM page={Page.SEPLANEN}>
      <OppfolgingsplanOversikt oppfolgingsplan={aktivPlan} />
      {!isOwnLeader && aktivPlan && (
        <SendTilGodkjenningSM oppfolgingsplan={aktivPlan} />
      )}
      {isOwnLeader && aktivPlan && (
        <GodkjennEgenPlan oppfolgingsplan={aktivPlan} />
      )}
    </OppfolgingsplanPageSM>
  );
};

export const getServerSideProps = beskyttetSideUtenProps;

export default Seplanen;
