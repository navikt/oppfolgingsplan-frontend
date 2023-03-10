import { Back } from "@navikt/ds-icons";
import { Button } from "@navikt/ds-react";
import { useLandingUrl } from "../../../hooks/routeHooks";
import NextLink from "next/link";
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
      <NextLink href={url}>
        <Button variant="tertiary" icon={<Back aria-hidden />}>
          Tilbake til den gjeldende utgave
        </Button>
      </NextLink>
    </SpacedDiv>
  );
};
