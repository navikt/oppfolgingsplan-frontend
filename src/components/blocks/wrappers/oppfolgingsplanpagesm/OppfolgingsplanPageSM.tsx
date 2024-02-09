import SykmeldtSide from "../sykmeldtside/SykmeldtSide";
import { ReactNode } from "react";
import { useOppfolgingsplanerSM } from "../../../../api/queries/sykmeldt/oppfolgingsplanerQueriesSM";
import { useSykmeldingerSM } from "../../../../api/queries/sykmeldt/sykmeldingerQueriesSM";
import { useOppfolgingsplanRouteId } from "../../../../hooks/routeHooks";
import { findAktivPlan } from "../../../../utils/oppfolgingplanUtils";
import { OppfolgingsplanStepper } from "../../stepper/OppfolgingsplanStepper";
import { Heading } from "@navikt/ds-react";
import { OPSkeleton } from "../../skeleton/OPSkeleton";
import { OppfolgingsplanPageContentSM } from "./OppfolgingsplanPageContentSM";
import { NavigationButtons } from "../../buttons/NavigationButtons";
import { OppfolgingsplanDTO } from "../../../../schema/oppfolgingsplanSchema";
import { useNarmesteLedereSM } from "../../../../api/queries/sykmeldt/narmesteLedereQueriesSM";

const textOverskrift = (arbeidsgiver?: string) => {
  return `Oppfølgingsplan hos ${arbeidsgiver}`;
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
  oppfolgingsplan?: OppfolgingsplanDTO;
  children: ReactNode;
}

export const OppfolgingsplanPageSM = ({ page, children }: Props) => {
  const allePlaner = useOppfolgingsplanerSM();
  const sykmeldinger = useSykmeldingerSM();
  const aktivPlanId = useOppfolgingsplanRouteId();
  const narmesteLedere = useNarmesteLedereSM();

  return (
    <SykmeldtSide
      title={titleText(page)}
      heading={textOverskrift(
        (allePlaner.isSuccess &&
          findAktivPlan(aktivPlanId, allePlaner.data)?.virksomhet.navn) ||
          "arbeidsgiveren din",
      )}
    >
      <OppfolgingsplanStepper activeStep={page.valueOf()} />

      {page !== Page.SEPLANEN && (
        <Heading spacing={true} level="2" size="medium">
          {headingText(page)}
        </Heading>
      )}

      {(allePlaner.isPending || sykmeldinger.isPending) && <OPSkeleton />}

      {allePlaner.isSuccess &&
        sykmeldinger.isSuccess &&
        narmesteLedere.isSuccess && (
          <OppfolgingsplanPageContentSM
            allePlaner={allePlaner.data}
            sykmeldinger={sykmeldinger.data}
            narmesteLedere={narmesteLedere.data}
            aktivPlanId={aktivPlanId}
            isOppgaverOrTiltak={page !== Page.SEPLANEN}
          >
            {children}
          </OppfolgingsplanPageContentSM>
        )}

      <NavigationButtons activeStep={page.valueOf()} />
    </SykmeldtSide>
  );
};
