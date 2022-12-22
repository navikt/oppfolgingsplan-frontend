import { Modal } from "@navikt/ds-react";
import React, { ReactElement, useEffect } from "react";
import styled from "styled-components";

const FormContainer = styled.div`
  padding: 2rem;
`;

interface Props {
  modalContent: ReactElement;
  visOpprettModal: boolean;

  setVisOpprettModal(vis: boolean): void;
}

const OpprettModal = ({
  visOpprettModal,
  setVisOpprettModal,
  modalContent,
}: Props) => {
  useEffect(() => {
    if (Modal.setAppElement) {
      Modal.setAppElement("#__next");
    }
  }, []);

  return (
    <Modal
      open={visOpprettModal}
      aria-label="Opprett oppfølgingsplan"
      onClose={() => {
        setVisOpprettModal(false);
      }}
    >
      <FormContainer>
        <Modal.Content>{modalContent}</Modal.Content>
      </FormContainer>
    </Modal>
  );
};

export default OpprettModal;
