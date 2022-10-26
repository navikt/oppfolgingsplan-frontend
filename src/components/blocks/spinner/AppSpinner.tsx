import { Loader } from "@navikt/ds-react";
import React, { ReactElement } from "react";
import styled from "styled-components";

const SpinnerContainer = styled.div`
  text-align: center;
  margin-top: 4rem;
  margin-bottom: 4rem;
`;

const AppSpinner = (): ReactElement => {
  return (
    <SpinnerContainer>
      <Loader
        variant="neutral"
        size="2xlarge"
        title="Vent litt mens siden laster"
      />
    </SpinnerContainer>
  );
};

export default AppSpinner;
