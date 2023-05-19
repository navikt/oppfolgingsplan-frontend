import React, { ReactElement, ReactNode } from "react";
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
  width: 50rem;
  max-width: 100%;
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
  const oppfolgingsplaner = useOppfolgingsplanerSM();
  const sykmeldinger = useSykmeldingerSM();
  const narmesteLedere = useNarmesteLedereSM();

  const PageContent = () => {
    if (
      oppfolgingsplaner.isLoading ||
      sykmeldinger.isLoading ||
      narmesteLedere.isFetching
    ) {
      return <AppSpinner />;
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
