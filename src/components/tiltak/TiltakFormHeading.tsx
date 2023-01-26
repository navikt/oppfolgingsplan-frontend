import { BodyLong, Heading } from "@navikt/ds-react";
import { ReactElement } from "react";
import { useAudience } from "../../hooks/routeHooks";

const arbeidstakerTexts = {
  title: "Hva kan gjøre det lettere å jobbe?",
  body: "Når dere har fått oversikt over arbeidsoppgavene dine, kan dere se på hva slags tilrettelegging det er mulig å tilby.",
};

const arbeidsgiverTexts = {
  title: "Hva kan dere gjøre som arbeidsgiver?",
  body: "",
};

export const TiltakFormHeading = (): ReactElement => {
  const { isAudienceSykmeldt } = useAudience();
  const title = isAudienceSykmeldt
    ? arbeidstakerTexts.title
    : arbeidsgiverTexts.title;
  const body = isAudienceSykmeldt
    ? arbeidstakerTexts.body
    : arbeidsgiverTexts.body;
  return (
    <>
      <Heading spacing size="medium" level="3">
        {title}
      </Heading>
      <BodyLong spacing size="medium">
        {body}
      </BodyLong>
    </>
  );
};
