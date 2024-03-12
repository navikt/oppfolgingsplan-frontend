import React from "react";
import OppfolgingsdialogTeaserAG from "./OppfolgingsdialogTeaserAG";
import { OppfolgingsplanDTO } from "../../../../schema/oppfolgingsplanSchema";
import { Heading } from "@navikt/ds-react";
import OppfolgingsdialogTidligereTeaser from "../OppfolgingsdialogTidligereTeaser";

interface Props {
  tittel: string;
  oppfolgingsplaner: OppfolgingsplanDTO[];
  className?: string;
  harTidligerOppfolgingsdialoger?: boolean;
}

const OppfolgingsdialogTeasereAG = ({
  oppfolgingsplaner,
  tittel = "",
  harTidligerOppfolgingsdialoger,
}: Props) => {
  return (
    <div>
      <Heading spacing={true} size={"medium"} level={"2"}>
        {tittel}
      </Heading>

      <div>
        {!harTidligerOppfolgingsdialoger &&
          oppfolgingsplaner.map((plan, idx) => {
            return (
              <OppfolgingsdialogTeaserAG oppfolgingsplan={plan} key={idx} />
            );
          })}
        {harTidligerOppfolgingsdialoger &&
          oppfolgingsplaner.map((plan, idx) => {
            return (
              <OppfolgingsdialogTidligereTeaser
                oppfolgingsplan={plan}
                key={idx}
              />
            );
          })}
      </div>
    </div>
  );
};

export default OppfolgingsdialogTeasereAG;
