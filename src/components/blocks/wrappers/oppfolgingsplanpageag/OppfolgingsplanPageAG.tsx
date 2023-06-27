import { OppfolgingsplanPageContentAG } from "./OppfolgingsplanPageContentAG";
import { OPSkeleton } from "../../skeleton/OPSkeleton";
import { useOppfolgingsplanRouteId } from "../../../../hooks/routeHooks";
import { findAktivPlan } from "../../../../utils/oppfolgingplanUtils";
import { Heading } from "@navikt/ds-react";
import { Oppfolgingsplan } from "../../../../types/oppfolgingsplan";
import React, { ReactNode } from "react";
import { useOppfolgingsplanerAG } from "../../../../api/queries/arbeidsgiver/oppfolgingsplanerQueriesAG";
import { useDineSykmeldte } from "../../../../api/queries/arbeidsgiver/dinesykmeldteQueriesAG";
import ArbeidsgiverSide from "../ArbeidsgiverSide";
import { OppfolgingsplanStepper } from "../../stepper/OppfolgingsplanStepper";
import { NavigationButtons } from "../../buttons/NavigationButtons";
import { useTilgangAG } from "../../../../api/queries/arbeidsgiver/tilgangQueriesAG";

const textOverskrift = (arbeidstakerNavn?: string) => {
  return `Oppfølgingsplan for ${arbeidstakerNavn}`;
};

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

export const OppfolgingsplanPageAG = ({ page, children }: Props) => {
  const sykmeldt = useDineSykmeldte();
  const allePlaner = useOppfolgingsplanerAG();
  const tilgang = useTilgangAG();
  const aktivPlanId = useOppfolgingsplanRouteId();

  return (
    <ArbeidsgiverSide
      title={titleText(page)}
      heading={textOverskrift(
        (allePlaner.isSuccess &&
          findAktivPlan(aktivPlanId, allePlaner.data)?.arbeidstaker.navn) ||
          "arbeidstakeren din"
      )}
    >
      <OppfolgingsplanStepper activeStep={page.valueOf()} />

      {page !== Page.SEPLANEN && (
        <Heading spacing={true} level="2" size="medium">
          {headingText(page)}
        </Heading>
      )}

      {(allePlaner.isLoading || sykmeldt.isLoading || tilgang.isLoading) && (
        <OPSkeleton />
      )}

      {allePlaner.isSuccess && sykmeldt.isSuccess && tilgang.isSuccess && (
        <OppfolgingsplanPageContentAG
          allePlaner={allePlaner.data}
          sykmeldt={sykmeldt.data}
          aktivPlanId={aktivPlanId}
          harTilgang={tilgang.data.harTilgang === true}
          isOppgaverOrTiltak={page !== Page.SEPLANEN}
        >
          {children}
        </OppfolgingsplanPageContentAG>
      )}

      <NavigationButtons activeStep={page.valueOf()} />
    </ArbeidsgiverSide>
  );
};
