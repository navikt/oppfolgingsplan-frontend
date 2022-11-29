import { NextPage } from "next";
import React from "react";
import OppfolgingsplanContent from "../../components/landing/OppfolgingsplanContent";
import { useOppfolgingsplanerSM } from "api/queries/sykmeldt/oppfolgingsplanerQueriesSM";
import { useSykmeldingerSM } from "api/queries/sykmeldt/sykmeldingerQueriesSM";
import Side from "components/blocks/wrappers/Side";
import { beskyttetSideUtenProps } from "../../auth/beskyttetSide";

const texts = {
  pageTitle: "Oppfølgingsplaner - Oversikt",
  pageHeader: "Oppfølgingsplaner",
  brodsmuler: {
    dittSykefravaer: "Ditt sykefravær",
    dineOppfolgingsplaner: "Dine oppfølgingsplaner",
  },
};

const Home: NextPage = () => {
  const oppfolgingsplaner = useOppfolgingsplanerSM();
  const sykmeldinger = useSykmeldingerSM();

  return (
    <Side
      title={texts.pageTitle}
      heading={texts.pageHeader}
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

export const getServerSideProps = beskyttetSideUtenProps;

export default Home;
