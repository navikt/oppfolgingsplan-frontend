import { useIsPilotAG } from "../../../api/queries/arbeidsgiver/pilotQueriesAG";
import { isProd, nyOppfolgingsplanRoot } from "../../../environments/publicEnv";
import { useNarmesteLederId } from "../../../hooks/routeHooks";
import { PilotLinkCard } from "./PilotLinkCard";

export const PilotLinkCardAG = () => {
  const isPilotUserQuery = useIsPilotAG();
  const narmesteLederId = useNarmesteLederId();

  if (isProd) {
    return null;
  }

  if (
    isPilotUserQuery.isSuccess &&
    isPilotUserQuery.data == true &&
    narmesteLederId
  ) {
    return (
      <PilotLinkCard url={`${nyOppfolgingsplanRoot}/${narmesteLederId}`} />
    );
  }

  return false;
};
