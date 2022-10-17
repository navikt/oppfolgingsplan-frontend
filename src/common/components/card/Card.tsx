import {SpacedPanel} from "@/common/components/wrappers/SpacedPanel";
import {ReactNode} from "react";

interface Props {
  children: ReactNode;
}

export const Card = ({ children }: Props) => {
  return (
    <SpacedPanel border={true}>
      {children}
    </SpacedPanel>
  );
};
