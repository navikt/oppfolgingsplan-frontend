import { NextPage } from "next";
import {
  OppfolgingsplanPageAG,
  Page,
} from "../../../../components/blocks/wrappers/OppfolgingsplanPageAG";
import { OppfolgingsplanOversikt } from "../../../../components/seplanen/OppfolgingsplanOversikt";
import { beskyttetSideUtenProps } from "../../../../auth/beskyttetSide";
import { SendTilGodkjenningAG } from "../../../../components/seplanen/sendtilgodkjenning/SendTilGodkjenningAG";
import { useAktivPlanAG } from "../../../../api/queries/arbeidsgiver/oppfolgingsplanerQueriesAG";

const Seplanen: NextPage = () => {
  const aktivPlan = useAktivPlanAG();

  return (
    <OppfolgingsplanPageAG page={Page.SEPLANEN}>
      <OppfolgingsplanOversikt oppfolgingsplan={aktivPlan} />
      <SendTilGodkjenningAG oppfolgingsplan={aktivPlan} />
    </OppfolgingsplanPageAG>
  );
};

export const getServerSideProps = beskyttetSideUtenProps;

export default Seplanen;
