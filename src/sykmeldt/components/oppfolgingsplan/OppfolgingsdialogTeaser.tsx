import React from "react";
import styled from "styled-components";
import {
  inneholderGodkjenninger,
  inneholderGodkjenningerAvArbeidstaker,
} from "@/common/utils/oppfolgingplanUtils";
import { hentPlanStatus } from "@/common/utils/teaserUtils";
import { useOppfolgingsplanUrl } from "@/common/hooks/routeHooks";
import { Oppfolgingsplan } from "../../../schema/oppfolgingsplanSchema";
import { OppfolgingsplanCard } from "@/common/components/oversikt/OppfolgingsplanCard";

const texts = {
  tilGodkjenning: "Til godkjenning",
};

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

const OppfolgingsdialogTeaser = ({
  oppfolgingsplan,
}: OppfolgingsdialogTeaserProps) => {
  const planStatus = hentPlanStatus(oppfolgingsplan);

  const virksomhetsnavn =
    oppfolgingsplan.virksomhet?.navn || "Mangler navn på virksomhet";

  const newOppfolgingsplanUrl = useOppfolgingsplanUrl(
    oppfolgingsplan.id,
    "arbeidsoppgaver"
  );
  const approveOppfolgingsplanUrl = useOppfolgingsplanUrl(
    oppfolgingsplan.id,
    "status"
  );

  const pendingApproval =
    inneholderGodkjenninger(oppfolgingsplan) &&
    !inneholderGodkjenningerAvArbeidstaker(oppfolgingsplan);

  return (
    <OppfolgingsplanCard
      href={pendingApproval ? approveOppfolgingsplanUrl : newOppfolgingsplanUrl}
      title={virksomhetsnavn}
      subtitle={pendingApproval ? texts.tilGodkjenning : ""}
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
