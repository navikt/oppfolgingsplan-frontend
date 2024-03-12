import React from "react";
import { Heading } from "@navikt/ds-react";
import OppfolgingsdialogTeaserSM from "./OppfolgingsdialogTeaserSM";
import { OppfolgingsplanDTO } from "../../../../schema/oppfolgingsplanSchema";
import OppfolgingsdialogTidligereTeaser from "../OppfolgingsdialogTidligereTeaser";

interface Props {
  tittel: string;
  oppfolgingsplaner: OppfolgingsplanDTO[];
  className?: string;
  harTidligerOppfolgingsdialoger?: boolean;
}

const OppfolgingsdialogTeasereSM = ({
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
              <OppfolgingsdialogTeaserSM oppfolgingsplan={plan} key={idx} />
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

export default OppfolgingsdialogTeasereSM;
