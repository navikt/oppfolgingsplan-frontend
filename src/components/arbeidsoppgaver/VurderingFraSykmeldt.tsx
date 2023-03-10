import { CustomAlertWithoutIcon } from "./CustomAlertWithoutIcon";
import { useAudience } from "../../hooks/routeHooks";
import styled from "styled-components";
import { texts } from "../seplanen/texts";

const Space = styled.div`
  margin-bottom: 1rem;
`;

export const VurderingFraSykmeldt = () => {
  const { isAudienceSykmeldt } = useAudience();

  return (
    <Space>
      <CustomAlertWithoutIcon>
        {isAudienceSykmeldt &&
          texts.arbeidsoppgaveList.vurdering.giArbeidsgiverVurdering}
        {!isAudienceSykmeldt &&
          texts.arbeidsoppgaveList.vurdering.narSykmeldtHarVurdert}
      </CustomAlertWithoutIcon>
    </Space>
  );
};
