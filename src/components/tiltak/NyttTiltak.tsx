import { Button } from "@navikt/ds-react";
import { useState } from "react";
import { useLagreTiltak } from "api/queries/oppfolgingsplan/tiltakQueries";
import { TiltakForm, TiltakFormValues } from "./TiltakForm";
import { TiltakFormHeading } from "./TiltakFormHeading";
import { STATUS_TILTAK } from "constants/konstanter";
import { SpacedPanel } from "components/blocks/wrappers/SpacedPanel";
import PlusIcon from "components/blocks/icons/PlusIcon";
import { Tiltak } from "../../types/oppfolgingsplan";

export const NyttTiltak = () => {
  const lagreTiltak = useLagreTiltak();
  const [leggerTilNyttTiltak, setLeggerTilNyttTiltak] = useState(false);

  const nyttTiltakInformasjon = (data: TiltakFormValues): Partial<Tiltak> => {
    return {
      tiltaknavn: data.overskrift,
      beskrivelse: data.beskrivelse,
      fom: data.fom?.toJSON(),
      tom: data.tom?.toJSON(),
      status: STATUS_TILTAK.FORSLAG,
    };
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
        isSubmitting={lagreTiltak.isLoading}
        onSubmit={(data) => {
          lagreTiltak.mutateAsync(nyttTiltakInformasjon(data)).then(() => {
            setLeggerTilNyttTiltak(false);
          });
        }}
        onCancel={() => setLeggerTilNyttTiltak(false)}
      />
    </SpacedPanel>
  );
};
