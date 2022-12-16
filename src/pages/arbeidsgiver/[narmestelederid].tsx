import { NextPage } from "next";
import React from "react";
import { useAktiveOppfolgingsplanerAG } from "../../api/queries/arbeidsgiver/oppfolgingsplanerQueriesAG";
import { beskyttetSideUtenProps } from "../../auth/beskyttetSide";
import OppfolgingsdialogerInfoPersonvern from "../../components/blocks/infoboks/OppfolgingsdialogerInfoPersonvern";
import VideoPanel from "../../components/blocks/video/VideoPanel";
import ArbeidsgiverSide from "../../components/blocks/wrappers/ArbeidsgiverSide";
import OppfolgingsdialogTeasere from "../../components/landing/teaser/OppfolgingsdialogTeasere";

const Home: NextPage = () => {
  const { harAktiveOppfolgingsplaner, aktiveOppfolgingsplaner } =
    useAktiveOppfolgingsplanerAG();

  return (
    <ArbeidsgiverSide
      title="Oppfølgingsplaner - Oversikt"
      heading="Oppfølgingsplaner"
    >
      <OppfolgingsdialogerInfoPersonvern
        ingress="Oppfølgingsplanen skal gjøre det lettere å bli i jobben. Hensikten er å finne ut hvilke oppgaver som kan gjøres hvis det blir lagt til rette for det.
        Dere skriver i planen fra hver deres kant. Dere kan endre den når som helst etter hvert som dere ser hvordan det går.
        Alle godkjente planer kan ses i Altinn av de hos dere som har tilgang."
      />

      {harAktiveOppfolgingsplaner && (
        <OppfolgingsdialogTeasere
          oppfolgingsplaner={aktiveOppfolgingsplaner}
          tittel={"Aktiv oppfølgingsplan"}
        />
      )}

      <VideoPanel />
    </ArbeidsgiverSide>
  );
};

export const getServerSideProps = beskyttetSideUtenProps;

export default Home;
