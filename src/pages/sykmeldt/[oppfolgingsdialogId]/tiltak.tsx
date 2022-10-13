import { NextPage } from "next";
import React from "react";
import { useAktivPlanSM } from "@/common/api/queries/sykmeldt/oppfolgingsplanerQueriesSM";
import {
  OppfolgingsplanPageSM,
  Page,
} from "@/common/components/wrappers/OppfolgingsplanPageSM";
import { NyttTiltak } from "@/common/components/tiltak/NyttTiltak";
import { LagredeTiltak } from "@/common/components/tiltak/LagredeTiltak";

const Tiltak: NextPage = () => {
  const aktivPlan = useAktivPlanSM();

  return (
    <OppfolgingsplanPageSM page={Page.TILTAK}>
      {aktivPlan && (
        <div>
          <NyttTiltak />

          <LagredeTiltak oppfolgingsplan={aktivPlan} />
        </div>
      )}
    </OppfolgingsplanPageSM>
  );
};

export default Tiltak;
