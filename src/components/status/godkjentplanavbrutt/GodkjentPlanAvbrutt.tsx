import { Oppfolgingsplan } from "../../../schema/oppfolgingsplanSchema";
import { Row } from "../../blocks/wrappers/Row";
import { SpacedDiv } from "../../blocks/wrappers/SpacedDiv";
import { AapnePlanSomPDF } from "../AapnePlanSomPDF";
import { BothApprovedOppfolgingsplan } from "../godkjentplan/BothApprovedOppfolgingsplan";
import { DelMedFastlegeKnapp } from "../godkjentplan/DelMedFastlegeKnapp";
import { DelMedNavKnapp } from "../godkjentplan/DelMedNavKnapp";
import { ForcedApprovedOppfolgingsplan } from "../godkjentplan/ForcedApprovedOppfolgingsplan";
import { GodkjentPlanDeltBekreftelse } from "../godkjentplan/GodkjentPlanDeltBekreftelse";
import { TilAlleOppfolgingsplanerKnapp } from "../TilAlleOppfolgingsplanerKnapp";
import { SePlan } from "../SePlan";
import { GodkjentPlanAvbruttTidspunkt } from "./GodkjentPlanAvbruttTidspunkt";
import { TilGjeldendePlanKnapp } from "./TilGjeldendePlanKnapp";

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
      <Row marginBottom={"2rem"}>
        {!oppfolgingsplan.godkjentPlan.deltMedNAV && (
          <DelMedNavKnapp oppfolgingsplanId={oppfolgingsplan.id} />
        )}
        {!oppfolgingsplan.godkjentPlan.deltMedFastlege && (
          <DelMedFastlegeKnapp oppfolgingsplanId={oppfolgingsplan.id} />
        )}
      </Row>
      <TilAlleOppfolgingsplanerKnapp />
    </SpacedDiv>
  );
};
