import React, { ReactElement, ReactNode } from "react";
import { useDineSykmeldte } from "../../../api/queries/arbeidsgiver/dinesykmeldteQueriesAG";
import { SpacedDiv } from "./SpacedDiv";
import Feilmelding from "../error/Feilmelding";
import AppSpinner from "../spinner/AppSpinner";
import { PageHeading } from "../heading/PageHeading";
import { useOppfolgingsplanerAG } from "../../../api/queries/arbeidsgiver/oppfolgingsplanerQueriesAG";
import { useTilgangAG } from "../../../api/queries/arbeidsgiver/tilgangQueriesAG";
import { AdresseSperreInfoBoks } from "../infoboks/AdresseSperreInfoBoks";

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
  const oppfolgingsplaner = useOppfolgingsplanerAG();
  const tilgang = useTilgangAG();

  const PageContent = () => {
    if (oppfolgingsplaner.isError || sykmeldt.isError || tilgang.isError) {
      return (
        <SpacedDiv>
          <Feilmelding
            title="Beklager, vi fikk en teknisk feil"
            description="Det skjedde en feil ved henting av dine oppfølgingsplaner. Vennligst prøv igjen senere."
          />
        </SpacedDiv>
      );
    } else if (
      oppfolgingsplaner.isLoading ||
      sykmeldt.isLoading ||
      tilgang.isLoading
    ) {
      return <AppSpinner />;
    } else if (tilgang.data && !tilgang.data.harTilgang) {
      return <AdresseSperreInfoBoks />;
    } else {
      return (
        <>
          <PageHeading title={title} heading={heading} />
          {children}
        </>
      );
    }
  };

  return <PageContent />;
};

export default ArbeidsgiverSide;
