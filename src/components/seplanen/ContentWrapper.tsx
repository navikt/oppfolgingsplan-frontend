import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const ContentWrapper = ({ children }: Props) => {
  return <div className="my-12">{children}</div>;
};
