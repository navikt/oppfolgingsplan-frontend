import { NextPage } from "next";
import React, { ReactElement } from "react";
import { Oppfolgingsplan } from "types/oppfolgingsplan";
import {
  getStatusPageTitleAndHeading, StatusPageToDisplay,
  statusPageToDisplayAG,
} from "utils/statusPageUtils";
import { IngenPlanTilGodkjenning } from "components/status/ingenplantilgodkjenning/IngenPlanTilGodkjenning";
import { useAktivPlanAG } from "../../../../api/queries/arbeidsgiver/oppfolgingsplanerQueriesAG";
import ArbeidsgiverSide from "../../../../components/blocks/wrappers/ArbeidsgiverSide";
import { beskyttetSideUtenProps } from "../../../../auth/beskyttetSide";

interface ContentProps {
  oppfolgingsplan?: Oppfolgingsplan;
  pageToDisplay: StatusPageToDisplay | null;
}

const Content = ({ oppfolgingsplan, pageToDisplay }: ContentProps): ReactElement | null => {
  if (!oppfolgingsplan) return null;

  switch (pageToDisplay) {
    case "SENDTPLANTILGODKJENNING": {
      return <div>SENDTPLANTILGODKJENNING</div>;
    }
    case "MOTTATTFLEREGODKJENNINGER": {
      return <div>MOTTATTFLEREGODKJENNINGER</div>;
    }
    case "GODKJENNPLANMOTTATT": {
      return <div>GODKJENNPLANMOTTATT</div>;
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
