import { BodyShort, Button, Checkbox, Heading } from "@navikt/ds-react";
import { useState } from "react";
import { useGodkjennsistOppfolgingsplanSM } from "../../api/queries/sykmeldt/oppfolgingsplanerQueriesSM";
import { SpacedDiv } from "../blocks/wrappers/SpacedDiv";

interface Props {
  oppfolgingsplanId: number;
}

export const GodkjennOppfolgingsplan = ({ oppfolgingsplanId }: Props) => {
  const [delMedNav, setDelMedNav] = useState(false);
  const godkjennOppfolgingsplan =
    useGodkjennsistOppfolgingsplanSM(oppfolgingsplanId);

  return (
    <SpacedDiv>
      <Heading level={"2"} size={"medium"} spacing>
        Ønsker du å godkjenne denne planen?
      </Heading>
      <BodyShort spacing>
        Alle godkjente planer mellom deg og arbeidsgiveren din vil automatisk
        bli tilgjengelige for arbeidsplassen i Altinn.
      </BodyShort>
      <SpacedDiv>
        <Checkbox onChange={() => setDelMedNav(!delMedNav)} checked={delMedNav}>
          Del planen med NAV (valgfritt)
        </Checkbox>
      </SpacedDiv>
      <Button
        onClick={() =>
          godkjennOppfolgingsplan.mutate({
            delmednav: delMedNav,
          })
        }
      >
        Godkjenn
      </Button>
    </SpacedDiv>
  );
};
