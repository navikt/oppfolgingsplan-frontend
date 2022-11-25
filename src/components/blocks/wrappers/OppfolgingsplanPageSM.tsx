import { BodyLong, Button, GuidePanel, Heading } from "@navikt/ds-react";
import React, { ReactElement, ReactNode } from "react";
import {
  Oppfolgingsplan,
  Stilling,
} from "../../../schema/oppfolgingsplanSchema";
import { useSykmeldingerSM } from "api/queries/sykmeldt/sykmeldingerQueriesSM";
import {
  erOppfolgingsplanKnyttetTilGyldigSykmelding,
  erOppfolgingsplanTidligere,
} from "utils/oppfolgingplanUtils";
import { NavigationButtons } from "../buttons/NavigationButtons";
import { IkkeTilgangTilPlanInfoBoks } from "../infoboks/IkkeTilgangTilPlanInfoBoks";
import Side from "./Side";
import { OppfolgingsplanStepper } from "../stepper/OppfolgingsplanStepper";
import { useAktivPlanSM } from "api/queries/sykmeldt/oppfolgingsplanerQueriesSM";
import { statusPageToDisplay } from "../../../utils/statusPageUtils";
import Link from "next/link";
import { useLandingUrl } from "../../../hooks/routeHooks";
import styled from "styled-components";
import { logger } from "@navikt/next-logger";

const textOverskrift = (arbeidsgiver?: string) => {
  return `Oppfølgingsplan hos ${arbeidsgiver}`;
};

const textStilling = (stilling: Stilling) => {
  return `Du jobber hos denne arbeidsgiveren som ${stilling?.yrke?.toLowerCase()} ${
    stilling.prosent
  } %`;
};

const SpacedGuidePanel = styled(GuidePanel)`
  padding-bottom: 2rem;
`;

export enum Page {
  ARBEIDSOPPGAVER = 1,
  TILTAK = 2,
  SEPLANEN = 3,
}

const headingText = (page: Page) => {
  switch (page) {
    case Page.ARBEIDSOPPGAVER:
      return "Arbeidsoppgaver";
    case Page.TILTAK:
      return "Tiltak";
    case Page.SEPLANEN:
      return "Se planen";
  }
};

const titleText = (page: Page) => {
  switch (page) {
    case Page.ARBEIDSOPPGAVER:
      return "Oppfølgingsplan - Arbeidsoppgaver";
    case Page.TILTAK:
      return "Oppfølgingsplan - Tiltak";
    case Page.SEPLANEN:
      return "Oppfølgingsplan - Se planen";
  }
};

interface Props {
  page: Page;
  oppfolgingsplan?: Oppfolgingsplan;
  children: ReactNode;
}

export const OppfolgingsplanPageSM = ({ page, children }: Props) => {
  const aktivPlan = useAktivPlanSM();
  const landingUrl = useLandingUrl();
  const sykmeldinger = useSykmeldingerSM();
  const stilling: Stilling | undefined =
    aktivPlan &&
    aktivPlan.arbeidstaker.stillinger?.find(
      (stilling) =>
        stilling.virksomhetsnummer == aktivPlan?.virksomhet?.virksomhetsnummer
    );

  const erOppfolgingsdialogTilgjengelig =
    aktivPlan &&
    sykmeldinger.data &&
    (erOppfolgingsplanTidligere(aktivPlan) ||
      erOppfolgingsplanKnyttetTilGyldigSykmelding(
        aktivPlan,
        sykmeldinger.data
      ));

  const Content = (): ReactElement => {
    if (!erOppfolgingsdialogTilgjengelig) {
      return <IkkeTilgangTilPlanInfoBoks />;
    }

    return <>{children}</>;
  };

  const planStatus = statusPageToDisplay(aktivPlan);

  const errorText = () => {
    switch (planStatus) {
      case "SENDTPLANTILGODKJENNING":
        return "Du har sendt denne oppfølgingsplanen til lederen din for godkjenning. Gå til siste versjon for å se eller endre oppfølgingsplanen.";
      case "GODKJENNPLANMOTTATT":
        return "Lederen din har sendt denne oppfølgingsplanen til deg for godkjenning. Gå til siste versjon for å se, endre eller godkjenne oppfølgingsplanen.";
      case "MOTTATTFLEREGODKJENNINGER":
        return "Lederen din har sendt denne oppfølgingsplanen til deg for godkjenning. Gå til siste versjon for å se, endre eller godkjenne oppfølgingsplanen.";
      default:
        return "Denne oppfølgingsplanen kan ikke redigeres. Gå til siste versjon for å se oppdatert informasjon om oppfølgingsplanen.";
    }
  };

  const canEditPlan =
    planStatus == "INGENPLANTILGODKJENNING" ||
    planStatus == "GODKJENNPLANAVSLATT";

  if (!canEditPlan) {
    return (
      <Side
        title={titleText(page)}
        heading={textOverskrift(aktivPlan?.virksomhet?.navn ?? "")}
      >
        <SpacedGuidePanel>
          <BodyLong spacing>{errorText()}</BodyLong>

          <Link href={`${landingUrl}/${aktivPlan?.id}`}>
            <Button
              variant={"primary"}
              onClick={() =>
                logger.warn(
                  `Går til oppfølgingsplanen fra ${planStatus} feilside`
                )
              }
            >
              Gå til oppfølgingsplanen
            </Button>
          </Link>
        </SpacedGuidePanel>
      </Side>
    );
  }

  return (
    <Side
      title={titleText(page)}
      heading={textOverskrift(aktivPlan?.virksomhet?.navn ?? "")}
    >
      <OppfolgingsplanStepper activeStep={page.valueOf()} />

      {page !== Page.SEPLANEN && (
        <Heading spacing={true} level="2" size="medium">
          {headingText(page)}
        </Heading>
      )}

      {page !== Page.SEPLANEN && stilling?.yrke && (
        <BodyLong spacing={true} size={"medium"}>
          {textStilling(stilling)}
        </BodyLong>
      )}

      <Content />

      <NavigationButtons activeStep={page.valueOf()} />
    </Side>
  );
};
