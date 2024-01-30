import React from "react";
import { hentPlanStatus } from "../../../utils/teaserUtils";
import { useAudience, useOppfolgingsplanUrl } from "../../../hooks/routeHooks";
import { Oppfolgingsplan } from "../../../types/oppfolgingsplan";
import {
  StatusPageToDisplay,
  statusPageToDisplayAG,
  statusPageToDisplaySM,
} from "../../../utils/statusPageUtils";
import { OppfolgingsplanCard } from "../../seplanen/OppfolgingsplanCard";
import { STATUS } from "../../../constants/konstanter";
import { Detail } from "@navikt/ds-react";

interface OppfolgingsdialogTeaserProps {
  oppfolgingsplan: Oppfolgingsplan;
  rootUrlPlaner?: string;
}

const subtitleText = (godkjenningsStatus: StatusPageToDisplay | null) => {
  switch (godkjenningsStatus) {
    case "SENDTPLANTILGODKJENNING": {
      return "Sendt til godkjenning";
    }
    case "MOTTATTFLEREGODKJENNINGER":
    case "GODKJENNPLANMOTTATT": {
      return "Venter på din godkjenning";
    }
  }
};

const OppfolgingsdialogTeaser = ({
  oppfolgingsplan,
}: OppfolgingsdialogTeaserProps) => {
  const planStatus = hentPlanStatus(oppfolgingsplan);
  const { isAudienceSykmeldt } = useAudience();

  const virksomhetsnavn =
    oppfolgingsplan.virksomhet?.navn || "Mangler navn på virksomhet";

  const newOppfolgingsplanUrl = useOppfolgingsplanUrl(
    oppfolgingsplan.id,
    "arbeidsoppgaver",
  );
  const statusUrl = useOppfolgingsplanUrl(oppfolgingsplan.id, "status");

  const godkjenningsStatus = isAudienceSykmeldt
    ? statusPageToDisplaySM(oppfolgingsplan)
    : statusPageToDisplayAG(oppfolgingsplan);

  return (
    <OppfolgingsplanCard
      href={
        godkjenningsStatus === "INGENPLANTILGODKJENNING"
          ? newOppfolgingsplanUrl
          : statusUrl
      }
      title={virksomhetsnavn}
      subtitle={subtitleText(godkjenningsStatus)}
      image={planStatus.img}
    >
      {oppfolgingsplan.status === STATUS.UNDER_ARBEID && (
        <>
          <Detail>Sist endret: {planStatus.tekstUnderArbeid.sistEndret}</Detail>
          <Detail>Endret av: {planStatus.tekstUnderArbeid.endretAv}</Detail>
        </>
      )}
      {oppfolgingsplan.status !== STATUS.UNDER_ARBEID && (
        <Detail>{planStatus.tekst}</Detail>
      )}
    </OppfolgingsplanCard>
  );
};

export default OppfolgingsdialogTeaser;
