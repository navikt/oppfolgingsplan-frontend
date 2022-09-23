import { ReactNode } from "react";
import styled from "styled-components";

const Circle = styled.span`
  height: 3rem;
  width: 3rem;
  background-color: #bcf3ff;
  border-radius: 50%;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
`;

interface Props {
  icon: ReactNode;
}

const CircledIcon = ({ icon }: Props) => {
  return <Circle>{icon}</Circle>;
};

export default CircledIcon;
