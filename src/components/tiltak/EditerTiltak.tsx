import { useLagreTiltakSM } from "api/queries/sykmeldt/tiltakQueriesSM";
import { TiltakForm, TiltakFormValues } from "./TiltakForm";
import { STATUS_TILTAK } from "constants/konstanter";
import { Tiltak } from "../../types/oppfolgingsplan";

interface Props {
  tiltak: Tiltak;

  doneEditing(): void;
}

export const EditerTiltak = ({ tiltak, doneEditing }: Props) => {
  const lagreTiltak = useLagreTiltakSM();

  const tiltakInformasjon = (data: TiltakFormValues): Tiltak => {
    return {
      ...tiltak,
      tiltaknavn: data.overskrift,
      beskrivelse: data.beskrivelse,
      fom: data.fom?.toJSON() ?? null,
      tom: data.tom?.toJSON() ?? null,
      status: STATUS_TILTAK.FORSLAG,
    };
  };

  const createDefaultFormValues = (): TiltakFormValues | undefined => {
    if (tiltak.tiltaknavn && tiltak.beskrivelse) {
      return {
        overskrift: tiltak.tiltaknavn,
        beskrivelse: tiltak.beskrivelse,
        fom: tiltak.fom ? new Date(tiltak.fom) : null,
        tom: tiltak.tom ? new Date(tiltak.tom) : null,
      };
    }
  };

  return (
    <TiltakForm
      defaultFormValues={createDefaultFormValues()}
      isSubmitting={lagreTiltak.isLoading}
      onSubmit={(data) => {
        lagreTiltak.mutateAsync(tiltakInformasjon(data)).then(() => {
          doneEditing();
        });
      }}
      onCancel={doneEditing}
    />
  );
};
