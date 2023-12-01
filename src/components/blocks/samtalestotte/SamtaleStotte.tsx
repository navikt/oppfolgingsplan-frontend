import { BodyLong, Heading, Link } from "@navikt/ds-react";
import React from "react";
import { SpacedDiv } from "../wrappers/SpacedDiv";

export const SamtaleStotte = () => {
  return (
    <SpacedDiv>
      <Heading spacing={true} size={"medium"} level={"2"}>
        Hvordan skape en god dialog
      </Heading>

      <BodyLong>
        Samtaler rundt sykefravær kan være vanskelige. Vi har laget et verktøy
        for arbeidsgivere for å gjøre det lettere å forberede seg til samtaler
        med medarbeidere!
      </BodyLong>

      <Link
        href={"https://www.nav.no/arbeidsgiver/samtalestotte-arbeidsgiver"}
        target="_blank"
      >
        Gå til samtalestøtten
      </Link>
    </SpacedDiv>
  );
};
