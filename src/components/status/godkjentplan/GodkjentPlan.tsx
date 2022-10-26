import { Heading } from "@navikt/ds-react";
import { Row } from "components/blocks/wrappers/Row";
import { SpacedDiv } from "components/blocks/wrappers/SpacedDiv";
import { Oppfolgingsplan } from "../../../schema/oppfolgingsplanSchema";
import { AapnePlanSomPDF } from "../AapnePlanSomPDF";
import { AvbrytPlanKnapp } from "../AvbrytPlanKnapp";
import { GodkjennPlanTidspunkter } from "../GodkjennPlanTidspunkter";
import { SePlan } from "../SePlan";
import { TidligereOppfolgingsplaner } from "../TidligereOppfolgingsplaner";
import { TilAlleOppfolgingsplanerKnapp } from "../TilAlleOppfolgingsplanerKnapp";
import { BothApprovedOppfolgingsplan } from "./BothApprovedOppfolgingsplan";
import { DelMedFastlegeKnapp } from "./DelMedFastlegeKnapp";
import { DelMedNavKnapp } from "./DelMedNavKnapp";
import { ForcedApprovedOppfolgingsplan } from "./ForcedApprovedOppfolgingsplan";
import { GodkjentPlanDeltBekreftelse } from "./GodkjentPlanDeltBekreftelse";
import { HvaSkjerNa } from "./HvaSkjerNa";

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
        <AvbrytPlanKnapp oppfolgingsplanId={oppfolgingsplan.id} />
      </Row>

      <TidligereOppfolgingsplaner
        avbruttOppfolgingsplaner={oppfolgingsplan?.avbruttPlanListe ?? []}
      />

      <Row marginBottom={"2rem"}>
        {!oppfolgingsplan.godkjentPlan.deltMedNAV && (
          <DelMedNavKnapp oppfolgingsplanId={oppfolgingsplan.id} />
        )}
        {!oppfolgingsplan.godkjentPlan.deltMedFastlege && (
          <DelMedFastlegeKnapp oppfolgingsplanId={oppfolgingsplan.id} />
        )}
      </Row>

      <HvaSkjerNa />

        <TilAlleOppfolgingsplanerKnapp />
    </SpacedDiv>
  );
};
