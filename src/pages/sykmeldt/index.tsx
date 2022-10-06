import { NextPage } from "next";
import { useOppfolgingsplanerSM } from "@/common/api/queries/sykmeldt/oppfolgingsplanerQueriesSM";
import { useSykmeldingerSM } from "@/common/api/queries/sykmeldt/sykmeldingerQueriesSM";
import { useNarmesteLedereSM } from "@/common/api/queries/sykmeldt/narmesteLedereQueriesSM";
import React from "react";
import { useTilgangSM } from "@/common/api/queries/sykmeldt/tilgangQueries";
import { AdresseSperreInfoBoks } from "@/common/components/infoboks/AdresseSperreInfoBoks";
import Side from "@/common/components/wrappers/Side";
import OppfolgingsplanContent from "../../sykmeldt/components/oppfolgingsplan/OppfolgingsplanContent";
import Feilmelding from "@/common/components/error/Feilmelding";
import { Heading } from "@navikt/ds-react";
import OppfolgingsdialogerInfoPersonvern from "../../sykmeldt/components/oppfolgingsplan/OppfolgingsdialogerInfoPersonvern";
import VideoPanel from "@/common/components/video/VideoPanel";

const texts = {
  pageTitle: "Oppfølgingsplaner - Oversikt",
  pageHeader: "Oppfølgingsplaner",
  brodsmuler: {
    dittSykefravaer: "Ditt sykefravær",
    dineOppfolgingsplaner: "Dine oppfølgingsplaner",
  },
  error: {
    title: "Beklager, vi fikk en teknisk feil",
    description: "Det skjedde en feil ved henting av dine oppfølgingsplaner. Vennligst prøv igjen senere."
  }
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
      <div>
        <Heading spacing={true} size={"large"} level={"1"}>
          {texts.pageHeader}
        </Heading>

        <OppfolgingsdialogerInfoPersonvern />

        {(() => {
          if (
            oppfolgingsplaner.isError ||
            sykmeldinger.isError ||
            narmesteLedere.isError ||
            tilgang.isError
          ) {
            return <Feilmelding title={texts.error.title} description={texts.error.description} />;
          } else if (tilgang.data && !tilgang.data.harTilgang) {
            return <AdresseSperreInfoBoks />;
          }

          if (
            oppfolgingsplaner.isSuccess &&
            sykmeldinger.isSuccess &&
            narmesteLedere.isSuccess
          ) {
            return (
              <OppfolgingsplanContent
                oppfolgingsplaner={oppfolgingsplaner.data}
                sykmeldinger={sykmeldinger.data}
                narmesteLedere={narmesteLedere.data}
              />
            );
          }

          return null;
        })()}
        <VideoPanel />
      </div>
    </Side>
  );
};

export default Home;
