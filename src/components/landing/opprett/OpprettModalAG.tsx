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
    >
      <div className="p-8">
        <Modal.Content>
          <BaserTidligereSkjema
            isLoading={opprettOppfolgingsplan.isLoading}
            onSubmit={(kopierplan) =>
              opprettOppfolgingsplan.mutateAsync(kopierplan)
            }
            handleClose={() => setVisOpprettModal(false)}
          />
        </Modal.Content>
      </div>
    </Modal>
  );
};

export default OpprettModalAG;
