import { NextPage } from "next";
import { OppfolgingsplanOversikt } from "../../../../components/seplanen/OppfolgingsplanOversikt";
import { beskyttetSideUtenProps } from "../../../../auth/beskyttetSide";
import { SendTilGodkjenningAG } from "../../../../components/seplanen/sendtilgodkjenning/SendTilGodkjenningAG";
import { useAktivPlanAG } from "../../../../api/queries/arbeidsgiver/oppfolgingsplanerQueriesAG";
import { GodkjennEgenPlanAG } from "../../../../components/seplanen/sendtilgodkjenning/GodkjennEgenPlanAG";
import {
  OppfolgingsplanPageAG,
  Page,
} from "../../../../components/blocks/wrappers/oppfolgingsplanpageag/OppfolgingsplanPageAG";

const Seplanen: NextPage = () => {
  const aktivPlan = useAktivPlanAG();
  const arbeidstakerFnr = aktivPlan?.arbeidstaker.fnr;
  const narmesteLederFnr = aktivPlan?.arbeidsgiver?.naermesteLeder?.fnr;

  const isOwnLeader =
    narmesteLederFnr && arbeidstakerFnr && narmesteLederFnr === arbeidstakerFnr;

  return (
    <OppfolgingsplanPageAG page={Page.SEPLANEN}>
      <OppfolgingsplanOversikt oppfolgingsplan={aktivPlan} />
      {!isOwnLeader && aktivPlan && (
        <SendTilGodkjenningAG oppfolgingsplan={aktivPlan} />
      )}
      {isOwnLeader && aktivPlan && (
        <GodkjennEgenPlanAG oppfolgingsplan={aktivPlan} />
      )}
    </OppfolgingsplanPageAG>
  );
};

export const getServerSideProps = beskyttetSideUtenProps;

export default Seplanen;
