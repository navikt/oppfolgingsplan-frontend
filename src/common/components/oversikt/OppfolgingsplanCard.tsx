import styled from "styled-components";
import { BodyLong, Heading } from "@navikt/ds-react";
import Image from "next/image";
import React, { ReactNode } from "react";
import { OppfolgingsplanPanel } from "@/common/components/oversikt/OppfolgingsplanPanel";
import { SpacedDiv } from "@/common/components/wrappers/SpacedDiv";

const PanelContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 2rem;
`;

const ImageContainer = styled.div`
  width: 5rem;
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
          <ImageContainer>
            <Image
              alt={""}
              src={image}
              layout={"fixed"}
              height={80}
              width={80}
            />
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
