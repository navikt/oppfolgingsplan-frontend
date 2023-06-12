import React from "react";
import { getPublicAsset } from "../../../utils/getAssetPath";
import { BodyLong, Heading, Link } from "@navikt/ds-react";
import { SpacedDiv } from "../wrappers/SpacedDiv";

const texts = {
  title: "Om oppfølgingsplanen",
  linkHeader: "Har du noen spørsmål?",
  linkText: "Les gjerne mer om oppfølgingsplanen her",
  link: "https://www.nav.no/no/bedrift/oppfolging/sykmeldt-arbeidstaker/relatert-informasjon/slik-folger-du-opp-sykmeldte/oppfolgingsplan_kap",
  browserNotSupported: "Nettleseren din støtter ikke denne videoavspillingen.",
  navigateToMovie: "Gå direkte til filmen!",
};

const VideoPanel = () => {
  return (
    <SpacedDiv>
      <Heading spacing={true} size={"medium"} level={"2"}>
        {texts.title}
      </Heading>
      <video
        width="100%"
        height="auto"
        controls
        crossOrigin="anonymous"
        poster={getPublicAsset("/video/poster.jpg")}
      >
        <source src={getPublicAsset("/video/film.mp4")} type="video/mp4" />
        <track
          label="Norsk bokmål"
          kind="captions"
          srcLang="nb"
          src={getPublicAsset("/video/subtitle.vtt")}
          default
        />
        <p>
          {texts.browserNotSupported}{" "}
          <a href={getPublicAsset("/video/film.mp4")}>
            {texts.navigateToMovie}
          </a>
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
