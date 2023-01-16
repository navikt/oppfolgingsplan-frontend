import { NextPage } from "next";
import React from "react";
import { NyttTiltak } from "components/tiltak/NyttTiltak";
import {
  Page,
} from "components/blocks/wrappers/OppfolgingsplanPageSM";
import { LagredeTiltak } from "components/tiltak/LagredeTiltak";
import {OppfolgingsplanPageAG} from "../../../../components/blocks/wrappers/OppfolgingsplanPageAG";
import {useAktivPlanAG} from "../../../../api/queries/arbeidsgiver/oppfolgingsplanerQueriesAG";
import {beskyttetSideUtenProps} from "../../../../auth/beskyttetSide";

const Tiltak: NextPage = () => {
  const aktivPlan = useAktivPlanAG();

  return (
    <OppfolgingsplanPageAG page={Page.TILTAK}>
      {aktivPlan && (
        <div>
          <NyttTiltak />

          <LagredeTiltak oppfolgingsplan={aktivPlan} />
        </div>
      )}
    </OppfolgingsplanPageAG>
  );
};

export const getServerSideProps = beskyttetSideUtenProps;

export default Tiltak;
