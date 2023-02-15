import React from "react";
import styled from "styled-components";
import { hentPlanStatus } from "utils/teaserUtils";
import { useAudience, useOppfolgingsplanUrl } from "hooks/routeHooks";
import { Oppfolgingsplan } from "../../../types/oppfolgingsplan";
import {
  StatusPageToDisplay,
  statusPageToDisplayAG,
  statusPageToDisplaySM,
} from "utils/statusPageUtils";
import { OppfolgingsplanCard } from "components/seplanen/OppfolgingsplanCard";

interface OppfolgingsdialogTeaserProps {
  oppfolgingsplan: Oppfolgingsplan;
  rootUrlPlaner?: string;
}

const StyledSmallText = styled.p`
  margin: 0;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.004em;
`;

const subtitleText = (oppfolgingsplanStatus: StatusPageToDisplay | null) => {
  switch (oppfolgingsplanStatus) {
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
    "arbeidsoppgaver"
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
      {typeof planStatus.tekst === "object" ? (
        <StyledSmallText dangerouslySetInnerHTML={planStatus.tekst} />
      ) : (
        <StyledSmallText
          dangerouslySetInnerHTML={{ __html: planStatus.tekst }}
        />
      )}
    </OppfolgingsplanCard>
  );
};

export default OppfolgingsdialogTeaser;
