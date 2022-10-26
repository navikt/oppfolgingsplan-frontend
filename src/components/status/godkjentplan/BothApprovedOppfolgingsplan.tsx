import { BodyShort } from "@navikt/ds-react";
import { NarmesteLeder } from "../../../schema/narmestelederSchema";
import { SpacedDiv } from "../../blocks/wrappers/SpacedDiv";

interface Props {
  narmesteLeder: NarmesteLeder;
}

export const BothApprovedOppfolgingsplan = ({ narmesteLeder }: Props) => {
  return (
    <SpacedDiv>
      <BodyShort spacing>
        Denne versjonen av planen er godkjent av {narmesteLeder.navn} og deg.
      </BodyShort>
    </SpacedDiv>
  );
};
