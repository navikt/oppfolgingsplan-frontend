import React, { ReactElement } from "react";
import { Heading } from "@navikt/ds-react";
import { FaceSmileIcon } from "@navikt/aksel-icons";

export const TakkForTilbakemeldingen = (): ReactElement => {
  return (
    <div aria-live="polite">
      <div className="mt-2 border-4 border-green-100 rounded-medium bg-green-100 p-6">
        <Heading size="small" as="p" className="flex items-center">
          Takk for tilbakemeldingen din!{" "}
          <FaceSmileIcon
            className="ml-2"
            aria-label="smilefjes"
          ></FaceSmileIcon>
        </Heading>
      </div>
    </div>
  );
};
