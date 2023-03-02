import { ReactNode } from "react";
import Link from "next/link";
import { LinkPanel, Panel } from "@navikt/ds-react";
import { DataTestId } from "../../../cypress/dataTestId";

interface Props {
  href?: string;
  children: ReactNode;
}

export const OppfolgingsplanPanel = ({ children, href }: Props) => {
  if (href) {
    return (
      <Link
        id="oppfolgingsplanTeaser"
        data-testid={DataTestId.LANDING_OPPFOLGINGSPLAN_TEASER}
        href={href}
      >
        <LinkPanel as="div" border>
          {children}
        </LinkPanel>
      </Link>
    );
  }

  return <Panel border>{children}</Panel>;
};
