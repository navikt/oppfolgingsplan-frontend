import React from "react";
import { OppfolgingsplanDTO } from "../../../../schema/oppfolgingsplanSchema";
import {
  harNaermesteLeder,
  statusPageToDisplaySM,
} from "../../../../utils/statusPageUtils";
import { ErrorMessage } from "@navikt/ds-react";
import { BaseTeaser } from "../BaseTeaser";

interface OppfolgingsdialogTeaserProps {
  oppfolgingsplan: OppfolgingsplanDTO;
  rootUrlPlaner?: string;
}
const OppfolgingsdialogTeaserSM = ({
  oppfolgingsplan,
}: OppfolgingsdialogTeaserProps) => {
  const harNarmesteLederForOppfolgingsplan = harNaermesteLeder(oppfolgingsplan);

  const linkToPage = statusPageToDisplaySM(oppfolgingsplan);

  return (
    <BaseTeaser
      oppfolgingsplan={oppfolgingsplan}
      linkToPage={harNarmesteLederForOppfolgingsplan ? linkToPage : null}
    >
      {!harNarmesteLederForOppfolgingsplan && (
        <ErrorMessage className="mt-4">
          Vi finner ikke din nærmeste leder i Altinn. Ta kontakt med lederen din
          og be om at riktig leder blir registrert i Altinn. Du kan ikke
          redigere planen før lederen din er registrert.
        </ErrorMessage>
      )}
    </BaseTeaser>
  );
};

export default OppfolgingsdialogTeaserSM;
