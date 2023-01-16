import { NextPage } from "next";
import React, { ReactElement } from "react";
import { Oppfolgingsplan } from "types/oppfolgingsplan";
import {
  getStatusPageTitleAndHeading,
  StatusPageToDisplay,
  statusPageToDisplayAG,
} from "utils/statusPageUtils";
import { IngenPlanTilGodkjenning } from "components/status/ingenplantilgodkjenning/IngenPlanTilGodkjenning";
import { useAktivPlanAG } from "../../../../api/queries/arbeidsgiver/oppfolgingsplanerQueriesAG";
import ArbeidsgiverSide from "../../../../components/blocks/wrappers/ArbeidsgiverSide";
import { beskyttetSideUtenProps } from "../../../../auth/beskyttetSide";
import GodkjennPlanSendt from "../../../../components/status/godkjennplansendt/GodkjennPlanSendt";
import GodkjennPlanSendtInfoBox from "../../../../components/status/godkjennplansendt/GodkjennPlanSendtInfoBox";
import { GodkjennPlanMottatt } from "../../../../components/status/godkjennmottatt/GodkjennPlanMottatt";

interface ContentProps {
  oppfolgingsplan?: Oppfolgingsplan;
  pageToDisplay: StatusPageToDisplay | null;
}

const Content = ({
  oppfolgingsplan,
  pageToDisplay,
}: ContentProps): ReactElement | null => {
  if (!oppfolgingsplan) return null;

  switch (pageToDisplay) {
    case "SENDTPLANTILGODKJENNING": {
      return (
        <GodkjennPlanSendt
          oppfolgingsplan={oppfolgingsplan}
          description={
            "Du har sendt en ny versjon av oppfølgingsplanen til din arbeidstaker"
          }
        >
          <GodkjennPlanSendtInfoBox
            godkjennPlanTargetAudience={"Arbeidstakeren"}
          />
        </GodkjennPlanSendt>
      );
    }
    case "MOTTATTFLEREGODKJENNINGER": {
      return <div>MOTTATTFLEREGODKJENNINGER</div>;
    }
    case "GODKJENNPLANMOTTATT": {
      return (
        <GodkjennPlanMottatt
          oppfolgingsplan={oppfolgingsplan}
          description={`${oppfolgingsplan?.arbeidstaker?.navn} har sendt deg en ny oppfølgingsplan for godkjenning.`}
          altinnTargetAudience={"arbeidstakeren"}
        />
      );
    }
    case "GODKJENNPLANAVSLATT": {
      return <div>GODKJENNPLANAVSLATT</div>;
    }
    case "GODKJENTPLANAVBRUTT": {
      return <div>GODKJENTPLANAVBRUTT</div>;
    }
    case "GODKJENTPLAN": {
      return <div>GODKJENTPLAN</div>;
    }
    default: {
      return <IngenPlanTilGodkjenning />;
    }
  }
};

const OppfolgingsplanStatusAG: NextPage = () => {
  const aktivPlan = useAktivPlanAG();
  const pageToDisplay = statusPageToDisplayAG(aktivPlan);
  const { title, heading } = getStatusPageTitleAndHeading(
    pageToDisplay,
    aktivPlan?.virksomhet?.navn,
    aktivPlan?.arbeidstaker.navn || "Den sykmeldte"
  );

  return (
    <ArbeidsgiverSide title={title} heading={heading}>
      <Content oppfolgingsplan={aktivPlan} pageToDisplay={pageToDisplay} />
    </ArbeidsgiverSide>
  );
};

export const getServerSideProps = beskyttetSideUtenProps;

export default OppfolgingsplanStatusAG;
