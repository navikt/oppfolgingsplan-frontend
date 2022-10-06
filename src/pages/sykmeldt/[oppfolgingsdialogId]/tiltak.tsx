import { NextPage } from "next";
import React from "react";
import { useOppfolgingsplanRouteId } from "@/common/hooks/routeHooks";
import { useOppfolgingsplanSM } from "@/common/api/queries/sykmeldt/oppfolgingsplanerQueriesSM";
import {
  OppfolgingsplanPageSM,
  Page,
} from "@/common/components/wrappers/OppfolgingsplanPageSM";
import { NyttTiltak } from "@/common/components/tiltak/NyttTiltak";
import { LagredeTiltak } from "@/common/components/tiltak/LagredeTiltak";

const Tiltak: NextPage = () => {
  const oppfolgingsdialogId = useOppfolgingsplanRouteId();
  const aktivPlan = useOppfolgingsplanSM(oppfolgingsdialogId);

  return (
    <OppfolgingsplanPageSM page={Page.TILTAK}>
      {aktivPlan && (
        <div>
          <NyttTiltak oppfolgingsplanId={aktivPlan.id} />

          <LagredeTiltak oppfolgingsplan={aktivPlan} />
        </div>
      )}
    </OppfolgingsplanPageSM>
  );
};

export default Tiltak;
