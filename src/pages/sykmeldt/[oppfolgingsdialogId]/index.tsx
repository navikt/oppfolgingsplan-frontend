import { NextPage } from "next";
import React, { ReactElement } from "react";
import { useAktivPlanSM } from "api/queries/sykmeldt/oppfolgingsplanerQueriesSM";
import { GodkjentPlanAvbrutt } from "../../../components/status/godkjentplanavbrutt/GodkjentPlanAvbrutt";
import { GodkjennPlanAvslattOgGodkjent } from "../../../components/status/godkjennplanavslattoggodkjent/GodkjennPlanAvslattOgGodkjent";
import { GodkjennPlanAvslatt } from "../../../components/status/godkjennplanavslatt/GodkjennPlanAvslatt";
import { GodkjennPlanMottatt } from "../../../components/status/godkjennmottatt/GodkjennPlanMottatt";
import {
  getStatusPageTitleAndHeading,
  StatusPageToDisplay,
  statusPageToDisplaySM,
} from "utils/statusPageUtils";
import { GodkjentPlan } from "../../../components/status/godkjentplan/GodkjentPlan";
import { IngenPlanTilGodkjenning } from "../../../components/status/ingenplantilgodkjenning/IngenPlanTilGodkjenning";
import GodkjennPlanSendt from "../../../components/status/godkjennplansendt/GodkjennPlanSendt";
import { beskyttetSideUtenProps } from "../../../auth/beskyttetSide";
import SykmeldtSide from "../../../components/blocks/wrappers/SykmeldtSide";
import { Oppfolgingsplan } from "../../../types/oppfolgingsplan";
import GodkjennPlanSendtInfoBox from "../../../components/status/godkjennplansendt/GodkjennPlanSendtInfoBox";

interface ContentProps {
  oppfolgingsplan?: Oppfolgingsplan;
  pageToDisplay: StatusPageToDisplay | null;
}
const Content = ({
  oppfolgingsplan,
  pageToDisplay,
}: ContentProps): ReactElement | null => {
  if (!oppfolgingsplan) return null;

  const narmesteLederNavn = oppfolgingsplan.arbeidsgiver?.naermesteLeder?.navn;

  switch (pageToDisplay) {
    case "SENDTPLANTILGODKJENNING": {
      return (
        <GodkjennPlanSendt
          oppfolgingsplan={oppfolgingsplan}
          description={`Du har sendt en ny versjon av oppfølgingsplanen til din arbeidsgiver ${
            narmesteLederNavn ? narmesteLederNavn : ""
          } `}
        >
          <GodkjennPlanSendtInfoBox godkjennPlanTargetAudience={"Lederen"} />
        </GodkjennPlanSendt>
      );
    }
    case "MOTTATTFLEREGODKJENNINGER": {
      return (
        <GodkjennPlanAvslattOgGodkjent oppfolgingsplan={oppfolgingsplan} />
      );
    }
    case "GODKJENNPLANMOTTATT": {
      return (
        <GodkjennPlanMottatt
          oppfolgingsplan={oppfolgingsplan}
          description={`${oppfolgingsplan?.arbeidsgiver?.naermesteLeder?.navn} har sendt deg en ny oppfølgingsplan for godkjenning.`}
          altInnTargetAudience={"arbeidsgiveren din"}
        />
      );
    }
    case "GODKJENNPLANAVSLATT": {
      return <GodkjennPlanAvslatt oppfolgingsplan={oppfolgingsplan} />;
    }
    case "GODKJENTPLANAVBRUTT": {
      return <GodkjentPlanAvbrutt oppfolgingsplan={oppfolgingsplan} />;
    }
    case "GODKJENTPLAN": {
      return <GodkjentPlan oppfolgingsplan={oppfolgingsplan} />;
    }
    default: {
      return <IngenPlanTilGodkjenning />;
    }
  }
};

const OppfolgingsplanStatus: NextPage = () => {
  const aktivPlan = useAktivPlanSM();

  const pageToDisplay = statusPageToDisplaySM(aktivPlan);
  const { title, heading } = getStatusPageTitleAndHeading(
    pageToDisplay,
    aktivPlan?.virksomhet?.navn,
    "Lederen din"
  );

  return (
    <SykmeldtSide title={title} heading={heading}>
      <Content oppfolgingsplan={aktivPlan} pageToDisplay={pageToDisplay} />
    </SykmeldtSide>
  );
};

export const getServerSideProps = beskyttetSideUtenProps;

export default OppfolgingsplanStatus;
