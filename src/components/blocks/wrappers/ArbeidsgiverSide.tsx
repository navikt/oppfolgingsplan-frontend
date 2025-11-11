import React, { ReactElement, ReactNode } from "react";
import { useDineSykmeldte } from "../../../api/queries/arbeidsgiver/dinesykmeldteQueriesAG";
import { PageHeading } from "../heading/PageHeading";
import { ArbeidsgiverSideMenu } from "../sidemenu/ArbeidsgiverSideMenu";
import { PageContainer } from "@navikt/dinesykmeldte-sidemeny";
import { Sykmeldt } from "../../../schema/sykmeldtSchema";
import { addSpaceAfterEverySixthCharacter } from "../../../utils/stringUtils";
import { PersonIcon } from "@navikt/aksel-icons";
import { PilotLinkCardAG } from "../pilotuser/PilotLinkCardAG";

const getSykmeldtHeader = (sykmeldt?: Sykmeldt) => {
  if (sykmeldt?.navn && sykmeldt.fnr) {
    return {
      title: sykmeldt.navn,
      subtitle: `Fødselsnr: ${addSpaceAfterEverySixthCharacter(sykmeldt?.fnr)}`,
      Icon: PersonIcon,
    };
  }

  return {
    title: "Den sykmeldte",
    subtitle: `Fødselsnr: `,
    Icon: PersonIcon,
  };
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
      <>
        <PilotLinkCardAG />
        <PageHeading title={title} heading={heading} />
        {children}
      </>
    </PageContainer>
  );
};

export default ArbeidsgiverSide;
