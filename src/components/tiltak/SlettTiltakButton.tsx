import { Button, Heading, Modal } from "@navikt/ds-react";
import { TrashIcon } from "@navikt/aksel-icons";
import React, { useState } from "react";
import { useSlettTiltakSM } from "../../api/queries/oppfolgingsplan/tiltakQueries";
import { Row } from "../blocks/wrappers/Row";

interface Props {
  tiltakId: number;
}

export const SlettTiltakButton = ({ tiltakId }: Props) => {
  const [modelOpen, setModalOpen] = useState(false);
  const slettTiltak = useSlettTiltakSM();

  return (
    <>
      <Modal
        open={modelOpen}
        aria-label="Bekreft sletting av tiltak"
        onClose={() => setModalOpen((x) => !x)}
      >
        <Modal.Body>
          <div className="p-8">
            <Heading level="2" size="medium" className="mb-8">
              Er du sikker på at du vil slette tiltaket?
            </Heading>

            <Row>
              <Button
                variant={"danger"}
                loading={slettTiltak.isPending}
                onClick={() => {
                  slettTiltak.mutateAsync(tiltakId).then(() => {
                    setModalOpen(false);
                  });
                }}
              >
                Slett
              </Button>
              <Button variant={"tertiary"} onClick={() => setModalOpen(false)}>
                Avbryt
              </Button>
            </Row>
          </div>
        </Modal.Body>
      </Modal>

      <Button
        variant={"tertiary"}
        icon={<TrashIcon aria-hidden />}
        onClick={() => setModalOpen(true)}
      >
        Slett
      </Button>
    </>
  );
};
