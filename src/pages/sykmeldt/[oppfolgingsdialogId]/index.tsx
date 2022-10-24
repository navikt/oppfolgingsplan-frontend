import { NextPage } from "next";
import React, { ReactElement } from "react";
import { useAktivPlanSM } from "@/common/api/queries/sykmeldt/oppfolgingsplanerQueriesSM";
import Side from "@/common/components/wrappers/Side";
import { Oppfolgingsplan } from "../../../schema/oppfolgingsplanSchema";
import { OppfolgingsdialogerGodkjenn } from "../../../sykmeldt/components/oppfolgingsplan/godkjenn/OppfolgingsdialogerGodkjenn";
import {
  getStatusPageTitleAndHeading,
  statusPageToDisplay,
} from "@/common/utils/statusPageUtils";

interface ContentProps {
  oppfolgingsplan?: Oppfolgingsplan;
}

const Content = ({ oppfolgingsplan }: ContentProps): ReactElement | null => {
  if (!oppfolgingsplan) return null;
  const pageToDisplay = statusPageToDisplay(oppfolgingsplan);

  switch (pageToDisplay) {
    case "SENDTPLANTILGODKJENNING": {
      return <div>TODO GODKJENTPLANSENDT</div>;
    }
    case "MOTTATTFLEREGODKJENNINGER": {
      return <div>TODO GODKJENNPLANAVSLATTOGGODKJENT</div>;
    }
    case "GODKJENNPLANMOTTATT": {
      return <OppfolgingsdialogerGodkjenn oppfolgingsplan={oppfolgingsplan} />;
    }
    case "GODKJENNPLANAVSLATT": {
      return <div>TODO GODKJENNPLANAVSLATT</div>;
    }
    case "TVANGSGODKJENT": {
      return <div>TODO TVANGSGODKJENT</div>;
    }
    case "GODKJENTPLANAVBRUTT": {
      return <div>TODO GODKJENTPLANAVBRUTT</div>;
    }
    case "GODKJENTPLAN": {
      return <div>TODO GODKJENTPLAN</div>;
    }
    default: {
      return <div>TODO INGEN GODKJENNING ELLER GODKJENT</div>;
    }
  }
};

const OppfolgingsplanStatus: NextPage = () => {
  const aktivPlan = useAktivPlanSM();
  const { title, heading } = getStatusPageTitleAndHeading(aktivPlan);

  return (
    <Side title={title} heading={heading}>
      <Content oppfolgingsplan={aktivPlan} />
    </Side>
  );
};

export default OppfolgingsplanStatus;
