import React, { ReactElement, ReactNode } from "react";
import { useTilgangSM } from "../../../api/queries/sykmeldt/tilgangQueriesSM";
import { AdresseSperreInfoBoks } from "../infoboks/AdresseSperreInfoBoks";
import { PageHeading } from "../heading/PageHeading";
import styled from "styled-components";
import AppSpinner from "../spinner/AppSpinner";
import { useOppfolgingsplanerSM } from "../../../api/queries/sykmeldt/oppfolgingsplanerQueriesSM";
import { useSykmeldingerSM } from "../../../api/queries/sykmeldt/sykmeldingerQueriesSM";
import { useNarmesteLedereSM } from "../../../api/queries/sykmeldt/narmesteLedereQueriesSM";

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
      oppfolgingsplaner.isLoading ||
      sykmeldinger.isLoading ||
      tilgang.isLoading ||
      narmesteLedere.isLoading
    ) {
      return <AppSpinner />;
    } else if (tilgang.data && tilgang.data.harTilgang === false) {
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
