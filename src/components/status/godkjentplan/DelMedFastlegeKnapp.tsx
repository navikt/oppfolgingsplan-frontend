import { useDelOppfolgingsplanMedFastlegeSM } from "api/queries/sykmeldt/oppfolgingsplanerQueriesSM";
import { Button } from "@navikt/ds-react";

interface Props {
  oppfolgingsplanId: number;
}

export const DelMedFastlegeKnapp = ({ oppfolgingsplanId }: Props) => {
  const delOppfolgingsplanMedFastlege = useDelOppfolgingsplanMedFastlegeSM();
  return (
    <Button onClick={() => delOppfolgingsplanMedFastlege(oppfolgingsplanId)}>
      Del med fastlege
    </Button>
  );
};
