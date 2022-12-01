import React from "react";
import styled from "styled-components";
import {
  inneholderGodkjenninger,
  inneholderGodkjenningerAvArbeidstaker,
} from "utils/oppfolgingplanUtils";
import { hentPlanStatus } from "utils/teaserUtils";
import { useOppfolgingsplanUrl } from "hooks/routeHooks";
import { Oppfolgingsplan } from "../../../schema/oppfolgingsplanSchema";
import { statusPageToDisplay } from "utils/statusPageUtils";
import { OppfolgingsplanCard } from "components/seplanen/OppfolgingsplanCard";
import { Alert } from "@navikt/ds-react";

const texts = {
  tilGodkjenning: "Til godkjenning",
};

interface OppfolgingsdialogTeaserProps {
  oppfolgingsplan: Oppfolgingsplan;
  rootUrlPlaner?: string;
}

const SpacedAlert = styled(Alert)`
  margin-top: 1rem;
`;

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

  const arbeidsoppgaverUrlForPlan = useOppfolgingsplanUrl(
    oppfolgingsplan.id,
    "arbeidsoppgaver"
  );
  const statusUrlForPlan = useOppfolgingsplanUrl(oppfolgingsplan.id, "status");

  const harNarmesteLeder = oppfolgingsplan.arbeidsgiver?.naermesteLeder;

  const getHref = () => {
    if (!harNarmesteLeder) {
      return undefined;
    } else if (
      statusPageToDisplay(oppfolgingsplan) == "INGENPLANTILGODKJENNING"
    ) {
      return arbeidsoppgaverUrlForPlan;
    } else {
      return statusUrlForPlan;
    }
  };

  const getSubtitle = () => {
    if (!harNarmesteLeder) {
      return "Planen kan ikke åpnes fordi det ikke er registrert en nærmeste leder for deg på denne virksomheten";
    } else if (pendingApproval) {
      return texts.tilGodkjenning;
    } else {
      return "";
    }
  };

  const pendingApproval =
    inneholderGodkjenninger(oppfolgingsplan) &&
    !inneholderGodkjenningerAvArbeidstaker(oppfolgingsplan) &&
    !oppfolgingsplan.godkjentPlan;

  return (
    <OppfolgingsplanCard
      href={getHref()}
      title={virksomhetsnavn}
      subtitle={getSubtitle()}
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
