import React from "react";
import { OppfolgingsplanDTO } from "../../../../schema/oppfolgingsplanSchema";
import { statusPageToDisplayAG } from "../../../../utils/statusPageUtils";
import { BaseTeaser } from "../BaseTeaser";

interface OppfolgingsdialogTeaserProps {
  oppfolgingsplan: OppfolgingsplanDTO;
  rootUrlPlaner?: string;
}

const OppfolgingsdialogTeaserAG = ({
  oppfolgingsplan,
}: OppfolgingsdialogTeaserProps) => {
  const linkToPage = statusPageToDisplayAG(oppfolgingsplan);

  return (
    <BaseTeaser oppfolgingsplan={oppfolgingsplan} linkToPage={linkToPage} />
  );
};

export default OppfolgingsdialogTeaserAG;
