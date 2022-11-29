import { Edit } from "@navikt/ds-icons";
import { Button } from "@navikt/ds-react";
import { useAvvisOppfolgingsplanSM } from "api/queries/sykmeldt/oppfolgingsplanerQueriesSM";
import { useOppfolgingsplanUrl } from "../../hooks/routeHooks";
import { useRouter } from "next/router";

interface Props {
  oppfolgingsplanId: number;
}

export const AvvisPlanKnapp = ({ oppfolgingsplanId }: Props) => {
  const avvisDialog = useAvvisOppfolgingsplanSM();
  const arbeidsOppgaverPage = useOppfolgingsplanUrl(
    oppfolgingsplanId,
    "arbeidsoppgaver"
  );
  const router = useRouter();

  return (
    <Button
      loading={avvisDialog.isLoading}
      onClick={() =>
        avvisDialog.mutateAsync(oppfolgingsplanId).then(() => {
          router.push(arbeidsOppgaverPage);
        })
      }
      icon={<Edit />}
      variant="tertiary"
    >
      Gjør endringer
    </Button>
  );
};
