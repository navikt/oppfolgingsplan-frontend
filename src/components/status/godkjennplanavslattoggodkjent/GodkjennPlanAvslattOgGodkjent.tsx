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
import { useFerdigstillVarsel } from "../utils/varselHooks";
import { useFerdigstillGodkjennPlanVarsel } from "../../../api/queries/varsel/ferdigstillingQueries";
import { useOppfolgingsplanRouteId } from "../../../hooks/routeHooks";
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
  const ferdigstillVarsel = useFerdigstillGodkjennPlanVarsel();
  const oppfolgingsplanId = useOppfolgingsplanRouteId();

  useFerdigstillVarsel(ferdigstillVarsel, oppfolgingsplanId);

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
        oppfolgingsplanId={oppfolgingsplan.id}
        motpartNavnForAltinn={motpartNavnForAltinn}
        godkjenninger={oppfolgingsplan.godkjenninger}
      />
      <TilLandingssideKnapp />
    </SpacedDiv>
  );
};
