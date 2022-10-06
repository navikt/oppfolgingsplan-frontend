import React, { ReactElement, ReactNode } from "react";
import Head from "next/head";
import AppSpinner from "@/common/components/spinner/AppSpinner";
import { useTilgangSM } from "@/common/api/queries/sykmeldt/tilgangQueries";
import { useOppfolgingsplanerSM } from "@/common/api/queries/sykmeldt/oppfolgingsplanerQueriesSM";
import { useSykmeldingerSM } from "@/common/api/queries/sykmeldt/sykmeldingerQueriesSM";
import { useNarmesteLedereSM } from "@/common/api/queries/sykmeldt/narmesteLedereQueriesSM";
import { Heading } from "@navikt/ds-react";
import OppfolgingsdialogerInfoPersonvern from "../../../sykmeldt/components/oppfolgingsplan/OppfolgingsdialogerInfoPersonvern";
import Feilmelding from "@/common/components/error/Feilmelding";
import { AdresseSperreInfoBoks } from "@/common/components/infoboks/AdresseSperreInfoBoks";
import VideoPanel from "@/common/components/video/VideoPanel";

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
  displayPersonvernInfo?: boolean;
  displayVideo?: boolean;
  isLoading?: boolean;
  children: ReactNode;
}

const Side = ({
  title,
  heading,
  displayPersonvernInfo,
  displayVideo,
  isLoading,
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
      narmesteLedere.isError ||
      tilgang.isError
    ) {
      return (
        <Feilmelding
          title={texts.error.title}
          description={texts.error.description}
        />
      );
    } else if (tilgang.data && !tilgang.data.harTilgang) {
      return <AdresseSperreInfoBoks />;
    } else {
      return <>{children}</>;
    }
  };

  if (
    isLoading ||
    tilgang.isLoading ||
    oppfolgingsplaner.isLoading ||
    sykmeldinger.isLoading ||
    narmesteLedere.isLoading
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

      <Heading spacing={true} size={"large"} level={"1"}>
        {heading}
      </Heading>

      {displayPersonvernInfo && <OppfolgingsdialogerInfoPersonvern />}

      <SideContent />

      {displayVideo && <VideoPanel />}
    </>
  );
};

export default Side;
