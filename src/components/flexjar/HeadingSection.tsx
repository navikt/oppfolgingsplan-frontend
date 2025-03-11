import { BodyShort, Label } from "@navikt/ds-react";
import React, { ReactElement } from "react";

export const HeadingSection = (): ReactElement => {
  return (
    <div className="bg-surface-subtle p-6 flex gap-4 items-center">
      <div>
        <Label as="h3" className="mb-2">
          Hjelp oss med å gjøre denne siden bedre
        </Label>
        <BodyShort>Anonym tilbakemelding på tjenesten</BodyShort>
      </div>
    </div>
  );
};
