import { useDelOppfolgingsplanMedNavSM } from "api/queries/sykmeldt/oppfolgingsplanerQueriesSM";
import { Button } from "@navikt/ds-react";

interface Props {
  oppfolgingsplanId: number;
}

export const DelMedNavKnapp = ({ oppfolgingsplanId }: Props) => {
  const delOppfolgingsplanMedNav = useDelOppfolgingsplanMedNavSM();
  return (
    <Button onClick={() => delOppfolgingsplanMedNav.mutate(oppfolgingsplanId)}>
      Del med NAV
    </Button>
  );
};
