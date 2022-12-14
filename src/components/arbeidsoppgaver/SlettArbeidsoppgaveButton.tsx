import { useSlettOppgaveSM } from "api/queries/sykmeldt/oppgaveQueriesSM";
import { Delete } from "@navikt/ds-icons";
import { Button, Heading, Modal } from "@navikt/ds-react";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { texts } from "components/seplanen/texts";
import { Row } from "../blocks/wrappers/Row";
import { SpacedDiv } from "../blocks/wrappers/SpacedDiv";
import Feilmelding from "../blocks/error/Feilmelding";

const ModalContent = styled.div`
  padding: 2rem;
`;

const HeadingWithExtraSpacing = styled(Heading)`
  margin-bottom: 2rem;
`;

interface Props {
  show: boolean;
  arbeidsoppgaveId: number;
}

export const SlettArbeidsoppgaveButton = ({
  show,
  arbeidsoppgaveId,
}: Props) => {
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

            {slettArbeidsoppgave.isError && (
              <SpacedDiv>
                <Feilmelding
                  description={
                    "Vi klarte ikke å slette arbeidsoppgaven din. Vennligst prøv igjen senere."
                  }
                />
              </SpacedDiv>
            )}

            <Row>
              <Button
                loading={slettArbeidsoppgave.isLoading}
                variant={"danger"}
                onClick={() => {
                  slettArbeidsoppgave.mutateAsync(arbeidsoppgaveId).then(() => {
                    setModalOpen(false);
                  });
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
        icon={<Delete aria-hidden />}
        onClick={() => setModalOpen(true)}
      >
        {texts.arbeidsoppgaveList.buttons.slett}
      </Button>
    </>
  );
};
