import { useLandingUrl } from "@/common/hooks/routeHooks";
import { Link } from "@navikt/ds-react";
import NextLink from "next/link";

export const TilbakeLenke = () => {
  const landingPage = useLandingUrl();

  return (
    <NextLink href={landingPage} passHref={true}>
      <Link>Tilbake til oppfølgingsplaner</Link>
    </NextLink>
  );
};
