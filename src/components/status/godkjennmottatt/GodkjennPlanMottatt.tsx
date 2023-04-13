import { AvvisPlanKnapp } from "../AvvisPlanKnapp";
import {
  GodkjennOppfolgingsplan,
  MotpartNavnForAltinn,
} from "../GodkjennOppfolgingsplan";
import { GodkjennPlanTidspunkter } from "../GodkjennPlanTidspunkter";
import { SePlan } from "../SePlan";
import { TidligereOppfolgingsplaner } from "../TidligereOppfolgingsplaner";
import { TilLandingssideKnapp } from "../TilLandingssideKnapp";
import { SpacedDiv } from "../../blocks/wrappers/SpacedDiv";
import { BodyLong } from "@navikt/ds-react";
import { Row } from "../../blocks/wrappers/Row";
import { Oppfolgingsplan } from "../../../types/oppfolgingsplan";
import { useFerdigstillGodkjennPlanVarsel } from "../../../api/queries/varsel/ferdigstillingQueries";
import { useOppfolgingsplanRouteId } from "../../../hooks/routeHooks";
import { useEffect } from "react";

interface Props {
  oppfolgingsplan: Oppfolgingsplan;
  description: string;
  motpartNavnForAltinn: MotpartNavnForAltinn;
}

export const GodkjennPlanMottatt = ({
  oppfolgingsplan,
  description,
  motpartNavnForAltinn,
}: Props) => {
  const gyldighetstidspunkt =
    oppfolgingsplan?.godkjenninger?.[0]?.gyldighetstidspunkt;
  const ferdigstillVarsel = useFerdigstillGodkjennPlanVarsel();
  const oppfolgingsplanId = useOppfolgingsplanRouteId();

  useEffect(() => {
    if (oppfolgingsplanId && gyldighetstidspunkt) {
      const varselKey = `ferdigstilt-varsel-${oppfolgingsplanId}`;
      const alleredeFerdigstilt = sessionStorage.getItem(varselKey);
      if (alleredeFerdigstilt) {
        return;
      }
      ferdigstillVarsel.mutate(oppfolgingsplanId);
      sessionStorage.setItem(varselKey, "true");
    }
  }, [ferdigstillVarsel, oppfolgingsplanId, gyldighetstidspunkt]);

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
        motpartNavnForAltinn={motpartNavnForAltinn}
        godkjenninger={oppfolgingsplan.godkjenninger}
      />

      <TilLandingssideKnapp />
    </SpacedDiv>
  );
};
