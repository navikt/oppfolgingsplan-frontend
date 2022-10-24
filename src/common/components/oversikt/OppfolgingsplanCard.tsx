import styled from "styled-components";
import { BodyLong, Heading } from "@navikt/ds-react";
import Image from "next/image";
import React, { ReactNode } from "react";
import { OppfolgingsplanPanel } from "@/common/components/oversikt/OppfolgingsplanPanel";
import { SpacedDiv } from "@/common/components/wrappers/SpacedDiv";
import { ImageContainer } from "@/common/components/wrappers/ImageContainer";

const PanelContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 2rem;
`;

interface Props {
  href?: string;
  legend?: string;
  title: string;
  subtitle?: string;
  description?: string;
  image: string;
  spacing?: boolean;
  children?: ReactNode;
}

export const OppfolgingsplanCard = ({
  href,
  legend,
  title,
  subtitle,
  description,
  image,
  children,
}: Props) => {
  return (
    <SpacedDiv>
      {legend && (
        <Heading spacing={true} size={"medium"} level={"2"}>
          {legend}
        </Heading>
      )}

      <OppfolgingsplanPanel href={href}>
        <PanelContent>
          <ImageContainer width={"4rem"}>
            <Image alt={""} src={image} layout={"responsive"} />
          </ImageContainer>

          <div>
            <Heading spacing={true} size={"small"} level={"3"}>
              {title}
            </Heading>

            {subtitle && (
              <Heading spacing={true} size={"xsmall"} level={"4"}>
                {subtitle}
              </Heading>
            )}

            <div>
              {description && <BodyLong spacing={true}>{description}</BodyLong>}
              <div>{children}</div>
            </div>
          </div>
        </PanelContent>
      </OppfolgingsplanPanel>
    </SpacedDiv>
  );
};
