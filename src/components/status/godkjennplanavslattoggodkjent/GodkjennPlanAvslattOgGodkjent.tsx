import { BodyShort } from "@navikt/ds-react";
import { Row } from "../../blocks/wrappers/Row";
import { SpacedDiv } from "../../blocks/wrappers/SpacedDiv";
import { AvvisPlanKnapp } from "../AvvisPlanKnapp";
import {
  GodkjennOppfolgingsplan,
  MotpartNavnForAltinn,
} from "../GodkjennOppfolgingsplan";
import { GodkjennPlanTidspunkter } from "../GodkjennPlanTidspunkter";
import { SePlan } from "../SePlan";
import { TilLandingssideKnapp } from "../TilLandingssideKnapp";
import { useFerdigstillVarselForPlan } from "../utils/varselHooks";
import {
  GodkjenningDTO,
  OppfolgingsplanDTO,
} from "../../../schema/oppfolgingsplanSchema";

interface Props {
  oppfolgingsplan: OppfolgingsplanDTO;
  description: string;
  motpartNavnForAltinn: MotpartNavnForAltinn;
}

export const GodkjennPlanAvslattOgGodkjent = ({
  oppfolgingsplan,
  description,
  motpartNavnForAltinn,
}: Props) => {
  const gyldighetstidspunkt = oppfolgingsplan.godkjenninger?.find(
    (godkjenning: GodkjenningDTO) => {
      return godkjenning.godkjent;
    },
  )?.gyldighetstidspunkt;

  useFerdigstillVarselForPlan();

  if (!gyldighetstidspunkt) {
    return null;
  }

  return (
    <SpacedDiv>
      <BodyShort spacing>{description}</BodyShort>

      <GodkjennPlanTidspunkter gyldighetstidspunkt={gyldighetstidspunkt} />

      <Row className="mb-8">
        <SePlan oppfolgingsplan={oppfolgingsplan} />
        <AvvisPlanKnapp oppfolgingsplanId={oppfolgingsplan.id} />
      </Row>

      <GodkjennOppfolgingsplan
        oppfolgingsplan={oppfolgingsplan}
        motpartNavnForAltinn={motpartNavnForAltinn}
      />
      <TilLandingssideKnapp />
    </SpacedDiv>
  );
};
