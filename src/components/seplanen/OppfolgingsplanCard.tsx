import { BodyLong, Heading } from "@navikt/ds-react";
import Image from "next/image";
import React, { ReactNode } from "react";
import { OppfolgingsplanPanel } from "./OppfolgingsplanPanel";
import { SpacedDiv } from "../blocks/wrappers/SpacedDiv";

interface Props {
  href?: string;
  legend?: string;
  title: string;
  subtitle?: string;
  description?: string;
  image: string;
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
        <div className="flex flex-row items-center gap-8">
          <Image src={image} width={64} height={64} alt={""} />

          <div>
            <Heading spacing={true} size={"small"} level={"3"}>
              {title}
            </Heading>

            {subtitle && (
              <Heading spacing={true} size={"xsmall"} level={"4"}>
                {subtitle}
              </Heading>
            )}

            {description && <BodyLong spacing={true}>{description}</BodyLong>}

            <div>{children}</div>
          </div>
        </div>
      </OppfolgingsplanPanel>
    </SpacedDiv>
  );
};
