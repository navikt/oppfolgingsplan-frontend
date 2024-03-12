import { Detail } from "@navikt/ds-react";
import React from "react";
import { OppfolgingsplanCard } from "../../seplanen/OppfolgingsplanCard";
import { StatusPageToDisplay } from "../../../utils/statusPageUtils";
import { OppfolgingsplanDTO } from "../../../schema/oppfolgingsplanSchema";
import { hentPlanStatus } from "../../../utils/teaserUtils";
import { STATUS } from "../../../constants/konstanter";
import { useOppfolgingsplanUrl } from "../../../hooks/routeHooks";

interface Props {
  oppfolgingsplan: OppfolgingsplanDTO;
  linkToPage: StatusPageToDisplay | null;
  children?: React.ReactNode;
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

export const BaseTeaser = ({
  oppfolgingsplan,
  linkToPage,
  children,
}: Props) => {
  const arbeidsoppgaverUrl = useOppfolgingsplanUrl(
    oppfolgingsplan.id,
    "arbeidsoppgaver",
  );
  const statusPageUrl = useOppfolgingsplanUrl(oppfolgingsplan.id, "status");
  const planStatus = hentPlanStatus(oppfolgingsplan);
  const getHref = (): string | undefined => {
    if (linkToPage) {
      return linkToPage === "PLANUNDERARBEID"
        ? arbeidsoppgaverUrl
        : statusPageUrl;
    }
  };

  return (
    <OppfolgingsplanCard
      href={getHref()}
      title={oppfolgingsplan.virksomhet.navn || "Mangler navn på virksomhet"}
      subtitle={subtitleText(linkToPage)}
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

      {children}
    </OppfolgingsplanCard>
  );
};
