import { ReportProblemCircleImage } from "@/common/images/imageComponents";
import { NarmesteLeder } from "../../../../schema/narmestelederSchema";
import { BildeTekstLinje } from "../godkjenn/BildeTekstLinje";

interface Props {
  narmesteLeder: NarmesteLeder;
}

export const ForcedApprovedOppfolgingsplan = ({ narmesteLeder }: Props) => {
  const tekst = `Planen er laget av arbeidsgiveren din. Er du uenig i innholdet, må du snakke med ${narmesteLeder.navn}.`;
  return <BildeTekstLinje imgUrl={ReportProblemCircleImage} tekst={tekst} />;
};
