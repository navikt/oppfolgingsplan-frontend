import { ReactNode } from "react";
import styled from "styled-components";

interface Props {
  children: ReactNode;
}

const StyledWrapper = styled.div`
  margin: 3rem 0;
`;

export const PanelWrapper = ({ children }: Props) => {
  return <StyledWrapper>{children}</StyledWrapper>;
};
