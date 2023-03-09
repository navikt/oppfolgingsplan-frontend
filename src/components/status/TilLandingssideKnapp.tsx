import { Back } from "@navikt/ds-icons";
import { Button } from "@navikt/ds-react";
import { useLandingUrl } from "../../hooks/routeHooks";
import NextLink from "next/link";

export const TilLandingssideKnapp = () => {
  const landingPage = useLandingUrl();

  return (
    <NextLink href={landingPage}>
      <Button variant="tertiary" icon={<Back aria-hidden />}>
        Tilbake til oppfølgingsplaner
      </Button>
    </NextLink>
  );
};
