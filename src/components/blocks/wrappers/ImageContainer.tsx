import styled from "styled-components";

interface ImageContainerProps {
  width?: string;
}

export const ImageContainer = styled.div<ImageContainerProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${(p) => p.width};
`;
