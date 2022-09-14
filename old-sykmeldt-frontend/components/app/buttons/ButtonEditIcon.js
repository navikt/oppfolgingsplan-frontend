import React from 'react';
import PropTypes from 'prop-types';

const texts = {
  buttonEdit: 'Endre',
};

const ButtonEditIcon = ({ click, text = texts.buttonEdit }) => {
  return (
    <button className="knapp--endre" onClick={click}>
      {text}
    </button>
  );
};
ButtonEditIcon.propTypes = {
  click: PropTypes.func,
  text: PropTypes.string,
};
export default ButtonEditIcon;
