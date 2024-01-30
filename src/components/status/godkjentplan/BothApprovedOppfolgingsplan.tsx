import { BodyShort } from "@navikt/ds-react";
import { NarmesteLederDTO } from "../../../schema/narmestelederSchema";
import { SpacedDiv } from "../../blocks/wrappers/SpacedDiv";

interface Props {
  narmesteLeder: NarmesteLederDTO;
}

export const BothApprovedOppfolgingsplan = ({ narmesteLeder }: Props) => {
  return (
    <SpacedDiv>
      <BodyShort>
        Denne versjonen av planen er godkjent av {narmesteLeder.navn} og deg.
      </BodyShort>
    </SpacedDiv>
  );
};
