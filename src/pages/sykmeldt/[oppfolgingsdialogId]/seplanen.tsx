import { NextPage } from "next";
import React from "react";
import { useOppfolgingsplanRouteId } from "@/common/hooks/routeHooks";
import {
  useOppfolgingsplanerSM,
  useOppfolgingsplanSM,
} from "@/common/api/queries/sykmeldt/oppfolgingsplanerQueriesSM";
import {
  OppfolgingsplanPageSM,
  Page,
} from "@/common/components/wrappers/OppfolgingsplanPageSM";

const Seplanen: NextPage = () => {
  const oppfolgingsdialogId = useOppfolgingsplanRouteId();
  const oppfolgingsplaner = useOppfolgingsplanerSM();
  const aktivPlan = useOppfolgingsplanSM(oppfolgingsdialogId);

  return (
    <OppfolgingsplanPageSM
      isLoading={oppfolgingsplaner.isLoading}
      isError={oppfolgingsplaner.isError}
      oppfolgingsplan={aktivPlan}
      page={Page.SEPLANEN}
    >
      hei
    </OppfolgingsplanPageSM>
  );
};

export default Seplanen;
