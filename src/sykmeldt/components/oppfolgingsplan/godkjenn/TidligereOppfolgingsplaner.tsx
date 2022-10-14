import { Accordion } from "@navikt/ds-react";
import { Avbruttplan } from "../../../../schema/oppfolgingsplanSchema";
import { restdatoTildato } from "@/common/utils/dateUtils";
import { useApiBasePath } from "@/common/hooks/routeHooks";
import styled from "styled-components";

interface Props {
  avbruttOppfolgingsplaner: Avbruttplan[];
}

const Container = styled.div`
  margin: 2rem 0;
`;

export const TidligereOppfolgingsplaner = ({
  avbruttOppfolgingsplaner,
}: Props) => {
  const apiBasePath = useApiBasePath();

  return (
    <Container>
      <Accordion style={{ width: "100%", maxWidth: "65ch" }}>
        <Accordion.Item>
          <Accordion.Header>
            Se tidligere utgaver av denne planen
          </Accordion.Header>
          <Accordion.Content>
            {avbruttOppfolgingsplaner.map((plan: Avbruttplan, idx: number) => (
              <div key={`avbrutt-plan-${idx}`}>
                <a
                  href={`${apiBasePath}/oppfolgingsplaner/${plan.id}/pdf`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {`Oppfølgingsplan endret ${restdatoTildato(plan.tidspunkt)}`}
                </a>
              </div>
            ))}
          </Accordion.Content>
        </Accordion.Item>
      </Accordion>
    </Container>
  );
};
