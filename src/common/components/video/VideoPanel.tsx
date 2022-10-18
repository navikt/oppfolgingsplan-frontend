import React from "react";
import { getAsset } from "@/common/utils/getAssetPath";
import styled from "styled-components";
import { BodyLong, Heading, Link } from "@navikt/ds-react";
import { SpacedDiv } from "@/common/components/wrappers/SpacedDiv";

const texts = {
  title: "Om oppfølgingsplanen",
  linkHeader: "Har du noen spørsmål?",
  linkText: "Les gjerne mer om oppfølgingsplanen her",
  link: "https://www.nav.no/no/bedrift/oppfolging/sykmeldt-arbeidstaker/relatert-informasjon/slik-folger-du-opp-sykmeldte/oppfolgingsplan_kap",
  browserNotSupported: "Nettleseren din støtter ikke denne videoavspillingen.",
  navigateToMovie: "Gå direkte til filmen!",
};

const HeaderStyled = styled(Heading)`
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const VideoPanel = () => {
  return (
    <SpacedDiv>
      <HeaderStyled level="2">{texts.title}</HeaderStyled>
      <video
        width="100%"
        height="auto"
        controls
        poster={getAsset("/video/poster.jpg")}
      >
        <source src={getAsset("/video/film.mp4")} type="video/mp4" />
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
      </video>
      <BodyLong>
        {texts.linkHeader}{" "}
        <Link rel="noopener noreferrer" target="_blank" href={texts.link}>
          {texts.linkText}
        </Link>
        .
      </BodyLong>
    </SpacedDiv>
  );
};

export default VideoPanel;
