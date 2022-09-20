import React from "react";
import {getAsset} from "@/common/utils/getAssetPath";
import styled from "styled-components";
import {Heading} from "@navikt/ds-react";

const texts = {
    title: 'Om oppfølgingsplanen',
    linkHeader: 'Har du noen spørsmål?',
    linkText: 'Les gjerne mer om oppfølgingsplanen her',
    link:
        'https://www.nav.no/no/bedrift/oppfolging/sykmeldt-arbeidstaker/relatert-informasjon/slik-folger-du-opp-sykmeldte/oppfolgingsplan_kap',
    browserNotSupported: "Nettleseren din støtter ikke denne videoavspillingen.",
    navigateToMovie: "Gå direkte til filmen!",
};

const StyledLink = styled.a`
  padding-left: 0.5em;
`;

const TextLink = () => {
    return (
        <React.Fragment>
            {texts.linkHeader}
            <StyledLink className="lenke" target="_blank" rel="noopener noreferrer" href={texts.link}>
                {texts.linkText}
            </StyledLink>
            .
        </React.Fragment>
    );
};

const HeaderStyled = styled(Heading)`
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Container = styled.div`
  margin-top: 2rem;
  margin-bottom: 2rem;
`;


const VideoPanel = () => {
    return (
        <Container>
            <HeaderStyled level="2">{texts.title}</HeaderStyled>
            <video
                width="100%"
                height="auto"
                controls
                poster={getAsset("/video/poster.jpg")}
            >
                <source src={getAsset("/video/film.mp4")} type="video/mp4"/>
                <track
                    label="Norsk bokmål"
                    kind="captions"
                    srcLang="nb"
                    src={getAsset("/video/subtitle.vtt")}
                    default
                />
                <p>
                    {texts.browserNotSupported}{" "}
                    <a href={getAsset("/video/film.mp4")}>{texts.navigateToMovie}</a>
                </p>

                <TextLink />
            </video>
        </Container>
    );
};

export default VideoPanel;
