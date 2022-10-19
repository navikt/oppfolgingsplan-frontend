import styled from "styled-components";

interface Props {
  marginTop?: string;
  marginBottom?: string;
}

export const Row = styled.div<Props>`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  margin-top: ${(p) => p.marginTop || 0};
  margin-bottom: ${(p) => p.marginBottom || 0};
`;
