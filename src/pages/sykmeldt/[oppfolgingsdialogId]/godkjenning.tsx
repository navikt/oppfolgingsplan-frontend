import { NextPage } from "next";
import React from "react";
import { useAktivPlanSM } from "@/common/api/queries/sykmeldt/oppfolgingsplanerQueriesSM";
import Side from "@/common/components/wrappers/Side";
import { OppfolgingsdialogerGodkjenn } from "../../../sykmeldt/components/oppfolgingsplan/godkjenn/OppfolgingsdialogerGodkjenn";

const Godkjenning: NextPage = () => {
  const aktivPlan = useAktivPlanSM();

  return (
    <Side
      title={`Godkjenn ${aktivPlan?.virksomhet?.navn}`}
      heading={`Du har mottatt en ny plan for ${aktivPlan?.virksomhet?.navn}`}
    >
      <OppfolgingsdialogerGodkjenn oppfolgingsplan={aktivPlan!!} />
    </Side>
  );

  // return <OppfolgingsdialogerGodkjenn oppfolgingsplan={aktivPlan!!} />
};

export default Godkjenning;
