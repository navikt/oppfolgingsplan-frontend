import { Oppfolgingsplan } from "../../../schema/oppfolgingsplanSchema";
import { AvbrytPlanKnapp } from "../AvbrytPlanKnapp";
import { GodkjennOppfolgingsplan } from "./GodkjennOppfolgingsplan";
import { GodkjennPlanTidspunkter } from "../GodkjennPlanTidspunkter";
import { SePlan } from "../SePlan";
import { TidligereOppfolgingsplaner } from "../TidligereOppfolgingsplaner";
import { TilAlleOppfolgingsplanerKnapp } from "../TilAlleOppfolgingsplanerKnapp";
import { SpacedDiv } from "components/blocks/wrappers/SpacedDiv";

interface Props {
  oppfolgingsplan: Oppfolgingsplan;
}

export const OppfolgingsdialogerGodkjenn = ({ oppfolgingsplan }: Props) => {
  const gyldighetstidspunkt =
    oppfolgingsplan?.godkjenninger?.[0]?.gyldighetstidspunkt;

  if (!gyldighetstidspunkt) {
    return null;
  }

  return (
    <SpacedDiv>
      <p>
        {`${oppfolgingsplan?.arbeidsgiver?.naermesteLeder?.navn} har sendt deg en ny oppfølgingsplan for godkjenning.`}
      </p>
      <GodkjennPlanTidspunkter gyldighetstidspunkt={gyldighetstidspunkt} />
      <div>
        <SePlan oppfolgingsplan={oppfolgingsplan} />
        <AvbrytPlanKnapp oppfolgingsplanId={oppfolgingsplan.id} />
      </div>
      <TidligereOppfolgingsplaner
        avbruttOppfolgingsplaner={oppfolgingsplan?.avbruttPlanListe ?? []}
      />
      <GodkjennOppfolgingsplan />
      <TilAlleOppfolgingsplanerKnapp />
    </SpacedDiv>
  );
};
