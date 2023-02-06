import { useLagreTiltak } from "api/queries/oppfolgingsplan/tiltakQueries";
import { TiltakFormSM } from "./TiltakFormSM";
import { Tiltak } from "../../types/oppfolgingsplan";
import { useAudience } from "../../hooks/routeHooks";
import { TiltakFormAG } from "./TiltakFormAG";
import { STATUS_TILTAK } from "../../constants/konstanter";
import { TiltakFormValues } from "./utils/typer";
import { formatAsLocalDateTime } from "../../utils/dateUtils";

interface Props {
  tiltak: Tiltak;

  doneEditing(): void;
}

export const EditerTiltak = ({ tiltak, doneEditing }: Props) => {
  const lagreTiltak = useLagreTiltak();
  const { isAudienceSykmeldt } = useAudience();

  const tiltakInformasjon = (data: TiltakFormValues): Tiltak => {
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

  return (
    <>
      {isAudienceSykmeldt ? (
        <TiltakFormSM
          defaultFormValues={createDefaultFormValues()}
          isSubmitting={lagreTiltak.isLoading}
          onSubmit={(data) => {
            data.status = STATUS_TILTAK.FORSLAG;
            lagreTiltak.mutateAsync(tiltakInformasjon(data)).then(() => {
              doneEditing();
            });
          }}
          onCancel={doneEditing}
        />
      ) : (
        <TiltakFormAG
          defaultFormValues={createDefaultFormValues()}
          isSubmitting={lagreTiltak.isLoading}
          onSubmit={(data) => {
            lagreTiltak.mutateAsync(tiltakInformasjon(data)).then(() => {
              doneEditing();
            });
          }}
          onCancel={doneEditing}
        />
      )}
    </>
  );
};
