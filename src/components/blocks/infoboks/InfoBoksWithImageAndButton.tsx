import Image from "next/image";
import { BodyLong, Button, Heading, Panel } from "@navikt/ds-react";
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
  buttonText: string;
  onClose(show: boolean): void;
}

export const InfoBoksWithImageAndButton = ({
  imageSrc,
  heading,
  description,
  buttonText,
  onClose,
}: Props) => {
  return (
    <StyledPanel border={true}>
      <PanelContent>
        <Image src={imageSrc} width={64} height={64} alt={""} />
        <Heading size={"medium"} level={"2"}>
          {heading}
        </Heading>

        {description && <BodyLong>{description}</BodyLong>}
        <Button variant={"secondary"} onClick={() => onClose(false)}>
          {buttonText}
        </Button>
      </PanelContent>
    </StyledPanel>
  );
};
