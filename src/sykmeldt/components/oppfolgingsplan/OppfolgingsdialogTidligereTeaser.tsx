import { OppfolgingsplanCard } from "@/common/components/oversikt/OppfolgingsplanCard";
import { useOppfolgingsplanUrl } from "@/common/hooks/routeHooks";
import { hentPlanStatus } from "@/common/utils/teaserUtils";
import React from "react";
import { Oppfolgingsplan } from "../../../schema/oppfolgingsplanSchema";

interface Props {
  oppfolgingsplan: Oppfolgingsplan;
}

const OppfolgingsdialogTidligereTeaser = ({ oppfolgingsplan }: Props) => {
  const planStatus = hentPlanStatus(oppfolgingsplan);
  const virksomhetsnavn =
    oppfolgingsplan.virksomhet?.navn || "Mangler navn på virksomhet";

  const oppfolgingsplanUrl = useOppfolgingsplanUrl(
    oppfolgingsplan.id,
    "status"
  );

  return (
    <OppfolgingsplanCard
      href={oppfolgingsplanUrl}
      title={virksomhetsnavn}
      description={planStatus.tekst}
      image={planStatus.img}
    />
  );
};

export default OppfolgingsdialogTidligereTeaser;
