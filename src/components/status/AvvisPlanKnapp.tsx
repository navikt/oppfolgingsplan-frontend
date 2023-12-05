import { PencilIcon } from "@navikt/aksel-icons";
import { Button } from "@navikt/ds-react";
import { useOppfolgingsplanUrl } from "../../hooks/routeHooks";
import { useRouter } from "next/router";
import { useAvvisOppfolgingsplan } from "../../api/queries/oppfolgingsplan/oppfolgingsplanQueries";

interface Props {
  oppfolgingsplanId: number;
}

export const AvvisPlanKnapp = ({ oppfolgingsplanId }: Props) => {
  const avvisDialog = useAvvisOppfolgingsplan();
  const arbeidsOppgaverPage = useOppfolgingsplanUrl(
    oppfolgingsplanId,
    "arbeidsoppgaver",
  );
  const router = useRouter();

  return (
    <Button
      loading={avvisDialog.isPending}
      onClick={() =>
        avvisDialog.mutateAsync(oppfolgingsplanId).then(() => {
          router.push(arbeidsOppgaverPage);
        })
      }
      icon={<PencilIcon aria-hidden />}
      variant="tertiary"
    >
      Gjør endringer
    </Button>
  );
};
