import { ReactNode } from "react";
import { LinkPanel, Panel } from "@navikt/ds-react";

interface Props {
  href?: string;
  children: ReactNode;
}

export const OppfolgingsplanPanel = ({ children, href }: Props) => {
  if (href) {
    return (
      <LinkPanel href={href} border>
        {children}
      </LinkPanel>
    );
  }

  return <Panel border>{children}</Panel>;
};
