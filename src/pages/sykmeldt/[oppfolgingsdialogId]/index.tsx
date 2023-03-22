import { NextPage } from "next";
import React, { ReactElement, useEffect } from "react";
import { GodkjentPlanAvbrutt } from "../../../components/status/godkjentplanavbrutt/GodkjentPlanAvbrutt";
import { GodkjennPlanAvslattOgGodkjent } from "../../../components/status/godkjennplanavslattoggodkjent/GodkjennPlanAvslattOgGodkjent";
import { GodkjennPlanAvslatt } from "../../../components/status/godkjennplanavslatt/GodkjennPlanAvslatt";
import { GodkjennPlanMottatt } from "../../../components/status/godkjennmottatt/GodkjennPlanMottatt";
import { GodkjentPlan } from "../../../components/status/godkjentplan/GodkjentPlan";
import { IngenPlanTilGodkjenning } from "../../../components/status/ingenplantilgodkjenning/IngenPlanTilGodkjenning";
import GodkjennPlanSendt from "../../../components/status/godkjennplansendt/GodkjennPlanSendt";
import { beskyttetSideUtenProps } from "../../../auth/beskyttetSide";
import SykmeldtSide from "../../../components/blocks/wrappers/SykmeldtSide";
import { Oppfolgingsplan } from "../../../types/oppfolgingsplan";
import GodkjennPlanSendtInfoBox from "../../../components/status/godkjennplansendt/GodkjennPlanSendtInfoBox";
import { ApprovalInformationSM } from "../../../components/status/godkjentplan/ApprovalInformation";
import { useAktivPlanSM } from "../../../api/queries/sykmeldt/oppfolgingsplanerQueriesSM";
import {
  getStatusPageTitleAndHeading,
  StatusPageToDisplay,
  statusPageToDisplaySM,
  planTilGodkjenningSM,
} from "../../../utils/statusPageUtils";
import { useOppfolgingsplanRouteId } from "../../../hooks/routeHooks";
import { useFerdigstillGodkjennPlanVarsel } from "../../../api/queries/varsel/ferdigstillingQueries";

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
        <GodkjennPlanAvslattOgGodkjent
          oppfolgingsplan={oppfolgingsplan}
          description={`${narmesteLederNavn} har gjort noen
        endringer i planen og sendt den tilbake til deg.`}
          motpartNavnForAltinn={"arbeidsgiveren din"}
        />
      );
    }
    case "GODKJENNPLANMOTTATT": {
      return (
        <GodkjennPlanMottatt
          oppfolgingsplan={oppfolgingsplan}
          description={`${narmesteLederNavn} har sendt deg en ny oppfølgingsplan for godkjenning.`}
          motpartNavnForAltinn={"arbeidsgiveren din"}
        />
      );
    }
    case "GODKJENNPLANAVSLATT": {
      return <GodkjennPlanAvslatt oppfolgingsplan={oppfolgingsplan} />;
    }
    case "GODKJENTPLANAVBRUTT": {
      return (
        <GodkjentPlanAvbrutt oppfolgingsplan={oppfolgingsplan}>
          <ApprovalInformationSM
            godkjentPlan={oppfolgingsplan.godkjentPlan}
            narmesteLederNavn={
              oppfolgingsplan.arbeidsgiver.naermesteLeder?.navn
            }
          />
        </GodkjentPlanAvbrutt>
      );
    }
    case "GODKJENTPLAN": {
      return (
        <GodkjentPlan oppfolgingsplan={oppfolgingsplan}>
          <ApprovalInformationSM
            godkjentPlan={oppfolgingsplan.godkjentPlan}
            narmesteLederNavn={
              oppfolgingsplan.arbeidsgiver.naermesteLeder?.navn
            }
          />
        </GodkjentPlan>
      );
    }
    default: {
      return <IngenPlanTilGodkjenning />;
    }
  }
};

const OppfolgingsplanStatus: NextPage = () => {
  const aktivPlan = useAktivPlanSM();
  const ferdigstillVarsel = useFerdigstillGodkjennPlanVarsel();
  const oppfolgingsplanId = useOppfolgingsplanRouteId();

  const pageToDisplay = statusPageToDisplaySM(aktivPlan);
  const { title, heading } = getStatusPageTitleAndHeading(
    pageToDisplay,
    aktivPlan?.virksomhet?.navn,
    "Lederen din"
  );

  const erPlanTilGodkjenning = planTilGodkjenningSM(aktivPlan);

  useEffect(() => {
    if (oppfolgingsplanId) {
      const varselKey = `ferdigstiltVarselSM-${oppfolgingsplanId}`;
      const ferdigstiltVarsel = sessionStorage.getItem(varselKey);
      if (ferdigstiltVarsel || !erPlanTilGodkjenning) {
        return;
      }
      ferdigstillVarsel.mutate({
        erSykmeldt: true,
        oppfolgingsplanId: oppfolgingsplanId,
      });
      sessionStorage.setItem(varselKey, "true");
    }
  }, [erPlanTilGodkjenning, ferdigstillVarsel, oppfolgingsplanId]);

  return (
    <SykmeldtSide title={title} heading={heading}>
      <Content oppfolgingsplan={aktivPlan} pageToDisplay={pageToDisplay} />
    </SykmeldtSide>
  );
};

export const getServerSideProps = beskyttetSideUtenProps;

export default OppfolgingsplanStatus;
