import { BodyLong, Button, Heading, Modal } from "@navikt/ds-react";
import { useState } from "react";
import styled from "styled-components";
import { Oppfolgingsplan } from "../../../../schema/oppfolgingsplanSchema";
import { OppfolgingsplanOversikt } from "@/common/components/oversikt/OppfolgingsplanOversikt";

interface Props {
  oppfolgingsplan: Oppfolgingsplan;
}

const ModalContentContainer = styled.div`
  width: 40rem;
`;

export const SePlan = ({ oppfolgingsplan }: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <span>
      <Button variant="tertiary" onClick={() => setOpen(true)}>
        Se plan
      </Button>
      <Modal
        open={open}
        aria-label="Modal demo"
        onClose={() => setOpen((x) => !x)}
        aria-labelledby="modal-heading"
      >
        <Modal.Content>
          <ModalContentContainer>
            <OppfolgingsplanOversikt oppfolgingsplan={oppfolgingsplan} />
          </ModalContentContainer>
        </Modal.Content>
      </Modal>
    </span>
  );
};
