import { ReactNode } from "react";
import styled from "styled-components";
import Image from "next/image";
import { BodyShort } from "@navikt/ds-react";

interface Props {
  title: string;
  children: ReactNode;
  img?: string;
}

const CardContainer = styled.div`
  margin: 2rem 0;
  border: 1px solid #707070;
  border-radius: 4px;
  padding: 1rem;
`;

const ImageContainer = styled.div`
  width: 1.5em;
  min-width: 1.5em;
  margin-right: 0.5rem;
`;

const TextAndImageContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
`;

export const Card = ({ title, children, img }: Props) => {
  return (
    <CardContainer>
      <TextAndImageContainer>
        <ImageContainer>{img && <Image alt="ss" src={img} />}</ImageContainer>
        <BodyShort size="small" spacing={true}>
          {title}
        </BodyShort>
      </TextAndImageContainer>
      {children}
    </CardContainer>
  );
};
