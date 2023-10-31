import React from "react";
import {
  useOpprettOppfolgingsplanAG,
  useTidligereOppfolgingsplanerAG,
} from "../../../api/queries/arbeidsgiver/oppfolgingsplanerQueriesAG";
import { OppfolgingsplanCard } from "../../seplanen/OppfolgingsplanCard";
import OppfolgingsdialogTomImage from "../../../components/blocks/images/oppfolgingsdialog-gray.svg";
import { Button } from "@navikt/ds-react";

export interface Props {
  setVisOpprettModal(vis: boolean): void;
}

const IngenPlanerCardAG = ({ setVisOpprettModal }: Props) => {
  const opprettOppfolgingsplan = useOpprettOppfolgingsplanAG();
  const { harTidligereOppfolgingsplaner } = useTidligereOppfolgingsplanerAG();
  return (
    <OppfolgingsplanCard
      legend="Aktiv oppfølgingsplan"
      title={"Det finnes ingen aktiv oppfølgingsplan"}
      description={
        "Dere kan når som helst lage en ny plan. Da legger dere inn arbeidsoppgavene og noen forslag til hva som skal til for å klare dem."
      }
      image={OppfolgingsdialogTomImage}
    >
      <Button
        variant={"primary"}
        loading={opprettOppfolgingsplan.isLoading}
        onClick={() =>
          !harTidligereOppfolgingsplaner
            ? opprettOppfolgingsplan.mutate(false)
            : setVisOpprettModal(true)
        }
      >
        Lag en ny plan
      </Button>
    </OppfolgingsplanCard>
  );
};

export default IngenPlanerCardAG;
