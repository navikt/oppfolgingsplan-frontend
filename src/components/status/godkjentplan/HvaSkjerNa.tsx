import { Alert, BodyShort, Heading } from "@navikt/ds-react";
import { SpacedDiv } from "../../blocks/wrappers/SpacedDiv";

export const HvaSkjerNa = () => {
  return (
    <SpacedDiv>
      <Alert variant="info">
        <Heading spacing size="small" level="3">
          Hva skjer nå?
        </Heading>
        <BodyShort spacing>
          Innen 4 uker av sykefraværet skal oppfølgingsplanen deles med
          fastlegen. Dere kan dele den med både legen og NAV når dere er blitt
          enige.
        </BodyShort>
        <BodyShort spacing>
          OBS: NAV kan ikke se planen før dere har delt den.
        </BodyShort>
      </Alert>
    </SpacedDiv>
  );
};
