import { Alert, BodyShort, Heading } from "@navikt/ds-react";
import { SpacedDiv } from "../../blocks/wrappers/SpacedDiv";

interface Props {
  godkjennPlanTargetAudience: "Lederen" | "Arbeidstakeren";
}

const GodkjennPlanSendtInfoBox = ({ godkjennPlanTargetAudience }: Props) => {
  const targetAudienceLowerCase = godkjennPlanTargetAudience.toLowerCase();

  return (
    <SpacedDiv>
      <Alert variant="info">
        <Heading spacing size="small" level="3">
          Hva skjer nå?
        </Heading>

        <BodyShort spacing>
          {godkjennPlanTargetAudience} din kan godkjenne eller gjøre endringer i
          oppfølgingsplanen.
        </BodyShort>

        <ul role="list" className="list-disc list-inside">
          <li>
            Hvis {targetAudienceLowerCase} din godkjenner, så har dere opprettet
            en plan.
          </li>

          <li>
            Hvis {targetAudienceLowerCase} din gjør endringer og sender planen
            til deg for godkjenning på nytt, vil du få en melding fra NAV.
          </li>

          <li>
            Hvis du ikke får noen melding fra NAV, er det mulig at{" "}
            {targetAudienceLowerCase} din ikke har tatt stilling til planen
            ennå.
          </li>

          <li>
            Du kan når som helst gå inn her på NAV.no for å se om{" "}
            {targetAudienceLowerCase} din har gjort endringer.
          </li>
        </ul>
      </Alert>
    </SpacedDiv>
  );
};

export default GodkjennPlanSendtInfoBox;
