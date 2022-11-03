import { Alert, BodyShort, Heading } from "@navikt/ds-react";
import { SpacedDiv } from "../../blocks/wrappers/SpacedDiv";

function Infobox() {
  return (
    <SpacedDiv>
      <Alert variant="info">
        <Heading spacing size="small" level="3">
          Hva skjer nå?
        </Heading>

        <BodyShort>
          Lederen din kan godkjenne eller gjøre endringer i oppfølgingsplanen.
        </BodyShort>

        <ul>
          <li>
            <BodyShort>
              Hvis lederen din godkjenner, så har dere opprettet en plan.
            </BodyShort>
          </li>

          <li>
            <BodyShort>
              Hvis lederen din gjør endringer og sender planen til deg for
              godkjenning på nytt, vil du få en melding fra NAV.
            </BodyShort>
          </li>

          <li>
            <BodyShort>
              Hvis du ikke får noen melding fra NAV, er det mulig at lederen din
              ikke har tatt stilling til planen ennå.
            </BodyShort>
          </li>

          <li>
            <BodyShort>
              Du kan når som helst gå inn her på NAV.no for å se om lederen din
              har gjort endringer.
            </BodyShort>
          </li>
        </ul>
      </Alert>
    </SpacedDiv>
  );
}

export default Infobox;
