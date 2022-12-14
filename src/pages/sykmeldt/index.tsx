import { NextPage } from "next";
import React from "react";
import OppfolgingsplanContent from "../../components/landing/OppfolgingsplanContent";
import { useOppfolgingsplanerSM } from "api/queries/sykmeldt/oppfolgingsplanerQueriesSM";
import { useSykmeldingerSM } from "api/queries/sykmeldt/sykmeldingerQueriesSM";
import { beskyttetSideUtenProps } from "../../auth/beskyttetSide";
import SykmeldtSide from "../../components/blocks/wrappers/SykmeldtSide";
import OppfolgingsdialogerInfoPersonvern from "../../components/blocks/infoboks/OppfolgingsdialogerInfoPersonvern";
import VideoPanel from "../../components/blocks/video/VideoPanel";

const Home: NextPage = () => {
  const oppfolgingsplaner = useOppfolgingsplanerSM();
  const sykmeldinger = useSykmeldingerSM();

  return (
    <SykmeldtSide
      title="Oppfølgingsplaner - Oversikt"
      heading="Oppfølgingsplaner"
    >
      <OppfolgingsdialogerInfoPersonvern
        ingress="Oppfølgingsplanen skal gjøre det lettere for deg å bli i jobben. Hensikten er å finne ut hvilke oppgaver du kan gjøre hvis lederen din legger til rette for det.
        Dere skriver i planen fra hver deres kant. Dere kan endre den når som helst etter hvert som dere ser hvordan det går.
        Alle godkjente planer kan ses i Altinn av de på arbeidsplassen din som har tilgang."
      />

      <OppfolgingsplanContent
        oppfolgingsplaner={oppfolgingsplaner.data!!}
        sykmeldinger={sykmeldinger.data!!}
      />

      <VideoPanel />
    </SykmeldtSide>
  );
};

export const getServerSideProps = beskyttetSideUtenProps;

export default Home;
