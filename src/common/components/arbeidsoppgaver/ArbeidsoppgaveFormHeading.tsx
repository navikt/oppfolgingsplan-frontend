import { BodyLong, Heading } from "@navikt/ds-react";
import React, { ReactElement } from "react";

export const ArbeidsoppgaveFormHeading = (): ReactElement => {
  return (
      <>
          <Heading spacing size="medium" level="3">
              Beskriv en arbeidsoppgave
          </Heading>
          <BodyLong spacing size="medium">
              Legg til én arbeidsoppgave per type oppgave du utfører i din
              stilling, slik at dere kan vurdere hver oppgave separat.
          </BodyLong>
      </>
  );
};
