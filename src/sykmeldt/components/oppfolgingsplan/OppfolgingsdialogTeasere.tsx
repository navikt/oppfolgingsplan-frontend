import React from "react";
import OppfolgingsdialogTeaser from "./OppfolgingsdialogTeaser";
import OppfolgingsdialogTidligereTeaser from "./OppfolgingsdialogTidligereTeaser";
import { Oppfolgingsplan } from "../../../schema/oppfolgingsplanSchema";

interface Props {
  tittel: string;
  oppfolgingsplaner: Oppfolgingsplan[];
  className?: string;
  id?: string;
  rootUrlPlaner?: string;
  harTidligerOppfolgingsdialoger?: boolean;
}

const OppfolgingsdialogTeasere = ({
  oppfolgingsplaner,
  tittel = "",
  id,
  rootUrlPlaner,
  harTidligerOppfolgingsdialoger,
}: Props) => {
  return (
    <div>
      <header>
        <h2>{tittel}</h2>
      </header>
      <div id={id}>
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
                rootUrlPlaner={rootUrlPlaner}
              />
            );
          })}
      </div>
    </div>
  );
};

export default OppfolgingsdialogTeasere;
