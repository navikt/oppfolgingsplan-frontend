import styled from "styled-components";

interface ImageContainerProps {
  width: string;
}

export const ImageContainer = styled.div<ImageContainerProps>`
  display: block;
  width: ${(p) => p.width};
`;
