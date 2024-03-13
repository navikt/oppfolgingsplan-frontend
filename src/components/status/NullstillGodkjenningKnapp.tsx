import { PencilIcon } from "@navikt/aksel-icons";
import { Button } from "@navikt/ds-react";
import { useOppfolgingsplanUrl } from "../../hooks/routeHooks";
import { useRouter } from "next/router";
import { useNullstillGodkjenning } from "../../api/queries/oppfolgingsplan/oppfolgingsplanQueries";
import { erUtloptGodkjentPlan } from "../../utils/oppfolgingplanUtils";
import { OppfolgingsplanDTO } from "../../schema/oppfolgingsplanSchema";

interface Props {
  oppfolgingsplan: OppfolgingsplanDTO;
}
export const NullstillGodkjenningKnapp = ({ oppfolgingsplan }: Props) => {
  const router = useRouter();
  const nullstillGodkjenning = useNullstillGodkjenning();
  const arbeidsoppgaverUrl = useOppfolgingsplanUrl(
    oppfolgingsplan.id,
    "arbeidsoppgaver",
  );
  const erHistoriskPlan = erUtloptGodkjentPlan(oppfolgingsplan);

  if (erHistoriskPlan) return null;

  return (
    <Button
      loading={nullstillGodkjenning.isPending}
      onClick={() =>
        nullstillGodkjenning.mutateAsync(oppfolgingsplan.id).then(() => {
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
