import { ReactNode } from "react";
import Link from "next/link";
import { LinkPanel, Panel } from "@navikt/ds-react";
import styled from "styled-components";

interface Props {
  href?: string;
  children: ReactNode;
}

const FlexPanel = styled(Panel)`
  display: flex;
`;

export const OppfolgingsplanPanel = ({ children, href }: Props) => {
  if (href) {
    return (
      <Link href={href} passHref={true}>
        <LinkPanel border>{children}</LinkPanel>
      </Link>
    );
  }

  return <FlexPanel border>{children}</FlexPanel>;
};
