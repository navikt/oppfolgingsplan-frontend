import React from 'react';
import PropTypes from 'prop-types';

const texts = {
  buttonDelete: 'Slett',
};

const ButtonDeleteIcon = ({ click, text = texts.buttonDelete }) => {
  return (
    <button className="knapp--slett" type="button" onClick={click}>
      {text}
    </button>
  );
};
ButtonDeleteIcon.propTypes = {
  click: PropTypes.func,
  text: PropTypes.string,
};
export default ButtonDeleteIcon;
