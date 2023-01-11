import { ReactNode } from "react";
import Link from "next/link";
import { Panel } from "@navikt/ds-react";

interface Props {
  href?: string;
  children: ReactNode;
}

export const OppfolgingsplanPanel = ({ children, href }: Props) => {
  if (href) {
    return (
      <Link href={href}>
        <Panel border>{children}</Panel>
      </Link>
    );
  }

  return <Panel border>{children}</Panel>;
};
