import { FileSearchIcon } from "@navikt/aksel-icons";
import { Button, Heading, Modal } from "@navikt/ds-react";
import { useState } from "react";
import { OppfolgingsplanOversikt } from "../seplanen/OppfolgingsplanOversikt";
import { texts } from "../seplanen/texts";
import { OppfolgingsplanDTO } from "../../schema/oppfolgingsplanSchema";

interface Props {
  oppfolgingsplan: OppfolgingsplanDTO;
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
        <Modal.Header>
          <Heading level="2" size="large">
            {texts.oppfolgingsplanOversikt.title}
          </Heading>
        </Modal.Header>
        <Modal.Body>
          <OppfolgingsplanOversikt
            oppfolgingsplan={oppfolgingsplan}
            hideHeading={true}
          />
        </Modal.Body>
      </Modal>
    </>
  );
};
