import Image from "next/image";
import { BodyLong, Heading, Panel } from "@navikt/ds-react";
import React from "react";
import styled from "styled-components";

const StyledPanel = styled(Panel)`
  margin-bottom: 2rem;
`;

const PanelContent = styled.div`
  display: flex;
  padding: 1rem;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  text-align: center;
`;

interface Props {
  imageSrc: string;
  heading: string;
  description?: string;
}

export const InfoBoksWithImage = ({
  imageSrc,
  heading,
  description,
}: Props) => {
  return (
    <StyledPanel border={true}>
      <PanelContent>
        <Image src={imageSrc} alt={""} />
        <Heading size={"medium"} level={"2"}>
          {heading}
        </Heading>

        {description && <BodyLong>{description}</BodyLong>}
      </PanelContent>
    </StyledPanel>
  );
};
