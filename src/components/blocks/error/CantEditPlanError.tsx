import { BodyLong, Button, GuidePanel } from "@navikt/ds-react";
import Link from "next/link";
import { logger } from "@navikt/next-logger";
import React from "react";
import { useLandingUrl } from "../../../hooks/routeHooks";
import { StatusPageToDisplay } from "../../../utils/statusPageUtils";
import { OppfolgingsplanDTO } from "../../../schema/oppfolgingsplanSchema";

const errorText = (planStatus: StatusPageToDisplay) => {
  switch (planStatus) {
    case "SENDTPLANTILGODKJENNING":
      return "Du har sendt denne oppfølgingsplanen til godkjenning. Gå til siste versjon for å se eller endre oppfølgingsplanen.";
    case "GODKJENNPLANMOTTATT":
      return "Denne planen har blitt sendt til deg for godkjenning. Gå til siste versjon for å se, endre eller godkjenne oppfølgingsplanen.";
    case "MOTTATTFLEREGODKJENNINGER":
      return "Denne planen har blitt sendt til deg for godkjenning. Gå til siste versjon for å se, endre eller godkjenne oppfølgingsplanen.";
    default:
      return "Denne oppfølgingsplanen kan ikke redigeres. Gå til siste versjon for å se oppdatert informasjon om oppfølgingsplanen.";
  }
};

interface Props {
  planStatus: StatusPageToDisplay;
  aktivPlan?: OppfolgingsplanDTO;
}

export const CantEditPlanError = ({ planStatus, aktivPlan }: Props) => {
  const landingUrl = useLandingUrl();

  return (
    <GuidePanel className="pb-8">
      <BodyLong spacing>{errorText(planStatus)}</BodyLong>

      <Link href={`${landingUrl}/${aktivPlan?.id}`}>
        <Button
          variant={"primary"}
          onClick={() =>
            logger.warn(`Går til oppfølgingsplanen fra ${planStatus} feilside`)
          }
        >
          Gå til oppfølgingsplanen
        </Button>
      </Link>
    </GuidePanel>
  );
};
