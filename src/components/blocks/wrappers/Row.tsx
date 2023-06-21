import { ReactNode } from "react";

interface Props {
  className?: string;
  children: ReactNode;
}

export const Row = ({ className, children }: Props) => {
  return (
    <div className={`flex flex-row flex-wrap ${className}`}>{children}</div>
  );
};
