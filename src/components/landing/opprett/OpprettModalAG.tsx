import React from "react";
import BaserTidligereSkjema from "../../../components/landing/opprett/BaserTidligereSkjema";
import { useOpprettOppfolgingsplanAG } from "../../../api/queries/arbeidsgiver/oppfolgingsplanerQueriesAG";
import { Modal } from "@navikt/ds-react";
import styled from "styled-components";

const FormContainer = styled.div`
  padding: 2rem;
`;

interface Props {
  visOpprettModal: boolean;

  setVisOpprettModal(vis: boolean): void;
}

const OpprettModalAG = ({ visOpprettModal, setVisOpprettModal }: Props) => {
  const opprettOppfolgingsplan = useOpprettOppfolgingsplanAG();

  return (
    <Modal
      open={visOpprettModal}
      aria-label="Opprett oppfølgingsplan"
      onClose={() => {
        setVisOpprettModal(false);
      }}
    >
      <FormContainer>
        <Modal.Content>
          <BaserTidligereSkjema
            isLoading={opprettOppfolgingsplan.isLoading}
            onSubmit={(kopierplan) =>
              opprettOppfolgingsplan.mutateAsync(kopierplan)
            }
            handleClose={() => setVisOpprettModal(false)}
          />
        </Modal.Content>
      </FormContainer>
    </Modal>
  );
};

export default OpprettModalAG;
