import { BodyShort, Button, Checkbox, Heading } from "@navikt/ds-react";
import { useState } from "react";
import { SpacedDiv } from "../blocks/wrappers/SpacedDiv";
import { useGodkjennsistOppfolgingsplan } from "../../api/queries/oppfolgingsplan/oppfolgingsplanQueries";

interface Props {
  oppfolgingsplanId: number;
  altInnTargetAudience: string;
}

export const GodkjennOppfolgingsplan = ({
  oppfolgingsplanId,
  altInnTargetAudience,
}: Props) => {
  const [delMedNav, setDelMedNav] = useState(false);
  const godkjennOppfolgingsplan =
    useGodkjennsistOppfolgingsplan(oppfolgingsplanId);

  return (
    <SpacedDiv>
      <Heading level={"2"} size={"medium"} spacing>
        Ønsker du å godkjenne denne planen?
      </Heading>
      <BodyShort spacing>Alle godkjente planer mellom deg og {altInnTargetAudience} vil automatisk bli tilgjengelige for arbeidsplassen i Altinn.</BodyShort>
      <SpacedDiv>
        <Checkbox onChange={() => setDelMedNav(!delMedNav)} checked={delMedNav}>
          Del planen med NAV (valgfritt)
        </Checkbox>
      </SpacedDiv>
      <Button
        loading={godkjennOppfolgingsplan.isLoading}
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
