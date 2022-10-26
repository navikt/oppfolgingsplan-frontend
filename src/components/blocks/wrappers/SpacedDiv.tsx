import styled from "styled-components";

interface Props {
  marginTop?: string;
  marginBottom?: string;
}

export const SpacedDiv = styled.div<Props>`
  margin-top: ${(p) => p.marginTop || 0};
  margin-bottom: ${(p) => p.marginBottom || "2rem"};
`;
