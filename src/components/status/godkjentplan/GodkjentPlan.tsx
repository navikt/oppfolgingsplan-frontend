import { Heading } from "@navikt/ds-react";
import { Row } from "components/blocks/wrappers/Row";
import { SpacedDiv } from "components/blocks/wrappers/SpacedDiv";
import { AapnePlanSomPDF } from "../AapnePlanSomPDF";
import { GodkjennPlanTidspunkter } from "../GodkjennPlanTidspunkter";
import { SePlan } from "../SePlan";
import { TidligereOppfolgingsplaner } from "../TidligereOppfolgingsplaner";
import { TilLandingssideKnapp } from "../TilLandingssideKnapp";
import { AvbrytPlanKnapp } from "./AvbrytPlanKnapp";
import { GodkjentPlanDeltBekreftelse } from "./GodkjentPlanDeltBekreftelse";
import { HvaSkjerNa } from "./HvaSkjerNa";
import { DelMedNavOgFastlegeButtons } from "./DelMedNavOgFastlegeButtons";
import { erOppfolgingsplanTidligere } from "../../../utils/oppfolgingplanUtils";
import { Oppfolgingsplan } from "../../../types/oppfolgingsplan";
import { ReactNode } from "react";

interface Props {
  oppfolgingsplan: Oppfolgingsplan;
  children: ReactNode;
}

export const GodkjentPlan = ({ oppfolgingsplan, children }: Props) => {
  if (!oppfolgingsplan.godkjentPlan) {
    return null;
  }

  return (
    <SpacedDiv>
      <SpacedDiv marginTop={"2rem"}>
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

      <Row marginBottom={"2rem"}>
        <SePlan oppfolgingsplan={oppfolgingsplan} />
        <AapnePlanSomPDF oppfolgingsplanId={oppfolgingsplan.id} />
        {!erOppfolgingsplanTidligere(oppfolgingsplan) && (
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
