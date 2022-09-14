import React from 'react';
import PropTypes from 'prop-types';

const Video = ({ film }) => {
  if (!film) {
    return null;
  }
  return (
    <video width="100%" height="auto" controls poster={film.poster}>
      <source src={film.src} type="video/mp4" />
      <track label="Norsk bokmål" kind="captions" srcLang="nb" src={film.captionSrc} default />
      <p>
        Nettleseren din støtter ikke denne videoavspillingen. <a href={film.src}>Gå direkte til videoklippet</a>
      </p>
    </video>
  );
};

Video.propTypes = {
  film: PropTypes.shape({
    src: PropTypes.string.isRequired,
    captionSrc: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
  }),
};

export default Video;
