import { useAudience, useOppfolgingsplanUrl } from "hooks/routeHooks";
import { hentPlanStatus } from "utils/teaserUtils";
import React from "react";
import { OppfolgingsplanCard } from "components/seplanen/OppfolgingsplanCard";
import { Oppfolgingsplan } from "../../../types/oppfolgingsplan";

interface Props {
  oppfolgingsplan: Oppfolgingsplan;
}

const OppfolgingsdialogTidligereTeaser = ({ oppfolgingsplan }: Props) => {
  const planStatus = hentPlanStatus(oppfolgingsplan);
  const virksomhetsnavn =
    oppfolgingsplan.virksomhet?.navn || "Mangler navn på virksomhet";
  const { isAudienceSykmeldt } = useAudience();

  const oppfolgingsplanUrl = useOppfolgingsplanUrl(
    oppfolgingsplan.id,
    "status"
  );

  return (
    <OppfolgingsplanCard
      href={oppfolgingsplanUrl}
      title={
        isAudienceSykmeldt ? virksomhetsnavn : oppfolgingsplan.arbeidstaker.navn
      }
      description={planStatus.tekst}
      image={planStatus.img}
    />
  );
};

export default OppfolgingsdialogTidligereTeaser;
