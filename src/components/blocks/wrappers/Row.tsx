import styled from "styled-components";

interface Props {
  marginTop?: string;
  marginBottom?: string;
  gap?: string;
}

export const Row = styled.div<Props>`
  display: flex;
  flex-flow: row wrap;
  gap: ${(p) => p.gap || "1rem"};
  margin-top: ${(p) => p.marginTop || 0};
  margin-bottom: ${(p) => p.marginBottom || 0};
`;
