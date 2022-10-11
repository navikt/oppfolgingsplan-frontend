import React from "react";
import styled from "styled-components";
import Image from "next/image";

const StyledText = styled.p`
  font-size: 1em;
  font-weight: 100;
  margin: 0;
  margin-left: 1em;
`;

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 1em;
  align-items: flex-start;
`;

const ImageContainer = styled.div`
  width: 1.5em;
  min-width: 1.5em;
`;

interface Props {
  imgAlt: string;
  imgUrl: string;
  tekst: string | React.ReactNode;
}

export const BildeTekstLinje = ({ imgAlt, imgUrl, tekst }: Props) => {
  return (
    <StyledWrapper>
      <ImageContainer>
        <Image alt={imgAlt} src={imgUrl} />
      </ImageContainer>
      <StyledText>{tekst}</StyledText>
    </StyledWrapper>
  );
};
