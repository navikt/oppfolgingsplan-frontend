import { SpacedDiv } from "../../blocks/wrappers/SpacedDiv";
import { BodyLong } from "@navikt/ds-react";
import { Oppfolgingsplan } from "../../../schema/oppfolgingsplanSchema";
import { GodkjennPlanTidspunkter } from "../GodkjennPlanTidspunkter";
import { SePlan } from "../SePlan";
import { TidligereOppfolgingsplaner } from "../TidligereOppfolgingsplaner";
import { TilLandingssideKnapp } from "../TilLandingssideKnapp";
import { NullstillGodkjenningKnapp } from "../NullstillGodkjenningKnapp";
import Infobox from "./Infobox";
import { Row } from "../../blocks/wrappers/Row";

interface Props {
  oppfolgingsplan: Oppfolgingsplan;
}

function GodkjennPlanSendt({ oppfolgingsplan }: Props) {
  const gyldighetstidspunkt =
    oppfolgingsplan?.godkjenninger?.[0]?.gyldighetstidspunkt;

  const narmesteLederNavn = oppfolgingsplan.arbeidsgiver?.naermesteLeder?.navn;

  return (
    <SpacedDiv>
      <BodyLong spacing>
        Du har sendt en ny versjon av oppfølgingsplanen til din arbeidsgiver
        {narmesteLederNavn ? ` ${narmesteLederNavn}.` : "."}
      </BodyLong>

      <GodkjennPlanTidspunkter gyldighetstidspunkt={gyldighetstidspunkt} />

      <Row marginBottom={"2rem"}>
        <SePlan oppfolgingsplan={oppfolgingsplan} />

        <NullstillGodkjenningKnapp oppfolgingsplanId={oppfolgingsplan.id} />
      </Row>

      <TidligereOppfolgingsplaner
        avbruttOppfolgingsplaner={oppfolgingsplan?.avbruttPlanListe ?? []}
      />

      <Infobox />

      <TilLandingssideKnapp />
    </SpacedDiv>
  );
}

export default GodkjennPlanSendt;
