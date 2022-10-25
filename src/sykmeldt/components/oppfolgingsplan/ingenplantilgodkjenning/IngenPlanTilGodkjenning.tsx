import { Alert, BodyLong } from "@navikt/ds-react";
import Link from "next/link";
import React from "react";
import { useLandingUrl } from "@/common/hooks/routeHooks";
import { SpacedDiv } from "@/common/components/wrappers/SpacedDiv";

export const IngenPlanTilGodkjenning = () => {
  const landingUrl = useLandingUrl();
  return (
    <SpacedDiv>
      <Alert variant="info">
        <BodyLong>Oppfølgingsplanen er ikke sendt til godkjenning</BodyLong>
        <Link className="lenke" href={landingUrl}>
          Gå til oversikten
        </Link>
      </Alert>
    </SpacedDiv>
  );
};
