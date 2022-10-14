import { BodyLong, Heading } from "@navikt/ds-react";
import React, { ReactElement, ReactNode } from "react";
import {
  Oppfolgingsplan,
  Stilling,
} from "../../../schema/oppfolgingsplanSchema";
import { useSykmeldingerSM } from "@/common/api/queries/sykmeldt/sykmeldingerQueriesSM";
import {
  erOppfolgingsplanKnyttetTilGyldigSykmelding,
  erOppfolgingsplanTidligere,
} from "@/common/utils/oppfolgingplanUtils";
import { NavigationButtons } from "@/common/components/buttons/NavigationButtons";
import { IkkeTilgangTilPlanInfoBoks } from "@/common/components/infoboks/IkkeTilgangTilPlanInfoBoks";
import Side from "@/common/components/wrappers/Side";
import { OppfolgingsplanStepper } from "@/common/components/stepper/OppfolgingsplanStepper";
import { useAktivPlanSM } from "@/common/api/queries/sykmeldt/oppfolgingsplanerQueriesSM";

const textOverskrift = (arbeidsgiver?: string) => {
  return `Oppfølgingsplan hos ${arbeidsgiver}`;
};

const textStilling = (stilling: Stilling) => {
  return `Du jobber hos denne arbeidsgiveren som ${stilling?.yrke?.toLowerCase()} ${
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

export const OppfolgingsplanPageSM = ({ page, children }: Props) => {
  const aktivPlan = useAktivPlanSM();

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

  return (
    <Side
      title={titleText(page)}
      heading={textOverskrift(aktivPlan?.virksomhet?.navn ?? "")}
    >
      <OppfolgingsplanStepper activeStep={page.valueOf()} />

      <Heading spacing={true} level="2" size="medium">
        {headingText(page)}
      </Heading>

      {stilling && (
        <BodyLong spacing={true} size={"medium"}>
          {textStilling(stilling)}
        </BodyLong>
      )}

      <Content />

      <NavigationButtons activeStep={page.valueOf()} />
    </Side>
  );
};
