import { Alert, BodyLong, Button, Checkbox, Heading } from "@navikt/ds-react";
import { useState } from "react";
import { SpacedDiv } from "../blocks/wrappers/SpacedDiv";
import { useGodkjennsistOppfolgingsplan } from "../../api/queries/oppfolgingsplan/oppfolgingsplanQueries";
import { OppfolgingsplanDTO } from "../../schema/oppfolgingsplanSchema";
import UxSignalsPanel from "../ux-signals/UxSignalsPanel";
import { useAudience } from "../../hooks/routeHooks";

export type MotpartNavnForAltinn = "arbeidstakeren" | "arbeidsgiveren din";

interface Props {
  oppfolgingsplan: OppfolgingsplanDTO;
  motpartNavnForAltinn: MotpartNavnForAltinn;
}

export const GodkjennOppfolgingsplan = ({
  oppfolgingsplan,
  motpartNavnForAltinn,
}: Props) => {
  const [delMedNav, setDelMedNav] = useState(false);

  const godkjennOppfolgingsplan =
    useGodkjennsistOppfolgingsplan(oppfolgingsplan);

  const { isAudienceSykmeldt } = useAudience();

  return (
    <>
      <SpacedDiv>
        <Heading level={"2"} size={"medium"} spacing>
          Ønsker du å godkjenne denne planen?
        </Heading>
        <BodyLong spacing>
          Alle godkjente planer mellom deg og {motpartNavnForAltinn} vil
          automatisk bli tilgjengelige for arbeidsplassen i Altinn.
        </BodyLong>
        <SpacedDiv>
          {oppfolgingsplan.godkjenninger.find(
            (godkjenning) => godkjenning.delMedNav,
          ) ? (
            <Alert variant="info">
              Planen vil bli delt med NAV når du godkjenner den.
            </Alert>
          ) : (
            <Checkbox
              onChange={() => setDelMedNav(!delMedNav)}
              checked={delMedNav}
            >
              Del planen med NAV (valgfritt)
            </Checkbox>
          )}
        </SpacedDiv>
        <Button
          loading={godkjennOppfolgingsplan.isPending}
          onClick={() =>
            godkjennOppfolgingsplan.mutate({
              delmednav: delMedNav,
            })
          }
        >
          Godkjenn
        </Button>
      </SpacedDiv>

      {/* For booking interviews July 2025 */}
      {isAudienceSykmeldt && <UxSignalsPanel />}
    </>
  );
};
