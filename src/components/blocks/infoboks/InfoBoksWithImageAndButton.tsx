import Image from "next/image";
import {BodyLong, Button, Heading, Panel} from "@navikt/ds-react";
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
  show: boolean;
  setVisInfoboks: any;
}

export const InfoBoksWithImageAndButton = ({
  imageSrc,
  heading,
  description,
  buttonText,
  show,
  setVisInfoboks,
}: Props) => {

  if (!show){
    console.log("1")
    return null
  }
  console.log("2", show)
  return (
        <StyledPanel border={true}>
        <PanelContent>
          <Image src={imageSrc} alt={""} />
          <Heading size={"medium"} level={"2"}>
            {heading}
          </Heading>

          {description && <BodyLong>{description}</BodyLong>}
          <Button variant={"secondary"} onClick={() => this.props.setVisInfoboks(false)}>
            {buttonText}
          </Button>
        </PanelContent>
      </StyledPanel>
  )
};
