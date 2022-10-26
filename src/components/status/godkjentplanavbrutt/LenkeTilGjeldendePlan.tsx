import { Back } from "@navikt/ds-icons";
import { Button } from "@navikt/ds-react";
import { useLandingUrl } from "hooks/routeHooks";
import NextLink from "next/link";
import { useOppfolgingsplanerSM } from "../../../api/queries/sykmeldt/oppfolgingsplanerQueriesSM";
import { Oppfolgingsplan } from "../../../schema/oppfolgingsplanSchema";
import { finnNyOppfolgingsplanMedVirkshomhetEtterAvbrutt } from "../../../utils/oppfolgingplanUtils";
import { SpacedDiv } from "../../blocks/wrappers/SpacedDiv";

interface Props {
  oppfolgingsplan: Oppfolgingsplan;
}

export const LenkeTilGjeldendePlan = ({ oppfolgingsplan }: Props) => {
  const allePlaner = useOppfolgingsplanerSM();
  const basePath = useLandingUrl();

  const aktivPlan = finnNyOppfolgingsplanMedVirkshomhetEtterAvbrutt(
    allePlaner.data!,
    oppfolgingsplan.virksomhet!.virksomhetsnummer!
  );

  if (!aktivPlan) {
    return null;
  }

  const url = `${basePath}/${aktivPlan.id}`;

  return (
    <SpacedDiv>
      <NextLink href={url} passHref={true}>
        <Button variant="tertiary" icon={<Back aria-hidden />}>
          Tilbake til den gjeldende utgave
        </Button>
      </NextLink>
    </SpacedDiv>
  );
};
