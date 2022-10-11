import { Button, Checkbox } from "@navikt/ds-react";
import styled from "styled-components";

const Container = styled.div`
  margin: 4rem 0;
`;

const ButtonContainer = styled.div`
  margin: 1rem 0 0 0;
`;

export const GodkjennOppfolgingsplan = () => {
  return (
    <Container>
      <h2>Ønsker du å godkjenne denne planen?</h2>
      <p>
        Alle godkjente planer mellom deg og arbeidstakeren vil automatisk bli
        tilgjengelige for arbeidsplassen i Altinn.
      </p>
      <Checkbox>Del planen med NAV (valgfritt)</Checkbox>
      <ButtonContainer>
        <Button>Godkjenn</Button>
      </ButtonContainer>
    </Container>
  );
};
