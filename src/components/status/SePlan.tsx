import { FileContent } from "@navikt/ds-icons";
import { Button, Modal } from "@navikt/ds-react";
import { useState } from "react";
import styled from "styled-components";
import { OppfolgingsplanOversikt } from "../seplanen/OppfolgingsplanOversikt";
import { Oppfolgingsplan } from "../../types/oppfolgingsplan";

interface Props {
  oppfolgingsplan: Oppfolgingsplan;
}

const ModalContentContainer = styled.div`
  width: 40rem;
`;

export const SePlan = ({ oppfolgingsplan }: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        icon={<FileContent aria-hidden />}
        variant="tertiary"
        onClick={() => setOpen(true)}
      >
        Se planen
      </Button>
      <Modal
        open={open}
        aria-label="Oppfolgingsplan oversikt"
        onClose={() => setOpen((x) => !x)}
      >
        <Modal.Content>
          <ModalContentContainer>
            <OppfolgingsplanOversikt oppfolgingsplan={oppfolgingsplan} />
          </ModalContentContainer>
        </Modal.Content>
      </Modal>
    </>
  );
};
