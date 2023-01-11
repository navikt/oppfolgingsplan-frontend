import { Heading } from "@navikt/ds-react";
import React, { ReactElement, ReactNode } from "react";
import { Oppfolgingsplan } from "../../../types/oppfolgingsplan";

import {
  erOppfolgingsplanKnyttetTilGyldigSykmeldingAG,
  erOppfolgingsplanTidligere,
} from "utils/oppfolgingplanUtils";
import { NavigationButtons } from "../buttons/NavigationButtons";
import { IkkeTilgangTilPlanInfoBoks } from "../infoboks/IkkeTilgangTilPlanInfoBoks";
import { OppfolgingsplanStepper } from "../stepper/OppfolgingsplanStepper";
import { statusPageToDisplayAG } from "../../../utils/statusPageUtils";
import { CantEditPlanError } from "../error/CantEditPlanError";
import { useChosenAktivOppfolgingsplanAG } from "../../../api/queries/arbeidsgiver/oppfolgingsplanerQueriesAG";
import ArbeidsgiverSide from "./ArbeidsgiverSide";
import { useDineSykmeldte } from "../../../api/queries/arbeidsgiver/dinesykmeldteQueriesAG";

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
  const aktivPlan = useChosenAktivOppfolgingsplanAG();
  const sykmeldt = useDineSykmeldte()?.data;

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
    return <CantEditPlanError planStatus={planStatus} aktivPlan={aktivPlan} />;
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

      <Content />

      <NavigationButtons activeStep={page.valueOf()} />
    </ArbeidsgiverSide>
  );
};
