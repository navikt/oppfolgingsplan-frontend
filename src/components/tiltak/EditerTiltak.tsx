import { useLagreTiltak } from "api/queries/oppfolgingsplan/tiltakQueries";
import { TiltakFormSM, TiltakFormValues } from "./TiltakFormSM";
import { Tiltak } from "../../types/oppfolgingsplan";
import { useAudience } from "../../hooks/routeHooks";
import { TiltakFormAG } from "./TiltakFormAG";

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
      fom: data.fom?.toJSON() ?? null,
      tom: data.tom?.toJSON() ?? null,
      status: data.status,
      gjennomfoering: data.gjennomfoering,
      beskrivelseIkkeAktuelt: data.beskrivelseIkkeAktuelt,
    };
  };

  return (
    <>
      {isAudienceSykmeldt && (
        <TiltakFormSM
          defaultFormValues={{
            overskrift: tiltak.tiltaknavn,
            beskrivelse: tiltak.beskrivelse!,
            fom: new Date(tiltak.fom!),
            tom: new Date(tiltak.tom!),
            status: tiltak.status,
            gjennomfoering: tiltak.gjennomfoering!,
            beskrivelseIkkeAktuelt: tiltak.beskrivelseIkkeAktuelt!,
          }}
          isSubmitting={lagreTiltak.isLoading}
          onSubmit={(data) => {
            lagreTiltak.mutateAsync(tiltakInformasjon(data)).then(() => {
              doneEditing();
            });
          }}
          onCancel={doneEditing}
        />
      )}

      {!isAudienceSykmeldt && (
        <TiltakFormAG
          defaultFormValues={{
            overskrift: tiltak.tiltaknavn,
            beskrivelse: tiltak.beskrivelse!,
            fom: new Date(tiltak.fom!),
            tom: new Date(tiltak.tom!),
            status: tiltak.status,
            gjennomfoering: tiltak.gjennomfoering!,
            beskrivelseIkkeAktuelt: tiltak.beskrivelseIkkeAktuelt!,
          }}
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
