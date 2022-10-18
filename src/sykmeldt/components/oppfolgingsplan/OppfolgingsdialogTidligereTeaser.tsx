import React from "react";
import { hentPlanStatus } from "@/common/utils/teaserUtils";
import { Oppfolgingsplan } from "../../../schema/oppfolgingsplanSchema";
import { useLandingUrl } from "@/common/hooks/routeHooks";
import { OppfolgingsplanCard } from "@/common/components/oversikt/OppfolgingsplanCard";

interface Props {
  oppfolgingsplan: Oppfolgingsplan;
}

const OppfolgingsdialogTidligereTeaser = ({ oppfolgingsplan }: Props) => {
  const planStatus = hentPlanStatus(oppfolgingsplan);
  const landingUrl = useLandingUrl();
  const virksomhetsnavn =
    oppfolgingsplan.virksomhet?.navn || "Mangler navn på virksomhet";

  return (
    <OppfolgingsplanCard
      href={`${landingUrl}/${oppfolgingsplan.id}/arbeidsoppgaver`}
      title={virksomhetsnavn}
      description={planStatus.tekst}
      image={planStatus.img}
    />
  );
};

export default OppfolgingsdialogTidligereTeaser;
