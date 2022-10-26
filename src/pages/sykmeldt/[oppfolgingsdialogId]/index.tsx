import { NextPage } from "next";
import React, { ReactElement } from "react";
import { useAktivPlanSM } from "api/queries/sykmeldt/oppfolgingsplanerQueriesSM";
import { GodkjentPlanAvbrutt } from "../../../components/status/godkjentplanavbrutt/GodkjentPlanAvbrutt";
import { Oppfolgingsplan } from "../../../schema/oppfolgingsplanSchema";
import { OppfolgingsdialogerGodkjenn } from "../../../components/status/godkjennmottatt/OppfolgingsdialogerGodkjenn";
import {
  getStatusPageTitleAndHeading,
  statusPageToDisplay,
} from "utils/statusPageUtils";
import { GodkjentPlan } from "../../../components/status/godkjentplan/GodkjentPlan";
import { IngenPlanTilGodkjenning } from "../../../components/status/ingenplantilgodkjenning/IngenPlanTilGodkjenning";
import Side from "components/blocks/wrappers/Side";

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
  const { title, heading } = getStatusPageTitleAndHeading(aktivPlan);

  return (
    <Side title={title} heading={heading}>
      <Content oppfolgingsplan={aktivPlan} />
    </Side>
  );
};

export default OppfolgingsplanStatus;
