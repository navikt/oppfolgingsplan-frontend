import { BodyLong, GuidePanel, Link } from "@navikt/ds-react";
import styled from "styled-components";

const SpacedGuidePanel = styled(GuidePanel)`
  margin-bottom: 2rem;
`;

export const SamtaleStotte = () => {
  return (
    <SpacedGuidePanel>
      <BodyLong spacing={true}>
        Samtaler rundt sykefravær kan være vanskelige. Vi har laget et verktøy
        for arbeidsgivere for å gjøre det lettere å forberede seg til samtaler
        med medarbeidere!
      </BodyLong>

      <Link
        href={
          "https://arbeidsgiver.nav.no/samtalestotte?referer=oppfolgingsplanarbeidsgiver"
        }
        target="_blank"
      >
        Gå til samtalestøtten
      </Link>
    </SpacedGuidePanel>
  );
};
