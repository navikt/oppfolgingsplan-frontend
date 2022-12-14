import React from "react";
import { Ingress, Link } from "@navikt/ds-react";
import styled from "styled-components";

const IngressMarginTop = styled(Ingress)`
  margin-top: 1rem;
`;

interface Props {
  ingress: string;
}

const OppfolgingsdialogerInfoPersonvern = ({ ingress }: Props) => {
  return (
    <div>
      <Ingress>{ingress}</Ingress>
      <IngressMarginTop>Les mer om:</IngressMarginTop>
      <ul>
        <li>
          <Link
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.nav.no/no/person/arbeid/sykmeldt-arbeidsavklaringspenger-og-yrkesskade/sykmeldt/hva-er-en-oppfolgingsplan"
          >
            Hvilke lover som gjelder for oppfølgingsplanen
          </Link>
        </li>
        <li>
          <Link
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.nav.no/personvern"
          >
            Hvordan NAV behandler personopplysninger
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default OppfolgingsdialogerInfoPersonvern;
