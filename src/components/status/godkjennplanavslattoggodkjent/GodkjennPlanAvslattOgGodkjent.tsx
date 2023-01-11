import { BodyShort } from "@navikt/ds-react";
import { Row } from "components/blocks/wrappers/Row";
import { SpacedDiv } from "components/blocks/wrappers/SpacedDiv";
import { AvvisPlanKnapp } from "../AvvisPlanKnapp";
import { GodkjennOppfolgingsplan } from "../GodkjennOppfolgingsplan";
import { GodkjennPlanTidspunkter } from "../GodkjennPlanTidspunkter";
import { SePlan } from "../SePlan";
import { TilLandingssideKnapp } from "../TilLandingssideKnapp";
import { Godkjenning, Oppfolgingsplan } from "../../../types/oppfolgingsplan";

interface Props {
  oppfolgingsplan: Oppfolgingsplan;
}

export const GodkjennPlanAvslattOgGodkjent = ({ oppfolgingsplan }: Props) => {
  const gyldighetstidspunkt = oppfolgingsplan.godkjenninger?.find(
    (godkjenning: Godkjenning) => {
      return godkjenning.godkjent;
    }
  )?.gyldighetstidspunkt;

  if (!gyldighetstidspunkt || !oppfolgingsplan.arbeidsgiver?.naermesteLeder) {
    return null;
  }

  return (
    <SpacedDiv>
      <BodyShort spacing>
        {oppfolgingsplan.arbeidsgiver.naermesteLeder.navn} har gjort noen
        endringer i planen og sendt den tilbake til deg.
      </BodyShort>

      <GodkjennPlanTidspunkter gyldighetstidspunkt={gyldighetstidspunkt} />

      <Row marginBottom={"2rem"}>
        <SePlan oppfolgingsplan={oppfolgingsplan} />
        <AvvisPlanKnapp oppfolgingsplanId={oppfolgingsplan.id} />
      </Row>
      <GodkjennOppfolgingsplan oppfolgingsplanId={oppfolgingsplan.id} />
      <TilLandingssideKnapp />
    </SpacedDiv>
  );
};
