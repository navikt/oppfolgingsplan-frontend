import { Button, Checkbox } from "@navikt/ds-react";
import { useState } from "react";
import styled from "styled-components";
import { useGodkjennsistOppfolgingsplanSM } from "../../api/queries/sykmeldt/oppfolgingsplanerQueriesSM";

const Container = styled.div`
  margin: 4rem 0;
`;

const ButtonContainer = styled.div`
  margin: 1rem 0 0 0;
`;

interface Props {
  oppfolgingsplanId: number;
}

export const GodkjennOppfolgingsplan = ({ oppfolgingsplanId }: Props) => {
  const [delMedNav, setDelMedNav] = useState(false);
  const godkjennOppfolgingsplan =
    useGodkjennsistOppfolgingsplanSM(oppfolgingsplanId);

  return (
    <Container>
      <h2>Ønsker du å godkjenne denne planen?</h2>
      <p>
        Alle godkjente planer mellom deg og arbeidstakeren vil automatisk bli
        tilgjengelige for arbeidsplassen i Altinn.
      </p>
      <Checkbox onChange={() => setDelMedNav(!delMedNav)} checked={delMedNav}>
        Del planen med NAV (valgfritt)
      </Checkbox>
      <ButtonContainer>
        <Button
          onClick={() =>
            godkjennOppfolgingsplan.mutate({
              delmednav: delMedNav,
            })
          }
        >
          Godkjenn
        </Button>
      </ButtonContainer>
    </Container>
  );
};
