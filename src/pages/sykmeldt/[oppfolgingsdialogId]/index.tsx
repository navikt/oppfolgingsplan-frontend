import { NextPage } from "next";
import React, { ReactElement } from "react";
import { useAktivPlanSM } from "api/queries/sykmeldt/oppfolgingsplanerQueriesSM";
import { GodkjentPlanAvbrutt } from "../../../components/status/godkjentplanavbrutt/GodkjentPlanAvbrutt";
import { GodkjennPlanAvslattOgGodkjent } from "../../../components/status/godkjennplanavslattoggodkjent/GodkjennPlanAvslattOgGodkjent";
import { GodkjennPlanAvslatt } from "../../../components/status/godkjennplanavslatt/GodkjennPlanAvslatt";
import { OppfolgingsdialogerGodkjenn } from "../../../components/status/godkjennmottatt/OppfolgingsdialogerGodkjenn";
import { statusPageToDisplaySM } from "utils/statusPageUtils";
import { GodkjentPlan } from "../../../components/status/godkjentplan/GodkjentPlan";
import { IngenPlanTilGodkjenning } from "../../../components/status/ingenplantilgodkjenning/IngenPlanTilGodkjenning";
import GodkjennPlanSendt from "../../../components/status/godkjennplansendt/GodkjennPlanSendt";
import { beskyttetSideUtenProps } from "../../../auth/beskyttetSide";
import SykmeldtSide from "../../../components/blocks/wrappers/SykmeldtSide";
import { Oppfolgingsplan } from "../../../types/oppfolgingsplan";

export const getStatusPageTitleAndHeading = (
  oppfolgingsplan?: Oppfolgingsplan
) => {
  switch (statusPageToDisplaySM(oppfolgingsplan)) {
    case "SENDTPLANTILGODKJENNING": {
      return {
        title: `Status på oppfølgingsplan`,
        heading: `Sendt til godkjenning`,
      };
    }
    case "MOTTATTFLEREGODKJENNINGER": {
      return {
        title: `Status på oppfølgingsplan`,
        heading: `Mottatt endring`,
      };
    }
    case "GODKJENNPLANMOTTATT": {
      return {
        title: `Godkjenn ${oppfolgingsplan?.virksomhet?.navn}`,
        heading: `Du har mottatt en ny plan for ${oppfolgingsplan?.virksomhet?.navn}`,
      };
    }
    case "GODKJENNPLANAVSLATT": {
      return {
        title: `Status på oppfølgingsplan`,
        heading: `Lederen din har noen forslag`,
      };
    }
    case "GODKJENTPLANAVBRUTT": {
      return {
        title: `Status på oppfølgingsplan`,
        heading: `Tidligere oppfølgingsplan`,
      };
    }
    case "GODKJENTPLAN": {
      return {
        title: `Status på oppfølgingsplan`,
        heading: `Oppfølgingsplan`,
      };
    }
    default: {
      return {
        title: `Status på oppfølgingsplan`,
        heading: `Status på oppfølgingsplan`,
      };
    }
  }
};

interface ContentProps {
  oppfolgingsplan?: Oppfolgingsplan;
}

const Content = ({ oppfolgingsplan }: ContentProps): ReactElement | null => {
  if (!oppfolgingsplan) return null;
  const pageToDisplay = statusPageToDisplaySM(oppfolgingsplan);

  switch (pageToDisplay) {
    case "SENDTPLANTILGODKJENNING": {
      return <GodkjennPlanSendt oppfolgingsplan={oppfolgingsplan} />;
    }
    case "MOTTATTFLEREGODKJENNINGER": {
      return (
        <GodkjennPlanAvslattOgGodkjent oppfolgingsplan={oppfolgingsplan} />
      );
    }
    case "GODKJENNPLANMOTTATT": {
      return <OppfolgingsdialogerGodkjenn oppfolgingsplan={oppfolgingsplan} />;
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
  const { title, heading } = getStatusPageTitleAndHeading(aktivPlan);

  return (
    <SykmeldtSide title={title} heading={heading}>
      <Content oppfolgingsplan={aktivPlan} />
    </SykmeldtSide>
  );
};

export const getServerSideProps = beskyttetSideUtenProps;

export default OppfolgingsplanStatus;
