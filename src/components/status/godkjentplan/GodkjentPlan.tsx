import { BothApprovedOppfolgingsplan } from "./BothApprovedOppfolgingsplan";
import { DelMedFastlegeKnapp } from "./DelMedFastlegeKnapp";
import { DelMedNavKnapp } from "./DelMedNavKnapp";
import { ForcedApprovedOppfolgingsplan } from "./ForcedApprovedOppfolgingsplan";
import { GodkjentPlanDeltBekreftelse } from "./GodkjentPlanDeltBekreftelse";
import { HvaSkjerNa } from "./HvaSkjerNa";
import {Oppfolgingsplan} from "../../../schema/oppfolgingsplanSchema";
import { SpacedDiv } from "components/blocks/wrappers/SpacedDiv";
import {StatusHeader} from "../../blocks/wrappers/old/StatusHeader";
import {HakeGronnLysImage} from "../../blocks/images/imageComponents";
import {GodkjennPlanTidspunkter} from "../GodkjennPlanTidspunkter";
import { Row } from "components/blocks/wrappers/Row";
import {SePlan} from "../SePlan";
import {AapnePlanSomPDF} from "../AapnePlanSomPDF";
import {AvbrytPlanKnapp} from "../AvbrytPlanKnapp";
import {TidligereOppfolgingsplaner} from "../TidligereOppfolgingsplaner";
import {TilbakeLenke} from "../TilbakeLenke";


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
      <StatusHeader svgUrl={HakeGronnLysImage} tittel={"Oppfølgingsplanen"} />

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

      <Row marginBottom={"2rem"}>
        {!oppfolgingsplan.godkjentPlan.deltMedNAV && (
          <DelMedNavKnapp oppfolgingsplanId={oppfolgingsplan.id} />
        )}
        {!oppfolgingsplan.godkjentPlan.deltMedFastlege && (
          <DelMedFastlegeKnapp oppfolgingsplanId={oppfolgingsplan.id} />
        )}
      </Row>

      <HvaSkjerNa />

      <TidligereOppfolgingsplaner
        avbruttOppfolgingsplaner={oppfolgingsplan?.avbruttPlanListe ?? []}
      />

      <TilbakeLenke />
    </SpacedDiv>
  );
};
