import { BodyShort } from "@navikt/ds-react";
import { SpacedDiv } from "components/blocks/wrappers/SpacedDiv";
import { Oppfolgingsplan } from "../../../schema/oppfolgingsplanSchema";
import { NullstillGodkjenningKnapp } from "../NullstillGodkjenningKnapp";

interface Props {
  oppfolgingsplan: Oppfolgingsplan;
}

export const GodkjennPlanAvslatt = ({ oppfolgingsplan }: Props) => {
  return (
    <SpacedDiv>
      <BodyShort spacing>
        Du kan gjøre endringer slik at dere får en god plan.
      </BodyShort>
      <NullstillGodkjenningKnapp oppfolgingsplanId={oppfolgingsplan.id} />
    </SpacedDiv>
  );
};
