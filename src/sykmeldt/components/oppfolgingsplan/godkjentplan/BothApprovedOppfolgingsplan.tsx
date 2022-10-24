import { BodyShort } from "@navikt/ds-react";
import { NarmesteLeder } from "../../../../schema/narmestelederSchema";

interface Props {
  narmesteLeder: NarmesteLeder;
}

export const BothApprovedOppfolgingsplan = ({ narmesteLeder }: Props) => {
  return (
    <BodyShort spacing>
      Denne versjonen av planen er godkjent av {narmesteLeder.navn} og deg.
    </BodyShort>
  );
};
