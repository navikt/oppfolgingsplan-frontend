import { Alert, BodyLong, Link } from "@navikt/ds-react";
import React from "react";
import { useLandingUrl } from "hooks/routeHooks";
import { SpacedDiv } from "components/blocks/wrappers/SpacedDiv";

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
