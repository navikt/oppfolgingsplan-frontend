import { BodyShort } from "@navikt/ds-react";
import { NarmesteLeder } from "../../../../schema/narmestelederSchema";

interface Props {
  narmesteLeder: NarmesteLeder;
}

export const ForcedApprovedOppfolgingsplan = ({ narmesteLeder }: Props) => {
  return (
    <BodyShort spacing>
      Planen er laget av arbeidsgiveren din. Er du uenig i innholdet, må du
      snakke med {narmesteLeder.navn}.
    </BodyShort>
  );
};
