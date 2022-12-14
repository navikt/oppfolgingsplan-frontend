import { NextPage } from "next";
import React from "react";
import { useAktivPlanSM } from "api/queries/sykmeldt/oppfolgingsplanerQueriesSM";
import { NyttTiltak } from "components/tiltak/NyttTiltak";
import {
  OppfolgingsplanPageSM,
  Page,
} from "components/blocks/wrappers/OppfolgingsplanPageSM";
import { LagredeTiltak } from "components/tiltak/LagredeTiltak";
import { beskyttetSideUtenProps } from "../../../auth/beskyttetSide";

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

export const getServerSideProps = beskyttetSideUtenProps;

export default Tiltak;
