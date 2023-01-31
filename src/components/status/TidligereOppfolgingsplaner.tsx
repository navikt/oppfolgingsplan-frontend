import { Accordion, Link } from "@navikt/ds-react";
import { restdatoTildato } from "utils/dateUtils";
import { SpacedDiv } from "../blocks/wrappers/SpacedDiv";
import { Avbruttplan } from "../../types/oppfolgingsplan";
import { useOppfolgingsplanApiPath } from "../../hooks/routeHooks";

interface Props {
  avbruttOppfolgingsplaner: Avbruttplan[] | null;
}

export const TidligereOppfolgingsplaner = ({
  avbruttOppfolgingsplaner,
}: Props) => {
  const oppfolgingsplanApiRoute = useOppfolgingsplanApiPath();

  if (!avbruttOppfolgingsplaner || !avbruttOppfolgingsplaner.length) {
    return null;
  }

  return (
    <SpacedDiv>
      <Accordion style={{ width: "100%", maxWidth: "65ch" }}>
        <Accordion.Item>
          <Accordion.Header>
            Se tidligere utgaver av denne planen
          </Accordion.Header>
          <Accordion.Content>
            {avbruttOppfolgingsplaner.map((plan: Avbruttplan, idx: number) => (
              <div key={`avbrutt-plan-${idx}`}>
                <Link
                  href={`${oppfolgingsplanApiRoute}/${plan.id}/pdf`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {`Oppfølgingsplan endret ${restdatoTildato(plan.tidspunkt)}`}
                </Link>
              </div>
            ))}
          </Accordion.Content>
        </Accordion.Item>
      </Accordion>
    </SpacedDiv>
  );
};
