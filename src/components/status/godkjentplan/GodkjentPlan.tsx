import { Heading } from "@navikt/ds-react";
import { Row } from "../../blocks/wrappers/Row";
import { SpacedDiv } from "../../blocks/wrappers/SpacedDiv";
import { AapnePlanSomPDF } from "../AapnePlanSomPDF";
import { GodkjennPlanTidspunkter } from "../GodkjennPlanTidspunkter";
import { SePlan } from "../SePlan";
import { TidligereOppfolgingsplaner } from "../TidligereOppfolgingsplaner";
import { TilLandingssideKnapp } from "../TilLandingssideKnapp";
import { AvbrytPlanKnapp } from "./AvbrytPlanKnapp";
import { GodkjentPlanDeltBekreftelse } from "./GodkjentPlanDeltBekreftelse";
import { HvaSkjerNa } from "./HvaSkjerNa";
import { DelMedNavOgFastlegeButtons } from "./DelMedNavOgFastlegeButtons";
import { erUtloptGodkjentPlan } from "../../../utils/oppfolgingplanUtils";
import { ReactNode } from "react";
import { OppfolgingsplanDTO } from "../../../schema/oppfolgingsplanSchema";

interface Props {
  oppfolgingsplan: OppfolgingsplanDTO;
  children: ReactNode;
}

export const GodkjentPlan = ({ oppfolgingsplan, children }: Props) => {
  if (!oppfolgingsplan.godkjentPlan) {
    return null;
  }

  return (
    <SpacedDiv>
      <SpacedDiv className="mt-8">
        <Heading size={"medium"} level={"2"} spacing>
          Godkjent plan for {oppfolgingsplan.virksomhet?.navn}
        </Heading>
      </SpacedDiv>

      {children}

      <GodkjennPlanTidspunkter
        gyldighetstidspunkt={oppfolgingsplan.godkjentPlan.gyldighetstidspunkt}
      />

      <GodkjentPlanDeltBekreftelse
        godkjentPlan={oppfolgingsplan.godkjentPlan}
      />

      <Row className="mb-8">
        <SePlan oppfolgingsplan={oppfolgingsplan} />
        <AapnePlanSomPDF oppfolgingsplanId={oppfolgingsplan.id} />
        {!erUtloptGodkjentPlan(oppfolgingsplan) && (
          <AvbrytPlanKnapp oppfolgingsplanId={oppfolgingsplan.id} />
        )}
      </Row>

      <TidligereOppfolgingsplaner
        avbruttOppfolgingsplaner={oppfolgingsplan?.avbruttPlanListe ?? []}
      />

      <DelMedNavOgFastlegeButtons
        oppfolgingsplanId={oppfolgingsplan.id}
        godkjentPlan={oppfolgingsplan.godkjentPlan}
      />

      <HvaSkjerNa />

      <TilLandingssideKnapp />
    </SpacedDiv>
  );
};
