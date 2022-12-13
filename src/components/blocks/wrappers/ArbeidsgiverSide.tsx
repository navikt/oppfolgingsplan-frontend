import React, { ReactElement, ReactNode } from "react";
import Head from "next/head";
import { Heading } from "@navikt/ds-react";
import OppfolgingsdialogerInfoPersonvern from "../infoboks/OppfolgingsdialogerInfoPersonvern";
import VideoPanel from "../video/VideoPanel";
import { ContentWithDataAG } from "./arbeidsgiver/ContentWithDataAG";

interface SideProps {
  title: string;
  heading: string;
  displayPersonvernInfo?: boolean;
  displayVideo?: boolean;
  children: ReactNode;
}

const ArbeidsgiverSide = ({
  title,
  heading,
  displayPersonvernInfo,
  displayVideo,
  children,
}: SideProps): ReactElement => {
  return (
    <ContentWithDataAG>
      <Head>
        <title>
          {title + (title.length > 0 ? " - www.nav.no" : "www.nav.no")}
        </title>
      </Head>

      <Heading spacing={true} size={"large"} level={"1"}>
        {heading}
      </Heading>

      {displayPersonvernInfo && (
        <OppfolgingsdialogerInfoPersonvern
          ingress="Oppfølgingsplanen skal gjøre det lettere å bli i jobben. Hensikten er å finne ut hvilke oppgaver som kan gjøres hvis det blir lagt til rette for det.
        Dere skriver i planen fra hver deres kant. Dere kan endre den når som helst etter hvert som dere ser hvordan det går.
        Alle godkjente planer kan ses i Altinn av de hos dere som har tilgang."
        />
      )}

      {children}

      {displayVideo && <VideoPanel />}
    </ContentWithDataAG>
  );
};

export default ArbeidsgiverSide;
