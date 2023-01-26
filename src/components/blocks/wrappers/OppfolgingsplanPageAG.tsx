import { BodyLong, Heading } from "@navikt/ds-react";
import React, { ReactElement, ReactNode } from "react";
import { Oppfolgingsplan, Stilling } from "../../../types/oppfolgingsplan";

import {
  erOppfolgingsplanKnyttetTilGyldigSykmeldingAG,
  erOppfolgingsplanTidligere,
} from "utils/oppfolgingplanUtils";
import { NavigationButtons } from "../buttons/NavigationButtons";
import { IkkeTilgangTilPlanInfoBoks } from "../infoboks/IkkeTilgangTilPlanInfoBoks";
import { OppfolgingsplanStepper } from "../stepper/OppfolgingsplanStepper";
import { statusPageToDisplayAG } from "../../../utils/statusPageUtils";
import { CantEditPlanError } from "../error/CantEditPlanError";
import { useAktivPlanAG } from "../../../api/queries/arbeidsgiver/oppfolgingsplanerQueriesAG";
import ArbeidsgiverSide from "./ArbeidsgiverSide";
import { useDineSykmeldte } from "../../../api/queries/arbeidsgiver/dinesykmeldteQueriesAG";

const textOverskrift = (arbeidstakerNavn?: string) => {
  return `Oppfølgingsplan for ${arbeidstakerNavn}`;
};

const textStilling = (stilling: Stilling) => {
  return `Den sykmeldte jobber som ${stilling?.yrke?.toLowerCase()} ${
    stilling.prosent
  } %`;
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
  const aktivPlan = useAktivPlanAG();
  const sykmeldt = useDineSykmeldte()?.data;

  const stilling: Stilling | undefined =
    aktivPlan &&
    aktivPlan.arbeidstaker.stillinger?.find(
      (stilling) =>
        stilling.virksomhetsnummer === aktivPlan?.virksomhet?.virksomhetsnummer
    );

  const erOppfolgingsdialogTilgjengelig =
    aktivPlan &&
    sykmeldt &&
    (erOppfolgingsplanTidligere(aktivPlan) ||
      erOppfolgingsplanKnyttetTilGyldigSykmeldingAG(
        aktivPlan,
        sykmeldt.orgnummer,
        sykmeldt.aktivSykmelding
      ));

  const Content = (): ReactElement => {
    if (!erOppfolgingsdialogTilgjengelig) {
      return <IkkeTilgangTilPlanInfoBoks />;
    }

    return <>{children}</>;
  };

  const planStatus = statusPageToDisplayAG(aktivPlan);

  const planIsNotEditable =
    planStatus == "GODKJENNPLANMOTTATT" ||
    planStatus == "MOTTATTFLEREGODKJENNINGER" ||
    planStatus == "GODKJENTPLANAVBRUTT" ||
    planStatus == "SENDTPLANTILGODKJENNING" ||
    planStatus == "GODKJENTPLAN";

  if (planIsNotEditable) {
    return (
      <ArbeidsgiverSide
        title={titleText(page)}
        heading={textOverskrift(aktivPlan?.arbeidstaker?.navn ?? "")}
      >
        <CantEditPlanError planStatus={planStatus} aktivPlan={aktivPlan} />
      </ArbeidsgiverSide>
    );
  }

  return (
    <ArbeidsgiverSide
      title={titleText(page)}
      heading={textOverskrift(aktivPlan?.arbeidstaker?.navn ?? "")}
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
    </ArbeidsgiverSide>
  );
};
