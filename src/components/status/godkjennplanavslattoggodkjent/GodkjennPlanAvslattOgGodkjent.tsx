import { BodyShort } from "@navikt/ds-react";
import { Row } from "components/blocks/wrappers/Row";
import { SpacedDiv } from "components/blocks/wrappers/SpacedDiv";
import { AvvisPlanKnapp } from "../AvvisPlanKnapp";
import {
  GodkjennOppfolgingsplan,
  MotpartNavnForAltinn,
} from "../GodkjennOppfolgingsplan";
import { GodkjennPlanTidspunkter } from "../GodkjennPlanTidspunkter";
import { SePlan } from "../SePlan";
import { TilLandingssideKnapp } from "../TilLandingssideKnapp";
import { Godkjenning, Oppfolgingsplan } from "../../../types/oppfolgingsplan";

interface Props {
  oppfolgingsplan: Oppfolgingsplan;
  description: string;
  motpartNavnForAltinn: MotpartNavnForAltinn;
}

export const GodkjennPlanAvslattOgGodkjent = ({
  oppfolgingsplan,
  description,
  motpartNavnForAltinn,
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
        motpartNavnForAltinn={motpartNavnForAltinn}
      />
      <TilLandingssideKnapp />
    </SpacedDiv>
  );
};
