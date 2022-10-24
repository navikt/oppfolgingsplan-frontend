import { SpacedDiv } from "@/common/components/wrappers/SpacedDiv";
import { Oppfolgingsplan } from "../../../../schema/oppfolgingsplanSchema";
import { GjorEndringerKnapp } from "./GjorEndringerKnapp";
import { GodkjennOppfolgingsplan } from "./GodkjennOppfolgingsplan";
import { GodkjennPlanTidspunkter } from "./GodkjennPlanTidspunkter";
import { SePlan } from "./SePlan";
import { TidligereOppfolgingsplaner } from "./TidligereOppfolgingsplaner";
import { TilbakeLenke } from "./TilbakeLenke";

interface Props {
  oppfolgingsplan: Oppfolgingsplan;
}

export const OppfolgingsdialogerGodkjenn = ({ oppfolgingsplan }: Props) => {
  return (
    <SpacedDiv>
      <p>
        {`${oppfolgingsplan?.arbeidsgiver?.naermesteLeder?.navn} har sendt deg en ny oppfølgingsplan for godkjenning.`}
      </p>
      <GodkjennPlanTidspunkter oppfolgingsplan={oppfolgingsplan} />
      <div>
        <SePlan oppfolgingsplan={oppfolgingsplan} />
        <GjorEndringerKnapp oppfolgingsplanId={oppfolgingsplan.id} />
      </div>
      <TidligereOppfolgingsplaner
        avbruttOppfolgingsplaner={oppfolgingsplan?.avbruttPlanListe ?? []}
      />
      <GodkjennOppfolgingsplan />
      <TilbakeLenke />
    </SpacedDiv>
  );
};
