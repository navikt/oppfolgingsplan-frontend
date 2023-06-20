import { Button } from "@navikt/ds-react";
import React from "react";
import {
  useLandingUrl,
  useOppfolgingsplanBasePath,
} from "../../../hooks/routeHooks";
import Link from "next/link";
import { Row } from "../wrappers/Row";
import { Page } from "../wrappers/OppfolgingsplanPageSM";
import {
  NAVIGATION_FORRIGE_STEG_BUTTON,
  NAVIGATION_FORTSETT_SENERE_BUTTON,
  NAVIGATION_NESTE_STEG_BUTTON,
} from "../../../../cypress/dataTestId";

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
    <>
      <Row className="mt-8 mb-4">
        {previousPage && (
          <Link href={previousPage}>
            <Button
              data-testid={NAVIGATION_FORRIGE_STEG_BUTTON}
              variant={"secondary"}
            >
              Forrige steg
            </Button>
          </Link>
        )}

        {nextPage && (
          <Link href={nextPage}>
            <Button
              data-testid={NAVIGATION_NESTE_STEG_BUTTON}
              variant={"primary"}
            >
              Neste steg
            </Button>
          </Link>
        )}
      </Row>

      <Row className="mb-8">
        <Link href={landingUrl}>
          <Button
            data-testid={NAVIGATION_FORTSETT_SENERE_BUTTON}
            variant={"tertiary"}
          >
            Fortsett senere
          </Button>
        </Link>
      </Row>
    </>
  );
};
