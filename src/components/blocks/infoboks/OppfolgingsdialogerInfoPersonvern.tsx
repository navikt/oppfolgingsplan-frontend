import React from "react";
import { Ingress, Link } from "@navikt/ds-react";
import { SpacedDiv } from "../wrappers/SpacedDiv";

interface Props {
  ingress: string;
  oppfolgingsplanInfoLenkUrl: string;
}

const OppfolgingsdialogerInfoPersonvern = ({ ingress, oppfolgingsplanInfoLenkUrl }: Props) => {
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
            href={oppfolgingsplanInfoLenkUrl}
          >
            Hvilke lover som gjelder for oppfølgingsplanen (åpner i en ny fane)
          </Link>
        </li>
        <li>
          <Link
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.nav.no/personvern"
          >
            Hvordan NAV behandler personopplysninger (åpner i en ny fane)
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default OppfolgingsdialogerInfoPersonvern;
