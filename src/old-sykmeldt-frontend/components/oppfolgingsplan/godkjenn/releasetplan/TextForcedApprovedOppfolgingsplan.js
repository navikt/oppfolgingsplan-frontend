import React from "react";
import PropTypes from "prop-types";
import BildeTekstLinje from "../../../app/BildeTekstLinje";
import { ReportProblemCircleImage } from "@/common/images/imageComponents";

const TextForcedApprovedOppfolgingsplan = ({ text }) => {
  return (
    <BildeTekstLinje imgUrl={ReportProblemCircleImage} imgAlt="" tekst={text} />
  );
};

TextForcedApprovedOppfolgingsplan.propTypes = {
  text: PropTypes.string,
};

export default TextForcedApprovedOppfolgingsplan;
