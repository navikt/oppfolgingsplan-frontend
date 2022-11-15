import { NextPage } from "next";
import React from "react";
import OppfolgingsplanContent from "../../components/landing/OppfolgingsplanContent";
import { useOppfolgingsplanerSM } from "api/queries/sykmeldt/oppfolgingsplanerQueriesSM";
import { useSykmeldingerSM } from "api/queries/sykmeldt/sykmeldingerQueriesSM";
import Side from "components/blocks/wrappers/Side";

const Home: NextPage = () => {
  const oppfolgingsplaner = useOppfolgingsplanerSM();
  const sykmeldinger = useSykmeldingerSM();

  return (
    <Side
      title="Dine oppfølgingsplaner - Oversikt"
      heading="Dine oppfølgingsplaner"
      displayPersonvernInfo={true}
      displayVideo={true}
    >
      <OppfolgingsplanContent
        oppfolgingsplaner={oppfolgingsplaner.data!!}
        sykmeldinger={sykmeldinger.data!!}
      />
    </Side>
  );
};

export default Home;
