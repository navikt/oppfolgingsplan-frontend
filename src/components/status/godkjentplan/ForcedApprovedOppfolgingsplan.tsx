import { NarmesteLeder } from "../../../schema/narmestelederSchema";
import { BildeTekstLinje } from "../BildeTekstLinje";
import ReportProblemCircleImage from "../../blocks/images/report-problem-circle.svg";

interface Props {
  narmesteLeder: NarmesteLeder;
}

export const ForcedApprovedOppfolgingsplan = ({ narmesteLeder }: Props) => {
  const tekst = `Planen er laget av arbeidsgiveren din. Er du uenig i innholdet, må du snakke med ${narmesteLeder.navn}.`;
  return <BildeTekstLinje imgUrl={ReportProblemCircleImage} tekst={tekst} />;
};
