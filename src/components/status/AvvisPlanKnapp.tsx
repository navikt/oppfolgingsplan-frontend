import { Edit } from "@navikt/ds-icons";
import { Button } from "@navikt/ds-react";
import { useAvvisOppfolgingsplanSM } from "api/queries/sykmeldt/oppfolgingsplanerQueriesSM";

interface Props {
  oppfolgingsplanId: number;
}

export const AvvisPlanKnapp = ({ oppfolgingsplanId }: Props) => {
  const avvisDialog = useAvvisOppfolgingsplanSM();

  return (
    <Button
      onClick={() => avvisDialog.mutate(oppfolgingsplanId)}
      icon={<Edit />}
      variant="tertiary"
    >
      Gjør endringer
    </Button>
  );
};
