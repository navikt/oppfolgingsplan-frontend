import { Button } from "@navikt/ds-react";
import PlusIcon from "@/common/components/icons/PlusIcon";
import { useState } from "react";
import { useLagreTiltakSM } from "@/common/api/queries/sykmeldt/tiltakQueriesSM";
import {
  TiltakForm,
  TiltakFormValues,
} from "@/common/components/tiltak/TiltakForm";
import { TiltakFormHeading } from "@/common/components/tiltak/TiltakFormHeading";
import { Tiltak } from "../../../schema/oppfolgingsplanSchema";
import { SpacedPanel } from "@/common/components/wrappers/SpacedPanel";

interface Props {
  oppfolgingsplanId: number;
}

export const NyttTiltak = ({ oppfolgingsplanId }: Props) => {
  const lagreTiltak = useLagreTiltakSM();
  const [leggerTilNyttTiltak, setLeggerTilNyttTiltak] = useState(false);

  const nyttTiltakInformasjon = (data: TiltakFormValues): Partial<Tiltak> => {
    return {
      tiltaknavn: data.overskrift,
      beskrivelse: data.beskrivelse,
      fom: data.fom?.toJSON(),
      tom: data.tom?.toJSON(),
    };
  };

  const resetStateAndClose = () => {
    setLeggerTilNyttTiltak(false);
  };

  if (!leggerTilNyttTiltak) {
    return (
      <SpacedPanel border={true}>
        <TiltakFormHeading />

        {!leggerTilNyttTiltak && (
          <Button
            variant={"secondary"}
            icon={<PlusIcon />}
            onClick={() => setLeggerTilNyttTiltak(true)}
          >
            Legg til et nytt tiltak
          </Button>
        )}
      </SpacedPanel>
    );
  }

  return (
    <SpacedPanel border={true}>
      <TiltakFormHeading />
      <TiltakForm
        onSubmit={(data) => {
          lagreTiltak.mutate({
            oppfolgingsplanId: oppfolgingsplanId,
            tiltak: nyttTiltakInformasjon(data),
          });
          resetStateAndClose();
        }}
        onCancel={resetStateAndClose}
      />
    </SpacedPanel>
  );
};
