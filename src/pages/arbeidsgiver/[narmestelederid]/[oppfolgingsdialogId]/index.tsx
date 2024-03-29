import { NextPage } from "next";
import React, { ReactElement } from "react";
import {
  getStatusPageTitleAndHeading,
  StatusPageToDisplay,
  statusPageToDisplayAG,
} from "../../../../utils/statusPageUtils";
import { IngenPlanTilGodkjenning } from "../../../../components/status/ingenplantilgodkjenning/IngenPlanTilGodkjenning";
import { useOppfolgingsplanerAG } from "../../../../api/queries/arbeidsgiver/oppfolgingsplanerQueriesAG";
import ArbeidsgiverSide from "../../../../components/blocks/wrappers/ArbeidsgiverSide";
import { beskyttetSideUtenProps } from "../../../../auth/beskyttetSide";
import GodkjennPlanSendt from "../../../../components/status/godkjennplansendt/GodkjennPlanSendt";
import GodkjennPlanSendtInfoBox from "../../../../components/status/godkjennplansendt/GodkjennPlanSendtInfoBox";
import { GodkjennPlanMottatt } from "../../../../components/status/godkjennmottatt/GodkjennPlanMottatt";
import { GodkjennPlanAvslattOgGodkjent } from "../../../../components/status/godkjennplanavslattoggodkjent/GodkjennPlanAvslattOgGodkjent";
import { GodkjennPlanAvslatt } from "../../../../components/status/godkjennplanavslatt/GodkjennPlanAvslatt";
import { ApprovalInformationAG } from "../../../../components/status/godkjentplan/ApprovalInformation";
import { GodkjentPlanAvbrutt } from "../../../../components/status/godkjentplanavbrutt/GodkjentPlanAvbrutt";
import { GodkjentPlan } from "../../../../components/status/godkjentplan/GodkjentPlan";
import { useOppfolgingsplanRouteId } from "../../../../hooks/routeHooks";
import { OPSkeleton } from "../../../../components/blocks/skeleton/OPSkeleton";
import { findAktivPlan } from "../../../../utils/oppfolgingplanUtils";
import { useTilgangAG } from "../../../../api/queries/arbeidsgiver/tilgangQueriesAG";
import { IkkeTilgangTilAnsattInfoBoks } from "../../../../components/blocks/infoboks/IkkeTilgangTilAnsattInfoBoks";
import { OppfolgingsplanDTO } from "../../../../schema/oppfolgingsplanSchema";

interface ContentProps {
  oppfolgingsplan?: OppfolgingsplanDTO;
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
      return (
        <GodkjennPlanAvslattOgGodkjent
          oppfolgingsplan={oppfolgingsplan}
          description={`${oppfolgingsplan?.arbeidstaker?.navn} har gjort noen
        endringer i planen og sendt den tilbake til deg.`}
          motpartNavnForAltinn={"arbeidstakeren"}
        />
      );
    }
    case "GODKJENNPLANMOTTATT": {
      return (
        <GodkjennPlanMottatt
          oppfolgingsplan={oppfolgingsplan}
          description={`${oppfolgingsplan?.arbeidstaker?.navn} har sendt deg en ny oppfølgingsplan for godkjenning.`}
          motpartNavnForAltinn={"arbeidstakeren"}
        />
      );
    }
    case "GODKJENNPLANAVSLATT": {
      return <GodkjennPlanAvslatt oppfolgingsplan={oppfolgingsplan} />;
    }
    case "GODKJENTPLANAVBRUTT": {
      return (
        <GodkjentPlanAvbrutt oppfolgingsplan={oppfolgingsplan}>
          <ApprovalInformationAG
            godkjentPlan={oppfolgingsplan.godkjentPlan}
            sykmeldtNavn={oppfolgingsplan.arbeidstaker?.navn}
          />
        </GodkjentPlanAvbrutt>
      );
    }
    case "GODKJENTPLAN": {
      return (
        <GodkjentPlan oppfolgingsplan={oppfolgingsplan}>
          <ApprovalInformationAG
            godkjentPlan={oppfolgingsplan.godkjentPlan}
            sykmeldtNavn={oppfolgingsplan.arbeidstaker?.navn}
          />
        </GodkjentPlan>
      );
    }
    default: {
      return <IngenPlanTilGodkjenning />;
    }
  }
};

const OppfolgingsplanStatusAG: NextPage = () => {
  const allePlaner = useOppfolgingsplanerAG();
  const aktivPlanId = useOppfolgingsplanRouteId();
  const tilgang = useTilgangAG();

  if (allePlaner.isPending || tilgang.isPending) {
    return (
      <ArbeidsgiverSide title={"Oppfølgingsplan"} heading={"Oppfølgingsplan"}>
        <OPSkeleton />
      </ArbeidsgiverSide>
    );
  }
  if (allePlaner.isSuccess && tilgang.isSuccess) {
    const aktivPlan = findAktivPlan(aktivPlanId, allePlaner.data);

    if (!aktivPlan) return null;

    const pageToDisplay = statusPageToDisplayAG(aktivPlan);
    const { title, heading } = getStatusPageTitleAndHeading(
      pageToDisplay,
      aktivPlan?.virksomhet?.navn,
      aktivPlan?.arbeidstaker.navn || "Arbeidstakeren din",
    );

    return (
      <ArbeidsgiverSide title={title} heading={heading}>
        {tilgang.data.harTilgang === true ? (
          <Content oppfolgingsplan={aktivPlan} pageToDisplay={pageToDisplay} />
        ) : (
          <IkkeTilgangTilAnsattInfoBoks />
        )}
      </ArbeidsgiverSide>
    );
  }

  return null;
};

export const getServerSideProps = beskyttetSideUtenProps;

export default OppfolgingsplanStatusAG;
