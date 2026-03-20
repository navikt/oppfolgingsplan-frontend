import React, { ReactElement, ReactNode } from "react";
import { useDineSykmeldte } from "../../../api/queries/arbeidsgiver/dinesykmeldteQueriesAG";
import { PageHeading } from "../heading/PageHeading";
import { ArbeidsgiverSideMenu } from "../sidemenu/ArbeidsgiverSideMenu";
import { PageContainer } from "@navikt/dinesykmeldte-sidemeny";
import { Sykmeldt } from "../../../schema/sykmeldtSchema";
import { addSpaceAfterEverySixthCharacter } from "../../../utils/stringUtils";
import { PersonIcon } from "@navikt/aksel-icons";
import { LumiSurveyDock, type LumiSurveyTransport } from "@navikt/lumi-survey";
import { usePostLumiFeedback } from "../../../api/queries/lumi/lumiQueries";
import { useIsPilotAG } from "../../../api/queries/arbeidsgiver/pilotQueriesAG";
import { PILOT_FEEDBACK_SURVEY } from "../../lumi/pilotFeedbackSurvey";

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

const LumiSurvey = () => {
  const isPilotQuery = useIsPilotAG();
  const postFeedback = usePostLumiFeedback();

  if (isPilotQuery.isSuccess && isPilotQuery.data) {
    const transport: LumiSurveyTransport = {
      async submit(submission) {
        await postFeedback.mutateAsync(submission.transportPayload);
      },
    };

    return (
      <LumiSurveyDock
        surveyId="oppfolgingsplan-pilot-feedback"
        survey={PILOT_FEEDBACK_SURVEY}
        transport={transport}
      />
    );
  }

  return null;
};

const ArbeidsgiverSide = ({
  title,
  heading,
  children,
}: SideProps): ReactElement => {
  const sykmeldt = useDineSykmeldte();

  return (
    <>
      <PageContainer
        sykmeldt={getSykmeldtNameAndFnr(sykmeldt.data)}
        header={getSykmeldtHeader(sykmeldt.data)}
        navigation={<ArbeidsgiverSideMenu sykmeldt={sykmeldt.data} />}
      >
        <>
          <PageHeading title={title} heading={heading} />
          {children}
        </>
      </PageContainer>
      <LumiSurvey />
    </>
  );
};

export default ArbeidsgiverSide;
