import { Row } from "../../blocks/wrappers/Row";
import { SpacedDiv } from "../../blocks/wrappers/SpacedDiv";
import { Alert, Button } from "@navikt/ds-react";
import { GodkjentPlan } from "../../../types/oppfolgingsplan";
import {
  useDelOppfolgingsplanMedFastlege,
  useDelOppfolgingsplanMedNav,
} from "../../../api/queries/oppfolgingsplan/oppfolgingsplanQueries";
import { useAudience } from "../../../hooks/routeHooks";

interface Props {
  oppfolgingsplanId: number;
  godkjentPlan: GodkjentPlan;
}

export const DelMedNavOgFastlegeButtons = ({
  oppfolgingsplanId,
  godkjentPlan,
}: Props) => {
  const delOppfolgingsplanMedFastlege = useDelOppfolgingsplanMedFastlege();
  const delOppfolgingsplanMedNAV = useDelOppfolgingsplanMedNav();
  const { isAudienceSykmeldt } = useAudience();

  //TODO: Finn en pen måte å bytte audience med komposisjon på
  const delMedFastLegeErrorText = () => {
    if (isAudienceSykmeldt) {
      return "Du får dessverre ikke delt planen med legen herfra. Det kan hende fastlegen din ikke kan ta imot elektroniske meldinger. Eller har du kanskje ingen fastlege? For å dele planen kan du laste den ned, skrive den ut og ta den med deg neste gang du er hos legen.";
    }

    return "Du får dessverre ikke delt denne planen med legen herfra. Det kan hende fastlegen ikke kan ta imot elektroniske meldinger. I dette tilfellet må dere laste ned og skrive ut planen slik at dere får delt den med legen manuelt.";
  };

  return (
    <>
      <Row className="mb-8">
        {!godkjentPlan.deltMedNAV && (
          <Button
            variant={"secondary"}
            loading={delOppfolgingsplanMedNAV.isLoading}
            onClick={() => delOppfolgingsplanMedNAV.mutate(oppfolgingsplanId)}
          >
            Del med NAV
          </Button>
        )}
        {!godkjentPlan.deltMedFastlege && (
          <Button
            variant={"secondary"}
            loading={delOppfolgingsplanMedFastlege.isLoading}
            onClick={() =>
              delOppfolgingsplanMedFastlege.mutate(oppfolgingsplanId)
            }
          >
            Del med fastlege
          </Button>
        )}
      </Row>

      {delOppfolgingsplanMedFastlege.isError && (
        <SpacedDiv>
          <Alert variant={"error"}>{delMedFastLegeErrorText()}</Alert>
        </SpacedDiv>
      )}

      {delOppfolgingsplanMedNAV.isError && (
        <SpacedDiv>
          <Alert variant={"error"}>
            Noe gikk feil da du prøvde å dele planen. Prøv igjen om litt.
          </Alert>
        </SpacedDiv>
      )}
    </>
  );
};
