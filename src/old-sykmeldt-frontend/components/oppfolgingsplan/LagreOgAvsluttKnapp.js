import React from "react";
import { Link } from "react-router";
import styled from "styled-components";
import getContextRoot from "@/common/utils/getContextRoot";

const tekster = {
  knapp: "Fortsett senere",
};

const LinkStyled = styled(Link)`
  text-transform: initial !important;
`;

const LagreOgAvsluttKnapp = () => {
  return (
    <div className="knapperad">
      <LinkStyled
        className="knapperad__element knapp knapp--flat"
        to={`${getContextRoot()}/oppfolgingsplaner`}
      >
        {tekster.knapp}
      </LinkStyled>
    </div>
  );
};

export default LagreOgAvsluttKnapp;
