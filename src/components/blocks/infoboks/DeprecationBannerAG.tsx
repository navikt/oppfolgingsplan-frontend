import { LocalAlert, List, Button } from "@navikt/ds-react";
import {
  dineSykemeldteRoot,
  nyOppfolgingsplanRoot,
} from "../../../environments/publicEnv";
import { useNarmesteLederId } from "../../../hooks/routeHooks";
import { useIsPilotAG } from "../../../api/queries/arbeidsgiver/pilotQueriesAG";

export const DeprecationBannerAG = () => {
  const narmesteLederId = useNarmesteLederId();
  const isPilot = useIsPilotAG();
  const nyLosningUrl = narmesteLederId
    ? `${nyOppfolgingsplanRoot}/${narmesteLederId}`
    : dineSykemeldteRoot;

  if (!isPilot.isSuccess || isPilot.data !== true) return null;

  return (
    <LocalAlert status="announcement" style={{ marginBottom: "1.5rem" }}>
      <LocalAlert.Header>
        <LocalAlert.Title>
          Vi flytter til ny oppfølgingsplan!
          <br />
          Denne siden stenges 1. august, og alle planer her vil da bli slettet.
        </LocalAlert.Title>
      </LocalAlert.Header>
      <LocalAlert.Content>
        <List style={{ marginBottom: "1rem" }}>
          <List.Item>
            Hva betyr det for deg? Du finner nå den nye løsningen ved å trykke
            på knappen under.
          </List.Item>
          <List.Item>
            Hva skjer med gamle planer? Bedriften din finner alle tidligere
            godkjente planer i Altinn.
          </List.Item>
        </List>
        <Button as="a" href={nyLosningUrl}>
          Gå til ny oppfølgingsplan
        </Button>
      </LocalAlert.Content>
    </LocalAlert>
  );
};
