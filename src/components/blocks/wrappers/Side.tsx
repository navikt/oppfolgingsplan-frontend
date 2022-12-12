import React, { ReactElement, ReactNode } from "react";
import Head from "next/head";
import { Heading } from "@navikt/ds-react";
import OppfolgingsdialogerInfoPersonvern from "../infoboks/OppfolgingsdialogerInfoPersonvern";
import VideoPanel from "../video/VideoPanel";
import { useAudience } from "../../../hooks/routeHooks";
import { ContentWithDataSM } from "./sykmeldt/ContentWithDataSM";
import { ContentWithDataAG } from "./arbeidsgiver/ContentWithDataAG";

interface SideProps {
  title: string;
  heading: string;
  displayPersonvernInfo?: boolean;
  displayVideo?: boolean;
  children: ReactNode;
}

const Side = ({
  title,
  heading,
  displayPersonvernInfo,
  displayVideo,
  children,
}: SideProps): ReactElement => {
  const { isAudienceSykmeldt } = useAudience();

  const OppfolgingsplanContent = () => {
    return (
      <>
        <Head>
          <title>
            {title + (title.length > 0 ? " - www.nav.no" : "www.nav.no")}
          </title>
        </Head>

        <Heading spacing={true} size={"large"} level={"1"}>
          {heading}
        </Heading>

        {displayPersonvernInfo && <OppfolgingsdialogerInfoPersonvern />}

        {children}

        {displayVideo && <VideoPanel />}
      </>
    );
  };

  return isAudienceSykmeldt ? (
    <ContentWithDataSM>
      <OppfolgingsplanContent />
    </ContentWithDataSM>
  ) : (
    <ContentWithDataAG>
      <OppfolgingsplanContent />
    </ContentWithDataAG>
  );
};

export default Side;
