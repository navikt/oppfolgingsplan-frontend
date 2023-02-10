import { Back } from "@navikt/ds-icons";
import { Button, Link } from "@navikt/ds-react";
import { useLandingUrl } from "hooks/routeHooks";
import { useGjeldendePlanSM } from "../../../api/queries/sykmeldt/oppfolgingsplanerQueriesSM";
import { SpacedDiv } from "../../blocks/wrappers/SpacedDiv";
import { Oppfolgingsplan } from "../../../types/oppfolgingsplan";

interface Props {
  oppfolgingsplan: Oppfolgingsplan;
}

export const TilGjeldendePlanKnapp = ({ oppfolgingsplan }: Props) => {
  const gjeldendePlan = useGjeldendePlanSM(
    oppfolgingsplan.virksomhet?.virksomhetsnummer
  );
  const basePath = useLandingUrl();

  if (!gjeldendePlan) {
    return null;
  }

  const url = `${basePath}/${gjeldendePlan.id}`;

  return (
    <SpacedDiv>
      <Link href={url}>
        <Button variant="tertiary" icon={<Back aria-hidden />}>
          Tilbake til den gjeldende utgave
        </Button>
      </Link>
    </SpacedDiv>
  );
};
