import { NextPage } from "next";
import React from "react";
import {
  OppfolgingsplanPageSM,
  Page,
} from "@/common/components/wrappers/OppfolgingsplanPageSM";
import { useOppfolgingsplanRouteId } from "@/common/hooks/routeHooks";
import { useOppfolgingsplanSM } from "@/common/api/queries/sykmeldt/oppfolgingsplanerQueriesSM";
import { OppfolgingsplanOversikt } from "@/common/components/oversikt/OppfolgingsplanOversikt";

const Seplanen: NextPage = () => {
  const oppfolgingsdialogId = useOppfolgingsplanRouteId();
  const aktivPlan = useOppfolgingsplanSM(oppfolgingsdialogId);

  return (
    <OppfolgingsplanPageSM page={Page.SEPLANEN}>
      <OppfolgingsplanOversikt oppfolgingsplan={aktivPlan} />
    </OppfolgingsplanPageSM>
  );
};

export default Seplanen;
