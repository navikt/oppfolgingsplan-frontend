import React from "react";
import OppfolgingsdialogTeaser from "./OppfolgingsdialogTeaser";
import OppfolgingsdialogTidligereTeaser from "./OppfolgingsdialogTidligereTeaser";
import { OppfolgingsplanDTO } from "@/server/service/schema/oppfolgingsplanSchema";

interface Props {
  oppfolgingsplaner: OppfolgingsplanDTO[];
  className?: string;
  tittel: string;
  id?: string;
  rootUrlPlaner?: string;
  harTidligerOppfolgingsdialoger?: boolean;
}

const OppfolgingsdialogTeasere = ({
  oppfolgingsplaner,
  className,
  tittel = "",
  id,
  rootUrlPlaner,
  harTidligerOppfolgingsdialoger,
}: Props) => {
  return (
    <div className="blokk--l">
      <header className="oppfolgingsdialogTeasere__header">
        <h2>{tittel}</h2>
      </header>
      <div id={id} className={className || "js-content"}>
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
