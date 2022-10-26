import { NextPage } from "next";
import { useAktivPlanSM } from "api/queries/sykmeldt/oppfolgingsplanerQueriesSM";
import { SendTilGodkjenning } from "../../../components/seplanen/sendtilgodkjenning/SendTilGodkjenning";
import { OppfolgingsplanOversikt } from "../../../components/seplanen/OppfolgingsplanOversikt";
import {
  OppfolgingsplanPageSM,
  Page,
} from "../../../components/blocks/wrappers/OppfolgingsplanPageSM";

const Seplanen: NextPage = () => {
  const aktivPlan = useAktivPlanSM();

  return (
    <OppfolgingsplanPageSM page={Page.SEPLANEN}>
      <OppfolgingsplanOversikt oppfolgingsplan={aktivPlan} />
      <SendTilGodkjenning oppfolgingsplan={aktivPlan} />
    </OppfolgingsplanPageSM>
  );
};

export default Seplanen;
