import { NextPage } from "next";
import { useAktivPlanSM } from "api/queries/sykmeldt/oppfolgingsplanerQueriesSM";
import { SendTilGodkjenningSM } from "../../../components/seplanen/sendtilgodkjenning/SendTilGodkjenningSM";
import { OppfolgingsplanOversikt } from "../../../components/seplanen/OppfolgingsplanOversikt";
import {
  OppfolgingsplanPageSM,
  Page,
} from "../../../components/blocks/wrappers/OppfolgingsplanPageSM";
import { Alert } from "@navikt/ds-react";
import { beskyttetSideUtenProps } from "../../../auth/beskyttetSide";

const Seplanen: NextPage = () => {
  const aktivPlan = useAktivPlanSM();
  const arbeidstakerFnr = aktivPlan?.arbeidstaker.fnr
    ? aktivPlan?.arbeidstaker.fnr
    : undefined;
  const narnesteLederFnr = aktivPlan?.arbeidsgiver?.naermesteLeder?.fnr
    ? aktivPlan?.arbeidsgiver?.naermesteLeder?.fnr
    : undefined;

  const isOwnLeader =
    narnesteLederFnr !== undefined &&
    arbeidstakerFnr !== undefined &&
    narnesteLederFnr === arbeidstakerFnr;

  return (
    <OppfolgingsplanPageSM page={Page.SEPLANEN}>
      <OppfolgingsplanOversikt oppfolgingsplan={aktivPlan} />
      {!isOwnLeader && <SendTilGodkjenningSM oppfolgingsplan={aktivPlan} />}
      {isOwnLeader && (
        <Alert variant={"info"}>
          Fordi du er din egen leder, må du logge inn som arbeidsgiver for å
          fullføre planen.
        </Alert>
      )}
    </OppfolgingsplanPageSM>
  );
};

export const getServerSideProps = beskyttetSideUtenProps;

export default Seplanen;
