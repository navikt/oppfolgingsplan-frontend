import { Heading } from "@navikt/ds-react";
import Image from "next/image";
import styled from "styled-components";

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
  liteikon?: Boolean;
  mediumIcon?: Boolean;
  tittel: string;
}

export const StatusHeader = ({
  svgUrl,
  tittel,
  liteikon,
  mediumIcon,
}: Props) => {
  const iconSize = () => {
    if (liteikon) {
      return 30;
    } else if (mediumIcon) {
      return 60;
    } else {
      return 120;
    }
  };
  return (
    <CenteredContainer>
      <Image
        src={svgUrl}
        alt={""}
        layout={"fixed"}
        height={iconSize()}
        width={iconSize()}
      />
      <Heading size={"medium"}>{tittel}</Heading>
      <Strek />
    </CenteredContainer>
  );
};
