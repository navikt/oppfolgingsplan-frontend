import { NextPage } from "next";
import React from "react";
import {
  OppfolgingsplanPageSM,
  Page,
} from "@/common/components/wrappers/OppfolgingsplanPageSM";
import { useAktivPlanSM } from "@/common/api/queries/sykmeldt/oppfolgingsplanerQueriesSM";
import { OppfolgingsplanOversikt } from "@/common/components/oversikt/OppfolgingsplanOversikt";
import { SendTilGodkjenning } from "../../../sykmeldt/components/oppfolgingsplan/sendTilGodkjenning/SendTilGodkjenning";

const Seplanen: NextPage = () => {
  const aktivPlan = useAktivPlanSM();

  return (
    <OppfolgingsplanPageSM page={Page.SEPLANEN}>
      <OppfolgingsplanOversikt oppfolgingsplan={aktivPlan} />
      <SendTilGodkjenning oppfolgingsplan={aktivPlan} />
    </OppfolgingsplanPageSM>
  );
};

export default Seplanen;
