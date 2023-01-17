import { SpacedDiv } from "../../blocks/wrappers/SpacedDiv";
import { BodyLong, Heading } from "@navikt/ds-react";
import { GodkjennPlanTidspunkter } from "../GodkjennPlanTidspunkter";
import { SePlan } from "../SePlan";
import { TidligereOppfolgingsplaner } from "../TidligereOppfolgingsplaner";
import { TilLandingssideKnapp } from "../TilLandingssideKnapp";
import { NullstillGodkjenningKnapp } from "../NullstillGodkjenningKnapp";
import { Row } from "../../blocks/wrappers/Row";
import { Oppfolgingsplan } from "../../../types/oppfolgingsplan";
import { ReactNode } from "react";

interface Props {
  oppfolgingsplan: Oppfolgingsplan;
  description: string;
  children?: ReactNode;
}

function GodkjennPlanSendt({ oppfolgingsplan, description, children }: Props) {
  if (!oppfolgingsplan?.godkjenninger[0]) return null;

  return (
    <SpacedDiv>
      <Heading level="2" size="medium" spacing>
        Planen er sendt til godkjenning
      </Heading>

      <BodyLong spacing>{description}</BodyLong>

      <GodkjennPlanTidspunkter
        gyldighetstidspunkt={
          oppfolgingsplan.godkjenninger[0].gyldighetstidspunkt
        }
      />

      <Row marginBottom={"2rem"}>
        <SePlan oppfolgingsplan={oppfolgingsplan} />

        <NullstillGodkjenningKnapp oppfolgingsplanId={oppfolgingsplan.id} />
      </Row>

      <TidligereOppfolgingsplaner
        avbruttOppfolgingsplaner={oppfolgingsplan?.avbruttPlanListe ?? []}
      />

      {children}

      <TilLandingssideKnapp />
    </SpacedDiv>
  );
}

export default GodkjennPlanSendt;
