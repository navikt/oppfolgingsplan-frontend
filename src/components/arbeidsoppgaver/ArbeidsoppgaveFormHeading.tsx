import { BodyLong, Heading } from "@navikt/ds-react";
import React, { ReactElement } from "react";

export const ArbeidsoppgaveFormHeadingSM = (): ReactElement => {
  return (
    <>
      <Heading spacing size="medium" level="3">
        Beskriv en arbeidsoppgave
      </Heading>
      <BodyLong spacing size="medium">
        Legg til én arbeidsoppgave per type oppgave du utfører i din stilling,
        slik at dere kan vurdere hver oppgave separat.
      </BodyLong>
    </>
  );
};

export const ArbeidsoppgaveFormHeadingAG = (): ReactElement => {
  return (
    <>
      <Heading spacing size="medium" level="3">
        Beskriv en arbeidsoppgave
      </Heading>
      <BodyLong spacing size="medium">
        Legg til én arbeidsoppgave per type oppgave arbeidstakeren utfører i sin
        stilling, slik at dere kan vurdere hver oppgave separat.
      </BodyLong>
    </>
  );
};
