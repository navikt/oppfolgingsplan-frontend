import React from "react";
import OppfolgingsdialogTeaser from "./OppfolgingsdialogTeaser";
import OppfolgingsdialogTidligereTeaser from "./OppfolgingsdialogTidligereTeaser";
import { Heading } from "@navikt/ds-react";
import { Oppfolgingsplan } from "../../../types/oppfolgingsplan";

interface Props {
  tittel: string;
  oppfolgingsplaner: Oppfolgingsplan[];
  className?: string;
  harTidligerOppfolgingsdialoger?: boolean;
}

const OppfolgingsdialogTeasere = ({
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
            return <OppfolgingsdialogTeaser oppfolgingsplan={plan} key={idx} />;
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

export default OppfolgingsdialogTeasere;
