import { AvvisPlanKnapp } from "../AvvisPlanKnapp";
import { GodkjennOppfolgingsplan } from "../GodkjennOppfolgingsplan";
import { GodkjennPlanTidspunkter } from "../GodkjennPlanTidspunkter";
import { SePlan } from "../SePlan";
import { TidligereOppfolgingsplaner } from "../TidligereOppfolgingsplaner";
import { TilLandingssideKnapp } from "../TilLandingssideKnapp";
import { SpacedDiv } from "components/blocks/wrappers/SpacedDiv";
import { BodyLong } from "@navikt/ds-react";
import { Row } from "../../blocks/wrappers/Row";
import { Oppfolgingsplan } from "../../../types/oppfolgingsplan";

interface Props {
  oppfolgingsplan: Oppfolgingsplan;
  description: string;
  altinnTargetAudience: string;
}

export const GodkjennPlanMottatt = ({
  oppfolgingsplan,
  description,
  altinnTargetAudience,
}: Props) => {
  const gyldighetstidspunkt =
    oppfolgingsplan?.godkjenninger?.[0]?.gyldighetstidspunkt;

  if (!gyldighetstidspunkt) {
    return null;
  }

  return (
    <SpacedDiv>
      <BodyLong spacing={true}>{description}</BodyLong>

      <GodkjennPlanTidspunkter gyldighetstidspunkt={gyldighetstidspunkt} />

      <Row marginBottom={"2rem"}>
        <SePlan oppfolgingsplan={oppfolgingsplan} />
        <AvvisPlanKnapp oppfolgingsplanId={oppfolgingsplan.id} />
      </Row>

      <TidligereOppfolgingsplaner
        avbruttOppfolgingsplaner={oppfolgingsplan?.avbruttPlanListe ?? []}
      />

      <GodkjennOppfolgingsplan
        oppfolgingsplanId={oppfolgingsplan.id}
        altinnTargetAudience={altinnTargetAudience}
      />

      <TilLandingssideKnapp />
    </SpacedDiv>
  );
};
