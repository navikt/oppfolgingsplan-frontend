import { Stepper } from "@navikt/ds-react";
import React from "react";
import { useOppfolgingsplanBasePath } from "../../../hooks/routeHooks";
import Link from "next/link";

interface Props {
  activeStep: number;
}

export const OppfolgingsplanStepper = ({ activeStep }: Props) => {
  const basePath = useOppfolgingsplanBasePath();

  return (
    <Stepper activeStep={activeStep} orientation="horizontal" className="my-8">
      <Link href={`${basePath}/arbeidsoppgaver`} passHref={true} legacyBehavior>
        <Stepper.Step unsafe_index={0}>Arbeidsoppgaver</Stepper.Step>
      </Link>

      <Link href={`${basePath}/tiltak`} passHref={true} legacyBehavior>
        <Stepper.Step unsafe_index={1}>Tiltak</Stepper.Step>
      </Link>

      <Link href={`${basePath}/seplanen`} passHref={true} legacyBehavior>
        <Stepper.Step unsafe_index={2}>Se planen</Stepper.Step>
      </Link>
    </Stepper>
  );
};
