import { BodyShort } from "@navikt/ds-react";
import { Row } from "components/blocks/wrappers/Row";
import { SpacedDiv } from "components/blocks/wrappers/SpacedDiv";
import { AvvisPlanKnapp } from "../AvvisPlanKnapp";
import {
  AltinnTargetAudience,
  GodkjennOppfolgingsplan,
} from "../GodkjennOppfolgingsplan";
import { GodkjennPlanTidspunkter } from "../GodkjennPlanTidspunkter";
import { SePlan } from "../SePlan";
import { TilLandingssideKnapp } from "../TilLandingssideKnapp";
import { Godkjenning, Oppfolgingsplan } from "../../../types/oppfolgingsplan";

interface Props {
  oppfolgingsplan: Oppfolgingsplan;
  description: string;
  altinnTargetAudience: AltinnTargetAudience;
}

export const GodkjennPlanAvslattOgGodkjent = ({
  oppfolgingsplan,
  description,
  altinnTargetAudience,
}: Props) => {
  const gyldighetstidspunkt = oppfolgingsplan.godkjenninger?.find(
    (godkjenning: Godkjenning) => {
      return godkjenning.godkjent;
    }
  )?.gyldighetstidspunkt;

  if (!gyldighetstidspunkt) {
    return null;
  }

  return (
    <SpacedDiv>
      <BodyShort spacing>{description}</BodyShort>

      <GodkjennPlanTidspunkter gyldighetstidspunkt={gyldighetstidspunkt} />

      <Row marginBottom={"2rem"}>
        <SePlan oppfolgingsplan={oppfolgingsplan} />
        <AvvisPlanKnapp oppfolgingsplanId={oppfolgingsplan.id} />
      </Row>

      <GodkjennOppfolgingsplan
        oppfolgingsplanId={oppfolgingsplan.id}
        altinnTargetAudience={altinnTargetAudience}
      />
      <TilLandingssideKnapp />
    </SpacedDiv>
  );
};
