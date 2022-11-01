import { Oppfolgingsplan } from "../../../schema/oppfolgingsplanSchema";
import { Row } from "../../blocks/wrappers/Row";
import { SpacedDiv } from "../../blocks/wrappers/SpacedDiv";
import { AapnePlanSomPDF } from "../AapnePlanSomPDF";
import { BothApprovedOppfolgingsplan } from "../godkjentplan/BothApprovedOppfolgingsplan";
import { ForcedApprovedOppfolgingsplan } from "../godkjentplan/ForcedApprovedOppfolgingsplan";
import { GodkjentPlanDeltBekreftelse } from "../godkjentplan/GodkjentPlanDeltBekreftelse";
import { SePlan } from "../SePlan";
import { TilLandingssideKnapp } from "../TilLandingssideKnapp";
import { GodkjentPlanAvbruttTidspunkt } from "./GodkjentPlanAvbruttTidspunkt";
import { TilGjeldendePlanKnapp } from "./TilGjeldendePlanKnapp";
import { DelMedNavOgFastlegeButtons } from "../godkjentplan/DelMedNavOgFastlegeButtons";

interface Props {
  oppfolgingsplan: Oppfolgingsplan;
}

export const GodkjentPlanAvbrutt = ({ oppfolgingsplan }: Props) => {
  if (
    !oppfolgingsplan.godkjentPlan ||
    !oppfolgingsplan.arbeidsgiver?.naermesteLeder
  ) {
    return null;
  }

  const godkjentPlan = oppfolgingsplan.godkjentPlan;

  return (
    <SpacedDiv>
      <TilGjeldendePlanKnapp oppfolgingsplan={oppfolgingsplan} />
      {godkjentPlan.tvungenGodkjenning ? (
        <ForcedApprovedOppfolgingsplan
          narmesteLeder={oppfolgingsplan.arbeidsgiver.naermesteLeder}
        />
      ) : (
        <BothApprovedOppfolgingsplan
          narmesteLeder={oppfolgingsplan.arbeidsgiver.naermesteLeder}
        />
      )}

      <GodkjentPlanAvbruttTidspunkt godkjentPlan={godkjentPlan} />

      <GodkjentPlanDeltBekreftelse
        godkjentPlan={oppfolgingsplan.godkjentPlan}
      />

      <Row marginBottom={"2rem"}>
        <SePlan oppfolgingsplan={oppfolgingsplan} />
        <AapnePlanSomPDF oppfolgingsplanId={oppfolgingsplan.id} />
      </Row>

      <DelMedNavOgFastlegeButtons
        oppfolgingsplanId={oppfolgingsplan.id}
        godkjentPlan={godkjentPlan}
      />

      <TilLandingssideKnapp />
    </SpacedDiv>
  );
};
