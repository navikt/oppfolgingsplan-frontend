import { BodyShort, Button, Checkbox, Heading } from "@navikt/ds-react";
import { useState } from "react";
import { SpacedDiv } from "../blocks/wrappers/SpacedDiv";
import { useGodkjennsistOppfolgingsplan } from "../../api/queries/oppfolgingsplan/oppfolgingsplanQueries";

export type AltinnTargetAudience = "arbeidstakeren" | "arbeidsgiveren din";

interface Props {
  oppfolgingsplanId: number;
  altinnTargetAudience: AltinnTargetAudience;
}

export const GodkjennOppfolgingsplan = ({
  oppfolgingsplanId,
  altinnTargetAudience,
}: Props) => {
  const [delMedNav, setDelMedNav] = useState(false);
  const godkjennOppfolgingsplan =
    useGodkjennsistOppfolgingsplan(oppfolgingsplanId);

  return (
    <SpacedDiv>
      <Heading level={"2"} size={"medium"} spacing>
        Ønsker du å godkjenne denne planen?
      </Heading>
      <BodyShort spacing>
        Alle godkjente planer mellom deg og {altinnTargetAudience} vil
        automatisk bli tilgjengelige for arbeidsplassen i Altinn.
      </BodyShort>
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
