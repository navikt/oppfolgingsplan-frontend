import { Back } from "@navikt/ds-icons";
import { Button, Link } from "@navikt/ds-react";
import { useLandingUrl } from "hooks/routeHooks";

export const TilLandingssideKnapp = () => {
  const landingPage = useLandingUrl();

  return (
    <Link href={landingPage}>
      <Button variant="tertiary" icon={<Back aria-hidden />}>
        Tilbake til oppfølgingsplaner
      </Button>
    </Link>
  );
};
