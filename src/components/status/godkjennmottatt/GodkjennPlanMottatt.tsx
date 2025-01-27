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
import { useFerdigstillVarselForPlan } from "../utils/varselHooks";
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

  useFerdigstillVarselForPlan();

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
        oppfolgingsplan={oppfolgingsplan}
        motpartNavnForAltinn={motpartNavnForAltinn}
      />

      <TilLandingssideKnapp />
    </SpacedDiv>
  );
};
