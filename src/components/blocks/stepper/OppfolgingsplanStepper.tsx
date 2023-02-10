import { Stepper } from "@navikt/ds-react";
import React from "react";
import { useOppfolgingsplanBasePath } from "hooks/routeHooks";
import styled from "styled-components";

interface Props {
  activeStep: number;
}

const StepperWithSpacing = styled(Stepper)`
  margin-top: 2rem;
  margin-bottom: 2rem;
`;

export const OppfolgingsplanStepper = ({ activeStep }: Props) => {
  const basePath = useOppfolgingsplanBasePath();

  return (
    <StepperWithSpacing activeStep={activeStep} orientation="horizontal">
      <Stepper.Step href={`${basePath}/arbeidsoppgaver`} unsafe_index={0}>
        Arbeidsoppgaver
      </Stepper.Step>

      <Stepper.Step href={`${basePath}/tiltak`} unsafe_index={1}>
        Tiltak
      </Stepper.Step>

      <Stepper.Step href={`${basePath}/seplanen`} unsafe_index={2}>
        Se planen
      </Stepper.Step>
    </StepperWithSpacing>
  );
};
