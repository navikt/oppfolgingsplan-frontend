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
      <Link href={href} passHref={true}>
        <LinkPanel border>{children}</LinkPanel>
      </Link>
    );
  }

  return <Panel border>{children}</Panel>;
};
