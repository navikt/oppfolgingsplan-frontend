import { Button } from "@navikt/ds-react";
import React from "react";
import {useLandingUrl, useOppfolgingsplanBasePath} from "@/common/hooks/routeHooks";
import Link from "next/link";
import { ButtonRow } from "@/common/components/wrappers/ButtonRow";
import { Page } from "@/common/components/wrappers/OppfolgingsplanPageSM";

const getPreviousHref = (basePath: string, activeStep: number) => {
  if (activeStep == Page.TILTAK.valueOf()) {
    return `${basePath}/arbeidsoppgaver`;
  }

  if (activeStep == Page.SEPLANEN.valueOf()) {
    return `${basePath}/tiltak`;
  }
};

const getNextHref = (basePath: string, activeStep: number) => {
  if (activeStep == Page.ARBEIDSOPPGAVER.valueOf()) {
    return `${basePath}/tiltak`;
  }

  if (activeStep == Page.TILTAK.valueOf()) {
    return `${basePath}/seplanen`;
  }
};

interface Props {
  activeStep: number;
}

export const NavigationButtons = ({ activeStep }: Props) => {
  const landingUrl = useLandingUrl();
  const basePath = useOppfolgingsplanBasePath();
  const previousPage = getPreviousHref(basePath, activeStep);
  const nextPage = getNextHref(basePath, activeStep);

  return (
    <ButtonRow marginTop={"2rem"} marginBottom={"2rem"}>
      {previousPage && (
        <Link href={previousPage} passHref={true}>
          <Button variant={"secondary"}>Forrige steg</Button>
        </Link>
      )}

      {nextPage && (
        <Link href={nextPage} passHref={true}>
          <Button variant={"primary"}>Neste steg</Button>
        </Link>
      )}

      <Link href={landingUrl} passHref={true}>
        <Button variant={"tertiary"}>Fortsett senere</Button>
      </Link>
    </ButtonRow>
  );
};
