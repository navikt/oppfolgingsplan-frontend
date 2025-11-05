import { useIsPilotSM } from "../../../api/queries/sykmeldt/pilotQueriesSM";
import { isProd, nyOppfolgingsplanRoot } from "../../../environments/publicEnv";
import { PilotLinkCard } from "./PilotLinkCard";

export const PilotLinkCardSM = () => {
  const isPilotUserQuery = useIsPilotSM();

  if (isProd) {
    return null;
  }

  if (isPilotUserQuery.isSuccess && isPilotUserQuery.data == true) {
    return <PilotLinkCard url={nyOppfolgingsplanRoot} />;
  }

  return false;
};
