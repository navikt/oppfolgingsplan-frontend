import { NextPage } from "next";
import React from "react";
import OppfolgingsplanContent from "../../components/landing/OppfolgingsplanContent";
import { useOppfolgingsplanerSM } from "api/queries/sykmeldt/oppfolgingsplanerQueriesSM";
import { useSykmeldingerSM } from "api/queries/sykmeldt/sykmeldingerQueriesSM";
import { beskyttetSideUtenProps } from "../../auth/beskyttetSide";
import SykmeldtSide from "../../components/blocks/wrappers/SykmeldtSide";

const Home: NextPage = () => {
  const oppfolgingsplaner = useOppfolgingsplanerSM();
  const sykmeldinger = useSykmeldingerSM();

  return (
    <SykmeldtSide
      title="Oppfølgingsplaner - Oversikt"
      heading="Oppfølgingsplaner"
      displayPersonvernInfo={true}
      displayVideo={true}
    >
      <OppfolgingsplanContent
        oppfolgingsplaner={oppfolgingsplaner.data!!}
        sykmeldinger={sykmeldinger.data!!}
      />
    </SykmeldtSide>
  );
};

export const getServerSideProps = beskyttetSideUtenProps;

export default Home;
