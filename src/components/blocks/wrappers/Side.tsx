import React, { ReactElement, ReactNode } from "react";
import Head from "next/head";
import AppSpinner from "../spinner/AppSpinner";
import { useOppfolgingsplanerSM } from "api/queries/sykmeldt/oppfolgingsplanerQueriesSM";
import { useSykmeldingerSM } from "api/queries/sykmeldt/sykmeldingerQueriesSM";
import { Heading } from "@navikt/ds-react";
import OppfolgingsdialogerInfoPersonvern from "../infoboks/OppfolgingsdialogerInfoPersonvern";
import Feilmelding from "../error/Feilmelding";
import { AdresseSperreInfoBoks } from "../infoboks/AdresseSperreInfoBoks";
import VideoPanel from "../video/VideoPanel";
import { useTilgangSM } from "api/queries/sykmeldt/tilgangQueriesSM";
import { useNarmesteLedereSM } from "api/queries/sykmeldt/narmesteLedereQueriesSM";
import { SpacedDiv } from "./SpacedDiv";
import { SyfoLogo } from "../images/imageComponents";
import Image from "next/image";
import { ImageContainer } from "./ImageContainer";
import styled from "styled-components";

const HeadingWithLogo = styled.div`
  display: flex;
  gap: 1.4rem;
  margin-bottom: 2rem;
`;

const SubHeading = styled(Heading)`
  margin-bottom: 2rem;
`;

const texts = {
  error: {
    title: "Beklager, vi fikk en teknisk feil",
    description:
      "Det skjedde en feil ved henting av dine oppfølgingsplaner. Vennligst prøv igjen senere.",
  },
};

interface SideProps {
  title: string;
  heading: string;
  subHeading?: string;
  displayPersonvernInfo?: boolean;
  displayVideo?: boolean;
  children: ReactNode;
}

const Side = ({
  title,
  heading,
  subHeading,
  displayPersonvernInfo,
  displayVideo,
  children,
}: SideProps): ReactElement => {
  const tilgang = useTilgangSM();
  const oppfolgingsplaner = useOppfolgingsplanerSM();
  const sykmeldinger = useSykmeldingerSM();
  const narmesteLedere = useNarmesteLedereSM();

  const SideContent = (): ReactElement => {
    if (
      oppfolgingsplaner.isError ||
      sykmeldinger.isError ||
      tilgang.isError ||
      narmesteLedere.isError
    ) {
      return (
        <SpacedDiv>
          <Feilmelding
            title={texts.error.title}
            description={texts.error.description}
          />
        </SpacedDiv>
      );
    } else if (tilgang.data && !tilgang.data.harTilgang) {
      return <AdresseSperreInfoBoks />;
    } else {
      return <>{children}</>;
    }
  };

  //Check sykmeldinger error state because of dependent queries loading-state (sykmeldt.fnr)
  if (
    !sykmeldinger.isError &&
    (tilgang.isLoading ||
      oppfolgingsplaner.isLoading ||
      sykmeldinger.isLoading ||
      narmesteLedere.isLoading)
  ) {
    return <AppSpinner />;
  }

  return (
    <>
      <Head>
        <title>
          {title + (title.length > 0 ? " - www.nav.no" : "www.nav.no")}
        </title>
      </Head>

      <HeadingWithLogo>
        <ImageContainer width={"64px"}>
          <Image
            src={SyfoLogo}
            width="64"
            height="64"
            alt={""}
            layout={"fixed"}
            color={"#FF0000"}
          />
        </ImageContainer>
        <Heading size={"xlarge"} level={"1"}>
          {heading}
        </Heading>
      </HeadingWithLogo>

      {/*<GreenDivider />*/}

      {subHeading && (
        <SubHeading size={"large"} level={"2"}>
          {subHeading}
        </SubHeading>
      )}

      {displayPersonvernInfo && <OppfolgingsdialogerInfoPersonvern />}

      <SideContent />

      {displayVideo && <VideoPanel />}
    </>
  );
};

export default Side;
