import { GodkjentPlan } from "../../../types/oppfolgingsplan";
import { BildeTekstLinje } from "../BildeTekstLinje";
import ReportProblemCircleImage from "../../blocks/images/report-problem-circle.svg";
import { BodyShort } from "@navikt/ds-react";
import { SpacedDiv } from "../../blocks/wrappers/SpacedDiv";

interface ApprovalInformationSMProps {
  godkjentPlan: GodkjentPlan | null;
  narmesteLederNavn: string | undefined;
}

export const ApprovalInformationSM = ({
  godkjentPlan,
  narmesteLederNavn = "din nærmeste leder",
}: ApprovalInformationSMProps) => {
  if (!godkjentPlan) return null;

  return godkjentPlan.tvungenGodkjenning ? (
    <BildeTekstLinje
      imgUrl={ReportProblemCircleImage}
      tekst={`Planen er laget av arbeidsgiveren din. Er du uenig i innholdet, må du snakke med ${narmesteLederNavn}.`}
    />
  ) : (
    <SpacedDiv>
      <BodyShort>
        Denne versjonen av planen er godkjent av {narmesteLederNavn} og deg.
      </BodyShort>
    </SpacedDiv>
  );
};

interface ApprovalInformationAGProps {
  godkjentPlan: GodkjentPlan | null;
  sykmeldtNavn: string | undefined;
}

export const ApprovalInformationAG = ({
  godkjentPlan,
  sykmeldtNavn = "arbeidstakeren",
}: ApprovalInformationAGProps) => {
  if (!godkjentPlan) return null;

  return godkjentPlan.tvungenGodkjenning ? (
    <BildeTekstLinje
      imgUrl={ReportProblemCircleImage}
      tekst={`Denne oppfølgingsplanen ble ferdigstilt uten godkjenning fra arbeidstakeren`}
    />
  ) : (
    <SpacedDiv>
      <BodyShort>
        Denne versjonen av planen er godkjent av {sykmeldtNavn} og deg.
      </BodyShort>
    </SpacedDiv>
  );
};
