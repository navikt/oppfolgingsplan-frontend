import React from "react";
import { erOppfolgingsplanOpprettbarDirekte } from "utils/oppfolgingplanUtils";
import { OppfolgingsdialogTomImage } from "components/blocks/images/imageComponents";
import { Button } from "@navikt/ds-react";
import { ArbeidsgivereForGyldigeSykmeldinger } from "utils/sykmeldingUtils";
import { useOpprettOppfolgingsplanSM } from "api/queries/sykmeldt/oppfolgingsplanerQueriesSM";
import { useSykmeldtFnr } from "api/queries/sykmeldt/sykmeldingerQueriesSM";
import { Oppfolgingsplan } from "../../../schema/oppfolgingsplanSchema";
import { OppfolgingsplanCard } from "components/seplanen/OppfolgingsplanCard";

const texts = {
  tittel: "Aktiv oppfølgingsplan",
  inngangspanel: {
    tittel: "Du har ingen aktiv oppfølgingsplan",
    paragraph:
      "Dere kan når som helst lage en ny plan. Da legger dere inn arbeidsoppgavene dine og noen forslag til hva som skal til for at du skal klare dem.",
  },
  knapper: {
    lagNy: "Lag en ny plan",
  },
};

interface OppfolgingsdialogerIngenplanProps {
  arbeidsgivere: ArbeidsgivereForGyldigeSykmeldinger[];
  oppfolgingsplaner: Oppfolgingsplan[];

  setVisOpprettingModal(set: boolean): void;
}

const OppfolgingsdialogerIngenplan = ({
  arbeidsgivere,
  oppfolgingsplaner,
  setVisOpprettingModal,
}: OppfolgingsdialogerIngenplanProps) => {
  const opprettOppfolgingsplan = useOpprettOppfolgingsplanSM();
  const sykmeldtFnr = useSykmeldtFnr();

  return (
    <OppfolgingsplanCard
      legend={texts.tittel}
      title={texts.inngangspanel.tittel}
      description={texts.inngangspanel.paragraph}
      image={OppfolgingsdialogTomImage}
    >
      <Button
        variant={"primary"}
        onClick={() => {
          if (
            erOppfolgingsplanOpprettbarDirekte(arbeidsgivere, oppfolgingsplaner)
          ) {
            opprettOppfolgingsplan({
              sykmeldtFnr: sykmeldtFnr!!,
              virksomhetsnummer: arbeidsgivere[0].virksomhetsnummer,
            });
          } else {
            setVisOpprettingModal(true);
          }
        }}
      >
        {texts.knapper.lagNy}
      </Button>
    </OppfolgingsplanCard>
  );
};

export default OppfolgingsdialogerIngenplan;
