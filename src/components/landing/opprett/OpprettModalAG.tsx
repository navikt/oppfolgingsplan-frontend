import React from "react";
import BaserTidligereSkjema from "../../../components/landing/opprett/BaserTidligereSkjema";
import { useOpprettOppfolgingsplanAG } from "../../../api/queries/arbeidsgiver/oppfolgingsplanerQueriesAG";
import { Modal } from "@navikt/ds-react";

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
      header={{
        heading: "Ønsker du å basere den nye planen på den som gjaldt sist?",
      }}
    >
      <Modal.Body>
        <BaserTidligereSkjema
          isLoading={opprettOppfolgingsplan.isPending}
          onSubmit={(kopierplan) =>
            opprettOppfolgingsplan.mutateAsync(kopierplan)
          }
          handleClose={() => setVisOpprettModal(false)}
        />
      </Modal.Body>
    </Modal>
  );
};

export default OpprettModalAG;
