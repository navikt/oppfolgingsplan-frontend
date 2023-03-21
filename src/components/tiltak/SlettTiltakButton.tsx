import { Button, Heading, Modal } from "@navikt/ds-react";
import { Delete } from "@navikt/ds-icons";
import React, { useState } from "react";
import styled from "styled-components";
import { useSlettTiltakSM } from "../../api/queries/oppfolgingsplan/tiltakQueries";
import { Row } from "../blocks/wrappers/Row";

const ModalContent = styled.div`
  padding: 2rem;
`;

const HeadingWithExtraSpacing = styled(Heading)`
  margin-bottom: 2rem;
`;

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
        <Modal.Content>
          <ModalContent>
            <HeadingWithExtraSpacing level="2" size="medium">
              Er du sikker på at du vil slette tiltaket?
            </HeadingWithExtraSpacing>

            <Row>
              <Button
                variant={"danger"}
                loading={slettTiltak.isLoading}
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
          </ModalContent>
        </Modal.Content>
      </Modal>

      <Button
        variant={"tertiary"}
        icon={<Delete aria-hidden />}
        onClick={() => setModalOpen(true)}
      >
        Slett
      </Button>
    </>
  );
};
