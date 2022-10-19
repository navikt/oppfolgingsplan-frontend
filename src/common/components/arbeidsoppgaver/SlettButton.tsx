import { useSlettOppgaveSM } from "@/common/api/queries/sykmeldt/oppgaveQueriesSM";
import { texts } from "@/common/components/oversikt/texts";
import { Delete } from "@navikt/ds-icons";
import { Button, Heading, Modal } from "@navikt/ds-react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { Row } from "../wrappers/Row";

const ModalContent = styled.div`
  padding: 2rem;
`;

const HeadingWithExtraSpacing = styled(Heading)`
  margin-bottom: 2rem;
`;

interface Props {
  show: Boolean;
  arbeidsoppgaveId: number;
}

export const SlettButton = ({ show, arbeidsoppgaveId }: Props) => {
  const [modalOpen, setModalOpen] = useState(false);
  const slettArbeidsoppgave = useSlettOppgaveSM();

  useEffect(() => {
    if (Modal.setAppElement) {
      Modal.setAppElement("#__next");
    }
  }, []);

  if (!show) {
    return null;
  }

  return (
    <>
      <Modal
        open={modalOpen}
        aria-label={texts.arbeidsoppgaveList.sletting.bekreftSletting}
        onClose={() => setModalOpen((x) => !x)}
      >
        <Modal.Content>
          <ModalContent>
            <HeadingWithExtraSpacing level="2" size="medium">
              {texts.arbeidsoppgaveList.sletting.erDuSikker}
            </HeadingWithExtraSpacing>

            <Row>
              <Button
                variant={"danger"}
                onClick={() => {
                  slettArbeidsoppgave(arbeidsoppgaveId);
                  setModalOpen(false);
                }}
              >
                {texts.arbeidsoppgaveList.buttons.slett}
              </Button>
              <Button variant={"tertiary"} onClick={() => setModalOpen(false)}>
                {texts.arbeidsoppgaveList.buttons.avbryt}
              </Button>
            </Row>
          </ModalContent>
        </Modal.Content>
      </Modal>

      <Button
        variant={"tertiary"}
        icon={<Delete />}
        onClick={() => setModalOpen(true)}
      >
        {texts.arbeidsoppgaveList.buttons.slett}
      </Button>
    </>
  );
};
