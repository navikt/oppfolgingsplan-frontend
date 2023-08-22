import { FileSearchIcon } from "@navikt/aksel-icons";
import { Button, Modal } from "@navikt/ds-react";
import { useState } from "react";
import { OppfolgingsplanOversikt } from "../seplanen/OppfolgingsplanOversikt";
import { Oppfolgingsplan } from "../../types/oppfolgingsplan";

interface Props {
  oppfolgingsplan: Oppfolgingsplan;
}

export const SePlan = ({ oppfolgingsplan }: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        icon={<FileSearchIcon aria-hidden />}
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
        <Modal.Body>
          <OppfolgingsplanOversikt oppfolgingsplan={oppfolgingsplan} />
        </Modal.Body>
      </Modal>
    </>
  );
};
