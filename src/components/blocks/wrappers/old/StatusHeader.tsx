import { Heading } from "@navikt/ds-react";
import Image from "next/image";
import styled from "styled-components";
import { ImageContainer } from "../ImageContainer";

const CenteredContainer = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 1rem;
`;

const Strek = styled.hr`
  width: 2rem;
  margin-bottom: 2rem;
`;

interface Props {
  svgUrl: string;
  tittel: string;
}

export const StatusHeader = ({ svgUrl, tittel }: Props) => {
  return (
    <CenteredContainer>
      <ImageContainer width={"5rem"}>
        <Image src={svgUrl} alt={""} layout={"responsive"} />
      </ImageContainer>

      <Heading size={"medium"}>{tittel}</Heading>
      <Strek />
    </CenteredContainer>
  );
};
