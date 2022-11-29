import { BodyLong, Button, GuidePanel } from "@navikt/ds-react";
import Link from "next/link";
import { logger } from "@navikt/next-logger";
import Side from "../wrappers/Side";
import React from "react";
import styled from "styled-components";
import { useLandingUrl } from "../../../hooks/routeHooks";
import { StatusPageToDisplay } from "../../../utils/statusPageUtils";
import { Oppfolgingsplan } from "../../../schema/oppfolgingsplanSchema";

const SpacedGuidePanel = styled(GuidePanel)`
  padding-bottom: 2rem;
`;

const textOverskrift = (arbeidsgiver?: string) => {
  return `Oppfølgingsplan hos ${arbeidsgiver}`;
};

const errorText = (planStatus: StatusPageToDisplay) => {
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

interface Props {
  planStatus: StatusPageToDisplay;
  aktivPlan?: Oppfolgingsplan;
}

export const CantEditPlanError = ({ planStatus, aktivPlan }: Props) => {
  const landingUrl = useLandingUrl();

  return (
    <Side
      title={"Oppfølgingsplan"}
      heading={textOverskrift(aktivPlan?.virksomhet?.navn ?? "")}
    >
      <SpacedGuidePanel>
        <BodyLong spacing>{errorText(planStatus)}</BodyLong>

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
};
