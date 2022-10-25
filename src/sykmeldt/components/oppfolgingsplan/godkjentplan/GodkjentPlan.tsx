import { StatusHeader } from "@/common/components/wrappers/old/StatusHeader";
import { Row } from "@/common/components/wrappers/Row";
import { SpacedDiv } from "@/common/components/wrappers/SpacedDiv";
import { HakeGronnLysImage } from "@/common/images/imageComponents";
import { Oppfolgingsplan } from "../../../../schema/oppfolgingsplanSchema";
import { AvbrytPlanKnapp } from "../godkjenn/AvbrytPlanKnapp";
import { GodkjennPlanTidspunkter } from "../godkjenn/GodkjennPlanTidspunkter";
import { SePlan } from "../godkjenn/SePlan";
import { TidligereOppfolgingsplaner } from "../godkjenn/TidligereOppfolgingsplaner";
import { TilbakeLenke } from "../godkjenn/TilbakeLenke";
import { BothApprovedOppfolgingsplan } from "./BothApprovedOppfolgingsplan";
import { DelMedFastlegeKnapp } from "./DelMedFastlegeKnapp";
import { DelMedNavKnapp } from "./DelMedNavKnapp";
import { ForcedApprovedOppfolgingsplan } from "./ForcedApprovedOppfolgingsplan";
import { GodkjentPlanDeltBekreftelse } from "./GodkjentPlanDeltBekreftelse";
import { HvaSkjerNa } from "./HvaSkjerNa";
import { LastNed } from "./LastNed";

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
        <LastNed oppfolgingsplanId={oppfolgingsplan.id} />
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
