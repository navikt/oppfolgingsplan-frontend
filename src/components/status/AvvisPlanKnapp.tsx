import { Edit } from "@navikt/ds-icons";
import { Button } from "@navikt/ds-react";
import { useAvvisOppfolgingsplanSM } from "api/queries/sykmeldt/oppfolgingsplanerQueriesSM";
import Link from "next/link";
import { useOppfolgingsplanUrl } from "../../hooks/routeHooks";

interface Props {
  oppfolgingsplanId: number;
}

export const AvvisPlanKnapp = ({ oppfolgingsplanId }: Props) => {
  const avvisDialog = useAvvisOppfolgingsplanSM();
  const arbeidsOppgaverPage = useOppfolgingsplanUrl(
    oppfolgingsplanId,
    "arbeidsoppgaver"
  );

  return (
    <Link href={arbeidsOppgaverPage}>
      <Button
        onClick={() => avvisDialog.mutate(oppfolgingsplanId)}
        icon={<Edit />}
        variant="tertiary"
      >
        Gjør endringer
      </Button>
    </Link>
  );
};
