import React from "react";
import { Ingress, Link } from "@navikt/ds-react";
import { SpacedDiv } from "../wrappers/SpacedDiv";

interface Props {
  ingress: string;
}

const OppfolgingsdialogerInfoPersonvern = ({ ingress }: Props) => {
  return (
    <div className="mb-8">
      <SpacedDiv className="mb-4">
        <Ingress>{ingress}</Ingress>
      </SpacedDiv>
      <Ingress>Les mer om:</Ingress>
      <ul role="list" className="list-disc list-inside">
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
