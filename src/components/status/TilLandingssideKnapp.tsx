import { ChevronLeftIcon } from "@navikt/aksel-icons";
import { Button } from "@navikt/ds-react";
import { useLandingUrl } from "../../hooks/routeHooks";
import NextLink from "next/link";

export const TilLandingssideKnapp = () => {
  const landingPage = useLandingUrl();

  return (
    <NextLink href={landingPage}>
      <Button variant="tertiary" icon={<ChevronLeftIcon aria-hidden />}>
        Tilbake til oppfølgingsplaner
      </Button>
    </NextLink>
  );
};
