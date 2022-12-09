import { Edit } from "@navikt/ds-icons";
import { Button } from "@navikt/ds-react";
import { useNullstillGodkjenningSM } from "api/queries/sykmeldt/oppfolgingsplanerQueriesSM";
import { useOppfolgingsplanUrl } from "../../hooks/routeHooks";
import { useRouter } from "next/router";

interface Props {
  oppfolgingsplanId: number;
}

export const NullstillGodkjenningKnapp = ({ oppfolgingsplanId }: Props) => {
  const router = useRouter();
  const nullstillGodkjenning = useNullstillGodkjenningSM();
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
      icon={<Edit aria-hidden />}
      variant="tertiary"
    >
      Rediger planen
    </Button>
  );
};
