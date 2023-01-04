import React, { ReactElement, ReactNode } from "react";
import { useTilgangSM } from "../../../api/queries/sykmeldt/tilgangQueriesSM";
import { useOppfolgingsplanerSM } from "../../../api/queries/sykmeldt/oppfolgingsplanerQueriesSM";
import { useSykmeldingerSM } from "../../../api/queries/sykmeldt/sykmeldingerQueriesSM";
import { useNarmesteLedereSM } from "../../../api/queries/sykmeldt/narmesteLedereQueriesSM";
import { SpacedDiv } from "./SpacedDiv";
import Feilmelding from "../error/Feilmelding";
import AppSpinner from "../spinner/AppSpinner";
import { AdresseSperreInfoBoks } from "../infoboks/AdresseSperreInfoBoks";
import { PageHeading } from "../heading/PageHeading";
import styled from "styled-components";

const ContentWrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const InnerContentWrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 50rem;
  flex-grow: 1;
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 1rem;
`;

interface SideProps {
  title: string;
  heading: string;
  children: ReactNode;
}

const SykmeldtSide = ({
  title,
  heading,
  children,
}: SideProps): ReactElement => {
  const tilgang = useTilgangSM();
  const oppfolgingsplaner = useOppfolgingsplanerSM();
  const sykmeldinger = useSykmeldingerSM();
  const narmesteLedere = useNarmesteLedereSM();

  const PageContent = () => {
    if (
      oppfolgingsplaner.isError ||
      sykmeldinger.isError ||
      tilgang.isError ||
      narmesteLedere.isError
    ) {
      return (
        <SpacedDiv>
          <Feilmelding
            title="Beklager, vi fikk en teknisk feil"
            description="Det skjedde en feil ved henting av dine oppfølgingsplaner. Vennligst prøv igjen senere."
          />
        </SpacedDiv>
      );
    } else if (
      !sykmeldinger.isError &&
      (tilgang.fetchStatus == "fetching" ||
        oppfolgingsplaner.isLoading ||
        sykmeldinger.isLoading ||
        narmesteLedere.fetchStatus == "fetching")
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

  return (
    <ContentWrapperStyled>
      <InnerContentWrapperStyled>
        <PageContent />
      </InnerContentWrapperStyled>
    </ContentWrapperStyled>
  );
};

export default SykmeldtSide;
