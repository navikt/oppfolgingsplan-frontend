import { BodyShort, Button } from "@navikt/ds-react";
import { SpacedDiv } from "components/blocks/wrappers/SpacedDiv";
import { Oppfolgingsplan } from "../../../schema/oppfolgingsplanSchema";

interface Props {
  oppfolgingsplan: Oppfolgingsplan;
}

export const GodkjennPlanAvslatt = ({ oppfolgingsplan }: Props) => {
  return (
    <SpacedDiv>
      <BodyShort spacing>
        Du kan gjøre endringer slik at dere får en god plan.
      </BodyShort>
      <Button>Rediger planen</Button>
    </SpacedDiv>
  );
};
