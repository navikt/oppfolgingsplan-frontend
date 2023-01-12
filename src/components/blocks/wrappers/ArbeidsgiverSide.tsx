import React, { ReactElement, ReactNode } from "react";
import { useDineSykmeldte } from "../../../api/queries/arbeidsgiver/dinesykmeldteQueriesAG";
import Feilmelding from "../error/Feilmelding";
import AppSpinner from "../spinner/AppSpinner";
import { PageHeading } from "../heading/PageHeading";
import { useOppfolgingsplanerAG } from "../../../api/queries/arbeidsgiver/oppfolgingsplanerQueriesAG";
import { useTilgangAG } from "../../../api/queries/arbeidsgiver/tilgangQueriesAG";
import { AdresseSperreInfoBoks } from "../infoboks/AdresseSperreInfoBoks";
import { ArbeidsgiverSideMenu } from "../sidemenu/ArbeidsgiverSideMenu";
import { PageContainer } from "@navikt/dinesykmeldte-sidemeny";
import { Sykmeldt } from "../../../schema/sykmeldtSchema";
import { addSpaceAfterEverySixthCharacter } from "../../../utils/stringUtils";
import { People } from "@navikt/ds-icons";

const getSykmeldtHeader = (sykmeldt?: Sykmeldt) => {
  if (sykmeldt?.navn && sykmeldt.fnr) {
    return {
      title: sykmeldt.navn,
      subtitle: `Fødselsnr: ${addSpaceAfterEverySixthCharacter(sykmeldt?.fnr)}`,
      Icon: People,
    };
  }

  return false;
};

const getSykmeldtNameAndFnr = (sykmeldt?: Sykmeldt) => {
  if (!sykmeldt) return null;

  return {
    navn: sykmeldt.navn || "",
    fnr: sykmeldt.fnr,
  };
};

interface SideProps {
  title: string;
  heading: string;
  children: ReactNode;
}

const PageContent = ({ title, heading, children }: SideProps) => {
  const sykmeldt = useDineSykmeldte();
  const oppfolgingsplaner = useOppfolgingsplanerAG();
  const tilgang = useTilgangAG();

  if (oppfolgingsplaner.isError || sykmeldt.isError || tilgang.isError) {
    return (
      <Feilmelding
        title="Beklager, vi fikk en teknisk feil"
        description="Det skjedde en feil ved henting av dine oppfølgingsplaner. Vennligst prøv igjen senere."
      />
    );
  } else if (
    !sykmeldt.isError &&
    (tilgang.fetchStatus === "fetching" ||
      oppfolgingsplaner.isLoading ||
      sykmeldt.isLoading)
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

const ArbeidsgiverSide = ({
  title,
  heading,
  children,
}: SideProps): ReactElement => {
  const sykmeldt = useDineSykmeldte();

  return (
    <PageContainer
      sykmeldt={getSykmeldtNameAndFnr(sykmeldt.data)}
      header={getSykmeldtHeader(sykmeldt.data)}
      navigation={<ArbeidsgiverSideMenu sykmeldt={sykmeldt.data} />}
    >
      <PageContent title={title} heading={heading}>
        {children}
      </PageContent>
    </PageContainer>
  );
};

export default ArbeidsgiverSide;
