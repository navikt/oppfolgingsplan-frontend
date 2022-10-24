import { useLandingUrl } from "@/common/hooks/routeHooks";
import Link from "next/link";

export const TilbakeLenke = () => {
  const landingPage = useLandingUrl();

  return (
    <div>
      <Link href={landingPage}>Tilbake til oppfølgingsplaner</Link>
    </div>
  );
};
