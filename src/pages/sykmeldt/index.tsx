import { NextPage } from "next";
import { useOppfolgingsplanerSM } from "@/common/api/queries/sykmeldt/oppfolgingsplanerQueriesSM";
import { useSykmeldingerSM } from "@/common/api/queries/sykmeldt/sykmeldingerQueriesSM";
import { useNarmesteLedereSM } from "@/common/api/queries/sykmeldt/narmesteLedereQueriesSM";
import React from "react";
import { useTilgangSM } from "@/common/api/queries/sykmeldt/tilgangQueries";
import { AdresseSperreInfoBoks } from "@/common/components/infoboks/AdresseSperreInfoBoks";
import Side from "@/common/components/wrappers/Side";
import Oppfolgingsdialoger from "../../sykmeldt/components/oppfolgingsplan/Oppfolgingsdialoger";
import Feilmelding from "@/common/components/error/Feilmelding";

const texts = {
  pageTitle: "Oppfølgingsplaner - Oversikt",
  brodsmuler: {
    dittSykefravaer: "Ditt sykefravær",
    dineOppfolgingsplaner: "Dine oppfølgingsplaner",
  },
};

const Home: NextPage = () => {
  const tilgang = useTilgangSM();
  const oppfolgingsplaner = useOppfolgingsplanerSM();
  const sykmeldinger = useSykmeldingerSM();
  const narmesteLedere = useNarmesteLedereSM();

  return (
    <Side
      isLoading={
        oppfolgingsplaner.isLoading ||
        sykmeldinger.isLoading ||
        narmesteLedere.isLoading ||
        tilgang.isLoading
      }
      tittel={texts.pageTitle}
    >
      {(() => {
        if (
          oppfolgingsplaner.isError ||
          sykmeldinger.isError ||
          narmesteLedere.isError ||
          tilgang.isError
        ) {
          return <Feilmelding />;
        } else if (tilgang.data && !tilgang.data.harTilgang) {
          return <AdresseSperreInfoBoks />;
        }

        if (
          oppfolgingsplaner.isSuccess &&
          sykmeldinger.isSuccess &&
          narmesteLedere.isSuccess
        ) {
          return (
            <Oppfolgingsdialoger
              oppfolgingsplaner={oppfolgingsplaner.data}
              sykmeldinger={sykmeldinger.data}
              narmesteLedere={narmesteLedere.data}
            />
          );
        }

        return null;
      })()}
    </Side>
  );
};

export default Home;
