import React from "react";
import { erOppfolgingsplanOpprettbarDirekte } from "utils/oppfolgingplanUtils";
import OppfolgingsdialogTomImage from "../../blocks/images/oppfolgingsdialog-tom.svg";
import { Button } from "@navikt/ds-react";
import { ArbeidsgivereForGyldigeSykmeldinger } from "utils/sykmeldingUtils";
import { useOpprettOppfolgingsplanSM } from "api/queries/sykmeldt/oppfolgingsplanerQueriesSM";
import { OppfolgingsplanCard } from "components/seplanen/OppfolgingsplanCard";
import { Oppfolgingsplan } from "types/oppfolgingsplan";

interface OppfolgingsdialogerIngenplanProps {
  arbeidsgivere: ArbeidsgivereForGyldigeSykmeldinger[];
  oppfolgingsplaner: Oppfolgingsplan[];

  setVisOpprettModal(vis: boolean): void;
}

const IngenPlanerCardSM = ({
  arbeidsgivere,
  oppfolgingsplaner,
  setVisOpprettModal,
}: OppfolgingsdialogerIngenplanProps) => {
  const opprettOppfolgingsplan = useOpprettOppfolgingsplanSM();

  return (
    <OppfolgingsplanCard
      legend="Aktiv oppfølgingsplan"
      title="Du har ingen aktiv oppfølgingsplan"
      description="Dere kan når som helst lage en ny plan. Da legger dere inn arbeidsoppgavene dine og noen forslag til hva som skal til for at du skal klare dem."
      image={OppfolgingsdialogTomImage}
    >
      <Button
        variant={"primary"}
        loading={opprettOppfolgingsplan.isLoading}
        onClick={() => {
          if (
            erOppfolgingsplanOpprettbarDirekte(arbeidsgivere, oppfolgingsplaner)
          ) {
            opprettOppfolgingsplan.mutate(arbeidsgivere[0].virksomhetsnummer);
          } else {
            setVisOpprettModal(true);
          }
        }}
      >
        Lag en ny plan
      </Button>
    </OppfolgingsplanCard>
  );
};

export default IngenPlanerCardSM;
