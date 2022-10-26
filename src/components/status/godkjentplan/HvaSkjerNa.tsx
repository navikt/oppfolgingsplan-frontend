import { Alert, BodyShort, Heading } from "@navikt/ds-react";

export const HvaSkjerNa = () => {
  return (
    <Alert variant="info">
      <Heading spacing size="small" level="3">
        Hva skjer nå?
      </Heading>
      <BodyShort spacing>
        Innen fire uker skal fastlegen din få se planen. Du og lederen din kan
        dele den med både legen og NAV når dere er blitt enige.
      </BodyShort>
      <BodyShort spacing>
        OBS: NAV kan ikke se planen før dere har delt den.
      </BodyShort>
    </Alert>
  );
};
