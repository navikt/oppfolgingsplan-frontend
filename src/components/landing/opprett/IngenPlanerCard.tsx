import { Button } from "@navikt/ds-react";
import { OppfolgingsplanCard } from "components/seplanen/OppfolgingsplanCard";
import React from "react";
import OppfolgingsdialogTomImage from "../../blocks/images/oppfolgingsdialog-tom.svg";

export interface Props {
  title: string;
  description: string;
  isLoading: boolean;

  onClick(): void;
}

const IngenPlanerCard = ({ title, description, onClick, isLoading }: Props) => {
  return (
    <OppfolgingsplanCard
      legend="Aktiv oppfølgingsplan"
      title={title}
      description={description}
      image={OppfolgingsdialogTomImage}
    >
      <Button variant={"primary"} loading={isLoading} onClick={onClick}>
        Lag en ny plan
      </Button>
    </OppfolgingsplanCard>
  );
};

export default IngenPlanerCard;
