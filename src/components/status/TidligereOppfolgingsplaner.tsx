import { Accordion, Link } from "@navikt/ds-react";
import { restdatoTildato } from "utils/dateUtils";
import { SpacedDiv } from "../blocks/wrappers/SpacedDiv";
import { Avbruttplan } from "../../types/oppfolgingsplan";
import { usePdfApiUrl } from "../../hooks/routeHooks";

interface Props {
  avbruttOppfolgingsplaner: Avbruttplan[] | null;
}

function PdfLink({ plan }: { plan: Avbruttplan }) {
  const pdfUrl = usePdfApiUrl(plan.id);

  return (
    <Link href={pdfUrl} target="_blank" rel="noreferrer">
      {`Oppfølgingsplan endret ${restdatoTildato(plan.tidspunkt)}`}
    </Link>
  );
}

export const TidligereOppfolgingsplaner = ({
  avbruttOppfolgingsplaner,
}: Props) => {
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
                <PdfLink plan={plan} />
              </div>
            ))}
          </Accordion.Content>
        </Accordion.Item>
      </Accordion>
    </SpacedDiv>
  );
};
