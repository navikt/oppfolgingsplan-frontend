import React from "react";
import PropTypes from "prop-types";

const texts = {
  title: "Kommenter",
};

const ButtonComment = ({ count, click }) => {
  return (
    <button className="knapp--kommenter" onClick={click}>
      {`${texts.title} ${count ? `(${count})` : ""}`}
    </button>
  );
};

ButtonComment.propTypes = {
  count: PropTypes.number,
  click: PropTypes.func,
};

export default ButtonComment;
