import { PencilIcon } from "@navikt/aksel-icons";
import { Button } from "@navikt/ds-react";
import { useOppfolgingsplanUrl } from "../../hooks/routeHooks";
import { useRouter } from "next/router";
import { useNullstillGodkjenning } from "../../api/queries/oppfolgingsplan/oppfolgingsplanQueries";

interface Props {
  oppfolgingsplanId: number;
}

export const NullstillGodkjenningKnapp = ({ oppfolgingsplanId }: Props) => {
  const router = useRouter();
  const nullstillGodkjenning = useNullstillGodkjenning();
  const arbeidsoppgaverUrl = useOppfolgingsplanUrl(
    oppfolgingsplanId,
    "arbeidsoppgaver"
  );

  return (
    <Button
      loading={nullstillGodkjenning.isLoading}
      onClick={() =>
        nullstillGodkjenning.mutateAsync(oppfolgingsplanId).then(() => {
          router.push(arbeidsoppgaverUrl);
        })
      }
      icon={<PencilIcon aria-hidden />}
      variant="tertiary"
    >
      Rediger planen
    </Button>
  );
};
