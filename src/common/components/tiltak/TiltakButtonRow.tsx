import { Button } from "@navikt/ds-react";
import { DialogDots, Edit } from "@navikt/ds-icons";
import { SlettTiltakButton } from "@/common/components/tiltak/SlettTiltakButton";
import React from "react";
import { ButtonRow } from "@/common/components/wrappers/ButtonRow";

interface Props {
  oppfolgingsplanId: number;
  tiltakId: number;
  aktoerHarOpprettetElement: boolean;
}

export const TiltakButtonRow = ({
  oppfolgingsplanId,
  tiltakId,
  aktoerHarOpprettetElement,
}: Props) => {
  return (
    <ButtonRow>
      {aktoerHarOpprettetElement && (
        <Button variant={"tertiary"} icon={<Edit />}>
          Endre
        </Button>
      )}
      {aktoerHarOpprettetElement && (
        <SlettTiltakButton
          oppfolgingsplanId={oppfolgingsplanId}
          tiltakId={tiltakId}
        />
      )}
      <Button variant={"tertiary"} icon={<DialogDots />}>
        Kommenter
      </Button>
    </ButtonRow>
  );
};
