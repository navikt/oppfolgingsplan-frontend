import { ReactNode } from "react";
import Link from "next/link";
import { LinkPanel, Panel } from "@navikt/ds-react";

interface Props {
  href?: string;
  children: ReactNode;
}

export const OppfolgingsplanPanel = ({ children, href }: Props) => {
  if (href) {
    return (
      <Link id="OppfolgingsplanLink" href={href}>
        <LinkPanel as="div" border>
          {children}
        </LinkPanel>
      </Link>
    );
  }

  return <Panel border>{children}</Panel>;
};
