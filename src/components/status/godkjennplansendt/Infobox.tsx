import { Alert, BodyShort, Heading } from "@navikt/ds-react";
import styled from "styled-components";

const AlertStyled = styled(Alert)`
  margin: 4rem 0;
`;

function Infobox() {
  return (
    <AlertStyled variant="info">
      <Heading spacing size="small" level="3">
        Hva skjer nå?
      </Heading>

      <BodyShort>
        Lederen din kan godkjenne eller gjøre endringer i oppfølgingsplanen.
      </BodyShort>

      <BodyShort spacing>
        <ul>
          <li>Hvis lederen din godkjenner, så har dere opprettet en plan.</li>

          <li>
            Hvis lederen din gjør endringer og sender planen til deg for
            godkjenning på nytt, vil du få en melding fra NAV.
          </li>

          <li>
            Hvis du ikke får noen melding fra NAV, er det mulig at lederen din
            ikke har tatt stilling til planen ennå.
          </li>

          <li>
            Du kan når som helst gå inn her på NAV.no for å se om lederen din
            har gjort endringer.
          </li>
        </ul>
      </BodyShort>
    </AlertStyled>
  );
}

export default Infobox;
