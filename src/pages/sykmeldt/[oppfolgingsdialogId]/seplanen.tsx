import { NextPage } from "next";
import {
  useAktivPlanSM,
} from "api/queries/sykmeldt/oppfolgingsplanerQueriesSM";
import { SendTilGodkjenning } from "../../../components/seplanen/sendtilgodkjenning/SendTilGodkjenning";
import { OppfolgingsplanOversikt } from "../../../components/seplanen/OppfolgingsplanOversikt";
import {
  OppfolgingsplanPageSM,
  Page,
} from "../../../components/blocks/wrappers/OppfolgingsplanPageSM";
import { Alert } from "@navikt/ds-react";
import { beskyttetSideUtenProps } from "../../../auth/beskyttetSide";

const Seplanen: NextPage = () => {
  const aktivPlan = useAktivPlanSM();
  const isOwnLeader =
    aktivPlan?.arbeidsgiver?.naermesteLeder?.fnr ===
    aktivPlan?.arbeidstaker.fnr;

  return (
    <OppfolgingsplanPageSM page={Page.SEPLANEN}>
      <OppfolgingsplanOversikt oppfolgingsplan={aktivPlan} />
      {!isOwnLeader && <SendTilGodkjenning oppfolgingsplan={aktivPlan} />}
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
