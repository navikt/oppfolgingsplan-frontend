import { NextPage } from "next";
import React from "react";
import Side from "@/common/components/wrappers/Side";
import OppfolgingsplanContent from "../../sykmeldt/components/oppfolgingsplan/OppfolgingsplanContent";
import { useOppfolgingsplanerSM } from "@/common/api/queries/sykmeldt/oppfolgingsplanerQueriesSM";
import { useSykmeldingerSM } from "@/common/api/queries/sykmeldt/sykmeldingerQueriesSM";
import { useNarmesteLedereSM } from "@/common/api/queries/sykmeldt/narmesteLedereQueriesSM";

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
  const narmesteLedere = useNarmesteLedereSM();

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
        narmesteLedere={narmesteLedere.data!!}
      />
    </Side>
  );
};

export default Home;
