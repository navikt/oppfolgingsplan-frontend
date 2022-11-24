import { Heading } from "@navikt/ds-react";
import { Row } from "components/blocks/wrappers/Row";
import { SpacedDiv } from "components/blocks/wrappers/SpacedDiv";
import { Oppfolgingsplan } from "../../../schema/oppfolgingsplanSchema";
import { AapnePlanSomPDF } from "../AapnePlanSomPDF";
import { GodkjennPlanTidspunkter } from "../GodkjennPlanTidspunkter";
import { SePlan } from "../SePlan";
import { TidligereOppfolgingsplaner } from "../TidligereOppfolgingsplaner";
import { TilLandingssideKnapp } from "../TilLandingssideKnapp";
import { AvbrytPlanKnapp } from "./AvbrytPlanKnapp";
import { BothApprovedOppfolgingsplan } from "./BothApprovedOppfolgingsplan";
import { ForcedApprovedOppfolgingsplan } from "./ForcedApprovedOppfolgingsplan";
import { GodkjentPlanDeltBekreftelse } from "./GodkjentPlanDeltBekreftelse";
import { HvaSkjerNa } from "./HvaSkjerNa";
import { DelMedNavOgFastlegeButtons } from "./DelMedNavOgFastlegeButtons";
import { erOppfolgingsplanTidligere } from "../../../utils/oppfolgingplanUtils";

interface Props {
  oppfolgingsplan: Oppfolgingsplan;
}

export const GodkjentPlan = ({ oppfolgingsplan }: Props) => {
  if (
    !oppfolgingsplan.godkjentPlan ||
    !oppfolgingsplan.arbeidsgiver?.naermesteLeder
  ) {
    return null;
  }

  const godkjentPlan = oppfolgingsplan.godkjentPlan;

  return (
    <SpacedDiv>
      <SpacedDiv marginTop={"2rem"}>
        <Heading size={"medium"} level={"2"} spacing>
          Godkjent plan for {oppfolgingsplan.virksomhet?.navn}
        </Heading>
      </SpacedDiv>

      {godkjentPlan.tvungenGodkjenning ? (
        <ForcedApprovedOppfolgingsplan
          narmesteLeder={oppfolgingsplan.arbeidsgiver.naermesteLeder}
        />
      ) : (
        <BothApprovedOppfolgingsplan
          narmesteLeder={oppfolgingsplan.arbeidsgiver.naermesteLeder}
        />
      )}

      <GodkjennPlanTidspunkter
        gyldighetstidspunkt={godkjentPlan.gyldighetstidspunkt!}
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
