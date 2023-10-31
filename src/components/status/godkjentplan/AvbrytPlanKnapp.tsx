import { PencilIcon } from "@navikt/aksel-icons";
import { BodyLong, Button, Heading, Modal } from "@navikt/ds-react";
import { useState } from "react";
import { useAvbrytOppfolgingsplan } from "../../../api/queries/oppfolgingsplan/oppfolgingsplanQueries";

interface Props {
  oppfolgingsplanId: number;
}

export const AvbrytPlanKnapp = ({ oppfolgingsplanId }: Props) => {
  const [visBekreftelse, setVisBekreftelse] = useState(false);
  const avbrytDialog = useAvbrytOppfolgingsplan();

  return (
    <>
      <Button
        onClick={() => setVisBekreftelse(true)}
        icon={<PencilIcon aria-hidden />}
        variant="tertiary"
      >
        Gjør endringer
      </Button>
      <Modal
        open={visBekreftelse}
        aria-label="Er du sikker?"
        onClose={() => setVisBekreftelse(false)}
      >
        <Modal.Header>
          <Heading size={"medium"} level={"3"} spacing>
            Ønsker du å endre planen?
          </Heading>
        </Modal.Header>

        <Modal.Body>
          <BodyLong spacing>
            Hvis du endrer planen, må du sende den til godkjenning hos den
            andre. Etter godkjenning blir den en gjeldende plan.
          </BodyLong>
          <Button
            variant={"danger"}
            loading={avbrytDialog.isLoading}
            onClick={() => {
              avbrytDialog.mutateAsync(oppfolgingsplanId);
            }}
          >
            Gjør endringer
          </Button>
        </Modal.Body>
      </Modal>
    </>
  );
};
