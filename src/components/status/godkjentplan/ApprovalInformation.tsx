import { GodkjentPlan } from "../../../types/oppfolgingsplan";
import { BildeTekstLinje } from "../BildeTekstLinje";
import ReportProblemCircleImage from "../../blocks/images/report-problem-circle.svg";
import { BodyShort } from "@navikt/ds-react";
import { SpacedDiv } from "../../blocks/wrappers/SpacedDiv";

interface Props {
  godkjentPlan: GodkjentPlan | null;
  motpartNavn: string | undefined;
}

export const ApprovalInformationSM = ({ godkjentPlan, motpartNavn }: Props) => {
  if (!godkjentPlan) return null;

  return godkjentPlan.tvungenGodkjenning ? (
    <BildeTekstLinje
      imgUrl={ReportProblemCircleImage}
      tekst={`Planen er laget av arbeidsgiveren din. Er du uenig i innholdet, må du snakke med ${motpartNavn}.`}
    />
  ) : (
    <SpacedDiv>
      <BodyShort>
        Denne versjonen av planen er godkjent av {motpartNavn} og deg.
      </BodyShort>
    </SpacedDiv>
  );
};

export const ApprovalInformationAG = ({ godkjentPlan, motpartNavn }: Props) => {
  if (!godkjentPlan) return null;

  return godkjentPlan.tvungenGodkjenning ? (
    <BildeTekstLinje
      imgUrl={ReportProblemCircleImage}
      tekst={`Denne oppfølgingsplanen ble ferdigstilt uten godkjenning fra arbeidstakeren`}
    />
  ) : (
    <SpacedDiv>
      <BodyShort>
        Denne versjonen av planen er godkjent av {motpartNavn} og deg.
      </BodyShort>
    </SpacedDiv>
  );
};
