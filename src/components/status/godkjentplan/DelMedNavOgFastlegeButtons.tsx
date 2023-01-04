import { Row } from "../../blocks/wrappers/Row";
import { SpacedDiv } from "../../blocks/wrappers/SpacedDiv";
import { Alert, Button } from "@navikt/ds-react";
import {
  useDelOppfolgingsplanMedFastlegeSM,
  useDelOppfolgingsplanMedNavSM,
} from "../../../api/queries/sykmeldt/oppfolgingsplanerQueriesSM";
import { GodkjentPlan } from "../../../types/oppfolgingsplan";

interface Props {
  oppfolgingsplanId: number;
  godkjentPlan: GodkjentPlan;
}

export const DelMedNavOgFastlegeButtons = ({
  oppfolgingsplanId,
  godkjentPlan,
}: Props) => {
  const delOppfolgingsplanMedFastlege = useDelOppfolgingsplanMedFastlegeSM();
  const delOppfolgingsplanMedNAV = useDelOppfolgingsplanMedNavSM();

  return (
    <>
      <Row marginBottom={"2rem"}>
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
          <Alert variant={"error"}>
            Du får dessverre ikke delt planen med legen herfra. Det kan hende
            fastlegen din ikke kan ta imot elektroniske meldinger. Eller har du
            kanskje ingen fastlege? For å dele planen kan du laste den ned,
            skrive den ut og ta den med deg neste gang du er hos legen.
          </Alert>
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
