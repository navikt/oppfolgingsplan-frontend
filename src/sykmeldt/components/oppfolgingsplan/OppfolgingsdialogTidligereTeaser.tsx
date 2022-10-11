import React from "react";
import { finnOppfolgingsdialogMotpartNavn } from "@/common/utils/oppfolgingsdialogUtils";
import { hentPlanStatus } from "@/common/utils/teaserUtils";
import { LinkPanel } from "@navikt/ds-react";
import { Oppfolgingsplan } from "../../../schema/oppfolgingsplanSchema";
import Image from "next/image";

interface Props {
  oppfolgingsplan: Oppfolgingsplan;
  rootUrlPlaner?: string;
}

const OppfolgingsdialogTidligereTeaser = ({
  oppfolgingsplan,
  rootUrlPlaner,
}: Props) => {
  const planStatus = hentPlanStatus(oppfolgingsplan);

  return (
    <LinkPanel
      href={`${rootUrlPlaner}/oppfolgingsplaner/${oppfolgingsplan.id}`}
      border
    >
      <div className="inngangspanel">
        <span className="oppfolgingsplanInnhold__ikon">
          <Image alt={planStatus.tekst} src={planStatus.img} />
        </span>
        <div className="inngangspanel__innhold">
          <header className="inngangspanel__header">
            <h3
              className="js-title"
              id={`oppfolgingsdialog-header-${oppfolgingsplan.id}`}
            >
              <span className="inngangspanel__tittel">
                {finnOppfolgingsdialogMotpartNavn(oppfolgingsplan)}
              </span>
            </h3>
          </header>
          <p className="mute inngangspanel__tekst">{planStatus.tekst}</p>
        </div>
      </div>
    </LinkPanel>
  );
};

export default OppfolgingsdialogTidligereTeaser;
