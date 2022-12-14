import React, { ReactElement, ReactNode } from "react";
import { useDineSykmeldte } from "../../../api/queries/arbeidsgiver/dinesykmeldteQueriesAG";
import { SpacedDiv } from "./SpacedDiv";
import Feilmelding from "../error/Feilmelding";
import AppSpinner from "../spinner/AppSpinner";
import { PageHeading } from "../heading/PageHeading";

interface SideProps {
  title: string;
  heading: string;
  children: ReactNode;
}

const ArbeidsgiverSide = ({
  title,
  heading,
  children,
}: SideProps): ReactElement => {
  const sykmeldt = useDineSykmeldte();

  const PageContent = () => {
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

  return (
    <>
      <PageHeading title={title} heading={heading} />
      <PageContent />
    </>
  );
};

export default ArbeidsgiverSide;
