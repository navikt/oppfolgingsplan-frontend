import { Button } from "@navikt/ds-react";
import { useState } from "react";
import { useLagreTiltakSM } from "api/queries/sykmeldt/tiltakQueriesSM";
import { TiltakForm, TiltakFormValues } from "./TiltakForm";
import { TiltakFormHeading } from "./TiltakFormHeading";
import { Tiltak } from "../../schema/oppfolgingsplanSchema";
import { STATUS_TILTAK } from "constants/konstanter";
import { SpacedPanel } from "components/blocks/wrappers/SpacedPanel";
import PlusIcon from "components/blocks/icons/PlusIcon";

export const NyttTiltak = () => {
  const lagreTiltak = useLagreTiltakSM();
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
        onSubmit={(data) => {
          lagreTiltak.mutate(nyttTiltakInformasjon(data));
          setLeggerTilNyttTiltak(false);
        }}
        onCancel={() => setLeggerTilNyttTiltak(false)}
      />
    </SpacedPanel>
  );
};
