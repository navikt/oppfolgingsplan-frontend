import { BodyLong, Heading } from "@navikt/ds-react";
import { ReactElement } from "react";

interface Props {
  title: string;
  body: string;
}

export const TiltakFormHeading = ({ title, body }: Props): ReactElement => {
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
