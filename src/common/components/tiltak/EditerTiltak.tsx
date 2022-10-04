import { useLagreTiltakSM } from "@/common/api/queries/sykmeldt/tiltakQueriesSM";
import { FormValues, TiltakForm } from "@/common/components/tiltak/TiltakForm";
import { Tiltak } from "../../../schema/oppfolgingsplanSchema";

interface Props {
  oppfolgingsplanId: number;
  tiltak: Tiltak;

  doneEditing(): void;
}

export const EditerTiltak = ({
  oppfolgingsplanId,
  tiltak,
  doneEditing,
}: Props) => {
  const lagreTiltak = useLagreTiltakSM();

  const tiltakInformasjon = (data: FormValues): Tiltak => {
    return {
      ...tiltak,
      tiltaknavn: data.overskrift,
      beskrivelse: data.beskrivelse,
      fom: data.fom?.toJSON() ?? null,
      tom: data.tom?.toJSON() ?? null,
    };
  };

  return (
    <TiltakForm
        defaultFormValues={
          {
            overskrift: tiltak.tiltaknavn,
            beskrivelse: tiltak.beskrivelse!!,
            fom: new Date(tiltak.fom!!),
            tom: new Date(tiltak.tom!!),
          }
        }
      onSubmit={(data) => {
        lagreTiltak.mutate({
          oppfolgingsplanId: oppfolgingsplanId,
          tiltak: tiltakInformasjon(data),
        });
        doneEditing();
      }}
      onCancel={doneEditing}
    />
  );
};
