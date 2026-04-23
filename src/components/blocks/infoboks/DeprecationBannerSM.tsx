import { BodyLong, LocalAlert, Button } from "@navikt/ds-react";
import { nyOppfolgingsplanRoot } from "../../../environments/publicEnv";
import { useIsPilotSM } from "../../../api/queries/sykmeldt/pilotQueriesSM";

export const DeprecationBannerSM = () => {
  const isPilot = useIsPilotSM();

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
        <BodyLong spacing>
          Fra nå av skjer alt i den nye oppfølgingsplanen. Du kan ikke starte en
          ny plan selv, så ta kontakt med lederen din når dere skal lage en
          sammen. Det er arbeidsgiver som oppretter planen i det nye systemet.
        </BodyLong>
        <Button as="a" href={`${nyOppfolgingsplanRoot}/sykmeldt`}>
          Gå til ny oppfølgingsplan
        </Button>
      </LocalAlert.Content>
    </LocalAlert>
  );
};
