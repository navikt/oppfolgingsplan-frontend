import { useAvbrytOppfolgingsplanSM } from "@/common/api/queries/sykmeldt/oppfolgingsplanerQueriesSM";
import { Edit } from "@navikt/ds-icons";
import { BodyLong, Button, Heading, Modal } from "@navikt/ds-react";
import { useState } from "react";

interface Props {
  oppfolgingsplanId: number;
}

export const AvbrytPlanKnapp = ({ oppfolgingsplanId }: Props) => {
  const [visBekreftelse, setVisBekreftelse] = useState(false);
  const avbrytDialog = useAvbrytOppfolgingsplanSM();

  return (
    <>
      <Button
        onClick={() => setVisBekreftelse(true)}
        icon={<Edit />}
        variant="tertiary"
      >
        Gjør endringer
      </Button>
      <Modal
        open={visBekreftelse}
        aria-label="Er du sikker?"
        onClose={() => setVisBekreftelse(false)}
        aria-labelledby="modal-heading"
      >
        <Modal.Content>
          <Heading size={"medium"} level={"3"} spacing>
            Ønsker du å endre planen?
          </Heading>
          <BodyLong spacing>
            Hvis du endrer planen, må du sende den til godkjenning hos den
            andre. Etter godkjenning blir den en gjeldende plan.
          </BodyLong>
          <Button
            variant={"danger"}
            onClick={() => {
              avbrytDialog(oppfolgingsplanId);
            }}
          >
            Gjør endringer
          </Button>
        </Modal.Content>
      </Modal>
    </>
  );
};
