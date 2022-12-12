import React, { ReactNode } from "react";
import { SpacedDiv } from "../SpacedDiv";
import Feilmelding from "../../error/Feilmelding";
import { useDineSykmeldte } from "../../../../api/queries/arbeidsgiver/dinesykmeldteQueriesAG";
import AppSpinner from "../../spinner/AppSpinner";

interface Props {
  children: ReactNode;
}

export const ContentWithDataAG = ({ children }: Props) => {
  const sykmeldt = useDineSykmeldte();

  if (sykmeldt.isError) {
    return (
      <SpacedDiv>
        <Feilmelding
          title="Beklager, vi fikk en teknisk feil"
          description="Det skjedde en feil ved henting av dine oppfølgingsplaner. Vennligst prøv igjen senere."
        />
      </SpacedDiv>
    );
  } else if (sykmeldt.isLoading) {
    return <AppSpinner />;
  }
  // else if (tilgang.data && !tilgang.data.harTilgang) {
  //   return <AdresseSperreInfoBoks />;
  // }
  else {
    return <>{children}</>;
  }
};
