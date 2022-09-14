import React from 'react';
import Video from '../app/Video';
import poster from '../../../public/img/filmer/oppfolgingsplan.jpg';
import styled from 'styled-components';
import {getAsset} from "@/common/utils/getAssetPath";

const texts = {
  title: 'Om oppfølgingsplanen',
  linkHeader: 'Har du noen spørsmål?',
  linkText: 'Les gjerne mer om oppfølgingsplanen her',
  link:
    'https://www.nav.no/no/bedrift/oppfolging/sykmeldt-arbeidstaker/relatert-informasjon/slik-folger-du-opp-sykmeldte/oppfolgingsplan_kap',
};

const FILM_FILES = {
  src: getAsset("/video/film.mp4"),
  captionSrc: `${process.env.REACT_APP_CONTEXT_ROOT}/static/oppfolgingsplan.vtt`,
  poster,
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

const OppfolgingsplanFilm = () => {
  return (
    <div className="panel">
      <h2 className="panel__tittel">{texts.title}</h2>
      <Video film={FILM_FILES} />
      <p>
        <TextLink />
      </p>
    </div>
  );
};

export default OppfolgingsplanFilm;
