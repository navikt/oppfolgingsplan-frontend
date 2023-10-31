import { TrashIcon } from "@navikt/aksel-icons";
import { Button, Modal } from "@navikt/ds-react";
import React, { useState } from "react";
import { texts } from "../seplanen/texts";
import { Row } from "../blocks/wrappers/Row";
import { SpacedDiv } from "../blocks/wrappers/SpacedDiv";
import Feilmelding from "../blocks/error/Feilmelding";
import { useSlettArbeidsoppgave } from "../../api/queries/oppfolgingsplan/arbeidsoppgaveQueries";

interface Props {
  show: boolean;
  arbeidsoppgaveId: number;
}

export const SlettArbeidsoppgaveButton = ({
  show,
  arbeidsoppgaveId,
}: Props) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const slettArbeidsoppgave = useSlettArbeidsoppgave();
  if (!show) {
    return null;
  }

  return (
    <>
      <Modal
        open={modalOpen}
        aria-label={texts.arbeidsoppgaveList.sletting.bekreftSletting}
        onClose={() => setModalOpen(false)}
        header={{
          heading: texts.arbeidsoppgaveList.sletting.erDuSikker,
        }}
      >
        <Modal.Body>
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
        </Modal.Body>
      </Modal>

      <Button
        variant={"tertiary"}
        icon={<TrashIcon aria-hidden />}
        onClick={() => setModalOpen(true)}
      >
        {texts.arbeidsoppgaveList.buttons.slett}
      </Button>
    </>
  );
};
