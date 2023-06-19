import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
}
export const SpacedDiv = ({ children, className }: Props) => {
  const contatinatedClassName = `mb-8 ${className}`;

  return <div className={contatinatedClassName}>{children}</div>;
};
