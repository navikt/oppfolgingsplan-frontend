import { useLagreTiltakSM } from "api/queries/sykmeldt/tiltakQueriesSM";
import { TiltakFormValues, TiltakForm } from "./TiltakForm";
import { Tiltak } from "../../schema/oppfolgingsplanSchema";
import { STATUS_TILTAK } from "constants/konstanter";

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

  return (
    <TiltakForm
      defaultFormValues={{
        overskrift: tiltak.tiltaknavn,
        beskrivelse: tiltak.beskrivelse!!,
        fom: new Date(tiltak.fom!!),
        tom: new Date(tiltak.tom!!),
      }}
      onSubmit={(data) => {
        lagreTiltak.mutate(tiltakInformasjon(data));
        doneEditing();
      }}
      onCancel={doneEditing}
    />
  );
};
