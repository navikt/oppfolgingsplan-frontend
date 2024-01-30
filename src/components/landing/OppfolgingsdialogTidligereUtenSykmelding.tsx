import React from "react";
import { hentStatusUtenAktivSykmelding } from "../../utils/teaserUtils";
import { OppfolgingsplanCard } from "../seplanen/OppfolgingsplanCard";
import { useOppfolgingsplanUrl } from "../../hooks/routeHooks";
import { Detail } from "@navikt/ds-react";
import { OppfolgingsplanDTO } from "../../schema/oppfolgingsplanSchema";

interface Props {
  oppfolgingsplanUtenAktivSykmelding: OppfolgingsplanDTO;
}

const OppfolgingsdialogTidligereUtenSykmelding = ({
  oppfolgingsplanUtenAktivSykmelding,
}: Props) => {
  const planStatus = hentStatusUtenAktivSykmelding(
    oppfolgingsplanUtenAktivSykmelding,
  );

  const virksomhetsnavn =
    oppfolgingsplanUtenAktivSykmelding.virksomhet?.navn ||
    "Mangler navn på virksomhet";

  const statusUrl = useOppfolgingsplanUrl(
    oppfolgingsplanUtenAktivSykmelding.id,
    "status",
  );

  return (
    <OppfolgingsplanCard
      href={statusUrl}
      title={virksomhetsnavn}
      image={planStatus.img}
    >
      <Detail>{planStatus.tekst}</Detail>
    </OppfolgingsplanCard>
  );
};

export default OppfolgingsdialogTidligereUtenSykmelding;
