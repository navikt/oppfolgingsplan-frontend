import { Loader } from "@navikt/ds-react";
import React, { ReactElement } from "react";

const AppSpinner = (): ReactElement => {
  return (
    <div className="my-16 text-center">
      <Loader
        variant="neutral"
        size="2xlarge"
        title="Vent litt mens siden laster"
      />
    </div>
  );
};

export default AppSpinner;
