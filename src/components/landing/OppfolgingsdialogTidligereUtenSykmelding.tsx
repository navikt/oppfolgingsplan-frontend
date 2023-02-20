import React from "react";
import { hentStatusUtenAktivSykmelding } from "utils/teaserUtils";
import { Oppfolgingsplan } from "../../types/oppfolgingsplan";
import { OppfolgingsplanCard } from "../seplanen/OppfolgingsplanCard";
import { useOppfolgingsplanUrl } from "../../hooks/routeHooks";
import styled from "styled-components";

interface Props {
  oppfolgingsplanUtenAktivSykmelding: Oppfolgingsplan;
}

const StyledSmallText = styled.p`
  margin: 0;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.004em;
`;

const OppfolgingsdialogTidligereUtenSykmelding = ({
  oppfolgingsplanUtenAktivSykmelding,
}: Props) => {
  const planStatus = hentStatusUtenAktivSykmelding(
    oppfolgingsplanUtenAktivSykmelding
  );

  const virksomhetsnavn =
    oppfolgingsplanUtenAktivSykmelding.virksomhet?.navn ||
    "Mangler navn på virksomhet";

  const statusUrl = useOppfolgingsplanUrl(
    oppfolgingsplanUtenAktivSykmelding.id,
    "status"
  );

  return (
    <OppfolgingsplanCard
      href={statusUrl}
      title={virksomhetsnavn}
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

export default OppfolgingsdialogTidligereUtenSykmelding;
