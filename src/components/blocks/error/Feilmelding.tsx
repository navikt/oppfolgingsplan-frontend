import React from "react";
import { Alert, BodyLong, Heading } from "@navikt/ds-react";

interface Props {
  title?: string;
  description?: string;
}

const Feilmelding = ({
  title = "Beklager, det oppstod en feil",
  description = "Vennligst prøv igjen litt senere.",
}: Props) => {
  return (
    <Alert variant="error">
      <Heading spacing={true} size={"medium"} level={"2"}>
        {title}
      </Heading>
      <BodyLong>{description}</BodyLong>
    </Alert>
  );
};

export default Feilmelding;
