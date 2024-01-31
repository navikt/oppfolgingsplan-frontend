import { Row } from "../../blocks/wrappers/Row";
import { SpacedDiv } from "../../blocks/wrappers/SpacedDiv";
import { AapnePlanSomPDF } from "../AapnePlanSomPDF";
import { GodkjentPlanDeltBekreftelse } from "../godkjentplan/GodkjentPlanDeltBekreftelse";
import { SePlan } from "../SePlan";
import { TilLandingssideKnapp } from "../TilLandingssideKnapp";
import { GodkjentPlanAvbruttTidspunkt } from "./GodkjentPlanAvbruttTidspunkt";
import { TilGjeldendePlanKnapp } from "./TilGjeldendePlanKnapp";
import { DelMedNavOgFastlegeButtons } from "../godkjentplan/DelMedNavOgFastlegeButtons";
import { ReactNode } from "react";
import { OppfolgingsplanDTO } from "../../../schema/oppfolgingsplanSchema";

interface Props {
  oppfolgingsplan: OppfolgingsplanDTO;
  children: ReactNode;
}

export const GodkjentPlanAvbrutt = ({ oppfolgingsplan, children }: Props) => {
  if (!oppfolgingsplan.godkjentPlan) {
    return null;
  }

  return (
    <SpacedDiv>
      <TilGjeldendePlanKnapp oppfolgingsplan={oppfolgingsplan} />

      {children}

      <GodkjentPlanAvbruttTidspunkt
        godkjentPlan={oppfolgingsplan.godkjentPlan}
      />

      <GodkjentPlanDeltBekreftelse
        godkjentPlan={oppfolgingsplan.godkjentPlan}
      />

      <Row className="mb-8">
        <SePlan oppfolgingsplan={oppfolgingsplan} />

        <AapnePlanSomPDF oppfolgingsplanId={oppfolgingsplan.id} />
      </Row>

      <DelMedNavOgFastlegeButtons
        oppfolgingsplanId={oppfolgingsplan.id}
        godkjentPlan={oppfolgingsplan.godkjentPlan}
      />

      <TilLandingssideKnapp />
    </SpacedDiv>
  );
};
