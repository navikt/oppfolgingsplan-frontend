import { NextPage } from "next";
import {
  OppfolgingsplanPageAG,
  Page,
} from "../../../../components/blocks/wrappers/OppfolgingsplanPageAG";
import { OppfolgingsplanOversikt } from "../../../../components/seplanen/OppfolgingsplanOversikt";
import { beskyttetSideUtenProps } from "../../../../auth/beskyttetSide";
import { SendTilGodkjenningAG } from "../../../../components/seplanen/sendtilgodkjenning/SendTilGodkjenningAG";
import { useAktivPlanAG } from "../../../../api/queries/arbeidsgiver/oppfolgingsplanerQueriesAG";
import { GodkjennEgenPlanAG } from "../../../../components/seplanen/sendtilgodkjenning/GodkjennEgenPlanAG";

const Seplanen: NextPage = () => {
  const aktivPlan = useAktivPlanAG();
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
    <OppfolgingsplanPageAG page={Page.SEPLANEN}>
      <OppfolgingsplanOversikt oppfolgingsplan={aktivPlan} />
      {!isOwnLeader && <SendTilGodkjenningAG oppfolgingsplan={aktivPlan} />}
      {isOwnLeader && <GodkjennEgenPlanAG oppfolgingsplan={aktivPlan} />}
    </OppfolgingsplanPageAG>
  );
};

export const getServerSideProps = beskyttetSideUtenProps;

export default Seplanen;
