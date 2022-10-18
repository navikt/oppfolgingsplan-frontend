import {CustomAlertWithoutIcon} from "@/common/components/arbeidsoppgaver/CustomAlertWithoutIcon";
import {texts} from "@/common/components/oversikt/texts";
import {useAudience} from "@/common/hooks/routeHooks";
import styled from "styled-components";

const Space = styled.div`
  margin-bottom: 1rem;
`;

export const VurderingFraSykmeldt = () => {

    const {isAudienceSykmeldt} = useAudience();

    return (
        <Space>
            <CustomAlertWithoutIcon>
                {isAudienceSykmeldt &&
                    texts.arbeidsoppgaveList.vurdering.giArbeidsgiverVurdering
                }
                {!isAudienceSykmeldt &&
                    texts.arbeidsoppgaveList.vurdering.narSykmeldtHarVurdert
                }
            </CustomAlertWithoutIcon>
        </Space>
    )
}
