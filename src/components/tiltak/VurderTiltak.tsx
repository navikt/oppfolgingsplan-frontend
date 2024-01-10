import { useLagreTiltak } from "../../api/queries/oppfolgingsplan/tiltakQueries";
import { VurderTiltakForm } from "./VurderTiltakForm";
import { TiltakFormValues } from "./utils/typer";
import { formatAsLocalDateTime } from "../../utils/dateUtils";
import { TiltakDTO } from "../../schema/oppfolgingsplanSchema";

interface Props {
  tiltak: TiltakDTO;

  doneEditing(): void;
}

export const VurderTiltak = ({ tiltak, doneEditing }: Props) => {
  const lagreTiltak = useLagreTiltak();

  const tiltakInformasjon = (data: TiltakFormValues): TiltakDTO => {
    return {
      ...tiltak,
      tiltaknavn: data.overskrift,
      beskrivelse: data.beskrivelse,
      fom: data.fom ? formatAsLocalDateTime(data.fom) : null,
      tom: data.tom ? formatAsLocalDateTime(data.tom) : null,
      status: data.status,
      gjennomfoering: data.gjennomfoering,
      beskrivelseIkkeAktuelt: data.beskrivelseIkkeAktuelt,
    };
  };

  const createDefaultFormValues = (): TiltakFormValues | undefined => {
    if (tiltak.tiltaknavn && tiltak.beskrivelse) {
      return {
        overskrift: tiltak.tiltaknavn,
        beskrivelse: tiltak.beskrivelse,
        fom: tiltak.fom ? new Date(tiltak.fom) : null,
        tom: tiltak.tom ? new Date(tiltak.tom) : null,
        status: tiltak.status,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        gjennomfoering: tiltak.gjennomfoering!,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        beskrivelseIkkeAktuelt: tiltak.beskrivelseIkkeAktuelt!,
      };
    }
  };

  const tiltaknavn = createDefaultFormValues()?.overskrift;
  const beskrivelse = createDefaultFormValues()?.beskrivelse;

  return (
    <div className="mb-4">
      <VurderTiltakForm
        defaultFormValues={createDefaultFormValues()}
        isSubmitting={lagreTiltak.isPending}
        onSubmit={(data) => {
          if (tiltaknavn && beskrivelse) {
            data.overskrift = tiltaknavn;
            data.beskrivelse = beskrivelse;
          }

          lagreTiltak.mutateAsync(tiltakInformasjon(data)).then(() => {
            doneEditing();
          });
        }}
        onCancel={doneEditing}
      />
    </div>
  );
};
