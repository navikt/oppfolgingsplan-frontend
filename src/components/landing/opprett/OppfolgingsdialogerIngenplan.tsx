import React from "react";
import { erOppfolgingsplanOpprettbarDirekte } from "utils/oppfolgingplanUtils";
import OppfolgingsdialogTomImage from "../../blocks/images/oppfolgingsdialog-tom.svg";
import { Button } from "@navikt/ds-react";
import { ArbeidsgivereForGyldigeSykmeldinger } from "utils/sykmeldingUtils";
import { useOpprettOppfolgingsplanSM } from "api/queries/sykmeldt/oppfolgingsplanerQueriesSM";
import { useSykmeldtFnr } from "api/queries/sykmeldt/sykmeldingerQueriesSM";
import { OppfolgingsplanCard } from "components/seplanen/OppfolgingsplanCard";
import { Oppfolgingsplan } from "../../../types/oppfolgingsplan";

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
            opprettOppfolgingsplan.mutate({
              sykmeldtFnr: sykmeldtFnr!,
              virksomhetsnummer: arbeidsgivere[0].virksomhetsnummer,
            });
          } else {
            setVisOpprettingModal(true);
          }
        }}
      >
        Lag en ny plan
      </Button>
    </OppfolgingsplanCard>
  );
};

export default OppfolgingsdialogerIngenplan;
