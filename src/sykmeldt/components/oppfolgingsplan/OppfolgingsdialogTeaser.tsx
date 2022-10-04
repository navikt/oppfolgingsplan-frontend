import React from 'react';
import {
    finnOppfolgingsdialogMotpartNavn,
    inneholderGodkjenninger,
    inneholderGodkjenningerAvArbeidstaker,
} from '@/common/utils/oppfolgingsdialogUtils';
import {hentPlanStatus} from '@/common/utils/teaserUtils';
import {LinkPanel, Tag} from "@navikt/ds-react";
import Image from "next/image";
import NextLink from "next/link";
import styled from "styled-components";
import {useLandingUrl} from "@/common/hooks/routeHooks";
import {OppfolgingsplanDTO} from "@/server/service/schema/oppfolgingsplanSchema";

const texts = {
    etiketter: {
        tilGodkjenning: 'Til godkjenning',
    },
};

interface TilGodkjenningStatusProps {
    oppfolgingsplan: OppfolgingsplanDTO
}

export const TilGodkjenningStatus = ({oppfolgingsplan}: TilGodkjenningStatusProps) => {
    if (inneholderGodkjenninger(oppfolgingsplan) &&
        !inneholderGodkjenningerAvArbeidstaker(oppfolgingsplan)) {
        return <Tag variant={"warning"} size={"small"}>{texts.etiketter.tilGodkjenning}</Tag>
    }
    return null;
};

interface OppfolgingsdialogTeaserProps {
    oppfolgingsplan: OppfolgingsplanDTO;
    rootUrlPlaner?: string
}

const LinkPanelContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const ImageContainer = styled.div`
  display: flex;
  margin: 0 2em 0 0;
  width: 4.5em;
  height: 4.5em;
`;

const OppfolgingsdialogTeaser = ({oppfolgingsplan}: OppfolgingsdialogTeaserProps) => {
    const planStatus = hentPlanStatus(oppfolgingsplan);
    const landingUrl = useLandingUrl();

    return (
        <NextLink href={`${landingUrl}/${oppfolgingsplan.id}/arbeidsoppgaver`} passHref>
            <LinkPanel border>
                <LinkPanelContent>
                    <ImageContainer>
                        <Image alt="" src={planStatus.img}/>
                    </ImageContainer>
                    <div>
                        <header>
                            <h3 className="js-title" id={`oppfolgingsdialog-header-${oppfolgingsplan.id}`}>
                                <span>{finnOppfolgingsdialogMotpartNavn(oppfolgingsplan)}</span>
                            </h3>
                        </header>
                        {typeof planStatus.tekst === 'object' ? (
                            <p dangerouslySetInnerHTML={planStatus.tekst}/>
                        ) : (
                            <p dangerouslySetInnerHTML={{__html: planStatus.tekst}}/>
                        )}
                        <TilGodkjenningStatus oppfolgingsplan={oppfolgingsplan}/>
                    </div>
                </LinkPanelContent>
            </LinkPanel>
        </NextLink>
    );
};

export default OppfolgingsdialogTeaser;
