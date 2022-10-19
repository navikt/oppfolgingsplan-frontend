import { Heading } from "@navikt/ds-react";

interface Props {
  navn: string;
}

export const ArbeidsoppgaveHeading = ({ navn }: Props) => {
  return (
    <Heading level="4" size="medium" spacing={true}>
      {navn}
    </Heading>
  );
};
