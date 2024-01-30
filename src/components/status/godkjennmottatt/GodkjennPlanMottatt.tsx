import { AvvisPlanKnapp } from "../AvvisPlanKnapp";
import {
  GodkjennOppfolgingsplan,
  MotpartNavnForAltinn,
} from "../GodkjennOppfolgingsplan";
import { GodkjennPlanTidspunkter } from "../GodkjennPlanTidspunkter";
import { SePlan } from "../SePlan";
import { TidligereOppfolgingsplaner } from "../TidligereOppfolgingsplaner";
import { TilLandingssideKnapp } from "../TilLandingssideKnapp";
import { SpacedDiv } from "../../blocks/wrappers/SpacedDiv";
import { BodyLong } from "@navikt/ds-react";
import { Row } from "../../blocks/wrappers/Row";
import { useFerdigstillGodkjennPlanVarsel } from "../../../api/queries/varsel/ferdigstillingQueries";
import { useOppfolgingsplanRouteId } from "../../../hooks/routeHooks";
import { useFerdigstillVarsel } from "../utils/varselHooks";
import { OppfolgingsplanDTO } from "../../../schema/oppfolgingsplanSchema";

interface Props {
  oppfolgingsplan: OppfolgingsplanDTO;
  description: string;
  motpartNavnForAltinn: MotpartNavnForAltinn;
}

export const GodkjennPlanMottatt = ({
  oppfolgingsplan,
  description,
  motpartNavnForAltinn,
}: Props) => {
  const gyldighetstidspunkt =
    oppfolgingsplan?.godkjenninger?.[0]?.gyldighetstidspunkt;
  const ferdigstillVarsel = useFerdigstillGodkjennPlanVarsel();
  const oppfolgingsplanId = useOppfolgingsplanRouteId();

  useFerdigstillVarsel(ferdigstillVarsel, oppfolgingsplanId);

  if (!gyldighetstidspunkt) {
    return null;
  }

  return (
    <SpacedDiv>
      <BodyLong spacing={true}>{description}</BodyLong>

      <GodkjennPlanTidspunkter gyldighetstidspunkt={gyldighetstidspunkt} />

      <Row className="mb-8">
        <SePlan oppfolgingsplan={oppfolgingsplan} />
        <AvvisPlanKnapp oppfolgingsplanId={oppfolgingsplan.id} />
      </Row>

      <TidligereOppfolgingsplaner
        avbruttOppfolgingsplaner={oppfolgingsplan?.avbruttPlanListe ?? []}
      />

      <GodkjennOppfolgingsplan
        oppfolgingsplanId={oppfolgingsplan.id}
        motpartNavnForAltinn={motpartNavnForAltinn}
        godkjenninger={oppfolgingsplan.godkjenninger}
      />

      <TilLandingssideKnapp />
    </SpacedDiv>
  );
};
