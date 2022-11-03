import { Accordion, Link } from "@navikt/ds-react";
import { Avbruttplan } from "../../schema/oppfolgingsplanSchema";
import { restdatoTildato } from "utils/dateUtils";
import { useApiBasePath } from "hooks/routeHooks";
import { SpacedDiv } from "../blocks/wrappers/SpacedDiv";

interface Props {
  avbruttOppfolgingsplaner: Avbruttplan[] | null;
}

export const TidligereOppfolgingsplaner = ({
  avbruttOppfolgingsplaner,
}: Props) => {
  const apiBasePath = useApiBasePath();

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
                  href={`${apiBasePath}/oppfolgingsplaner/${plan.id}/pdf`}
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
