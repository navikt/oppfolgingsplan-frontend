import { SpacedDiv } from "../../blocks/wrappers/SpacedDiv";
import { BodyLong, Heading } from "@navikt/ds-react";
import { Oppfolgingsplan } from "../../../schema/oppfolgingsplanSchema";
import { GodkjennPlanTidspunkter } from "../GodkjennPlanTidspunkter";
import { SePlan } from "../SePlan";
import { TidligereOppfolgingsplaner } from "../TidligereOppfolgingsplaner";
import { TilLandingssideKnapp } from "../TilLandingssideKnapp";
import { NullstillGodkjenningKnapp } from "../NullstillGodkjenningKnapp";
import Infobox from "./Infobox";

interface Props {
  oppfolgingsplan: Oppfolgingsplan;
}

function GodkjennPlanSendt({ oppfolgingsplan }: Props) {
  const gyldighetstidspunkt =
    oppfolgingsplan?.godkjenninger?.[0]?.gyldighetstidspunkt;

  const narmesteLederNavn = oppfolgingsplan.arbeidsgiver?.naermesteLeder?.navn;

  return (
    <SpacedDiv>
      <Heading level="2" size="large" spacing>
        Planen er sendt til godkjenning
      </Heading>

      <BodyLong spacing>
        Du har sendt en ny versjon av oppfølgingsplanen til din arbeidsgiver
        {narmesteLederNavn ? ` ${narmesteLederNavn}.` : "."}
      </BodyLong>

      <GodkjennPlanTidspunkter gyldighetstidspunkt={gyldighetstidspunkt} />

      <SePlan oppfolgingsplan={oppfolgingsplan} />

      <NullstillGodkjenningKnapp oppfolgingsplanId={oppfolgingsplan.id} />

      <TidligereOppfolgingsplaner
        avbruttOppfolgingsplaner={oppfolgingsplan?.avbruttPlanListe ?? []}
      />

      <Infobox />

      <TilLandingssideKnapp />
    </SpacedDiv>
  );
}

export default GodkjennPlanSendt;
