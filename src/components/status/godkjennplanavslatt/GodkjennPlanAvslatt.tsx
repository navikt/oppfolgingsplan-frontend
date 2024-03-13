import { BodyShort } from "@navikt/ds-react";
import { SpacedDiv } from "../../blocks/wrappers/SpacedDiv";
import { NullstillGodkjenningKnapp } from "../NullstillGodkjenningKnapp";
import { OppfolgingsplanDTO } from "../../../schema/oppfolgingsplanSchema";

interface Props {
  oppfolgingsplan: OppfolgingsplanDTO;
}

export const GodkjennPlanAvslatt = ({ oppfolgingsplan }: Props) => {
  return (
    <SpacedDiv>
      <BodyShort spacing>
        Du kan gjøre endringer slik at dere får en god plan.
      </BodyShort>
      <NullstillGodkjenningKnapp oppfolgingsplan={oppfolgingsplan} />
    </SpacedDiv>
  );
};
