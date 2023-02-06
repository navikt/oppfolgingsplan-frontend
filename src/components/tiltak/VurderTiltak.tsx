import { useLagreTiltak } from "api/queries/oppfolgingsplan/tiltakQueries";
import { Tiltak } from "../../types/oppfolgingsplan";
import { VurderTiltakForm } from "./VurderTiltakForm";
import styled from "styled-components";
import { TiltakFormValues } from "./utils/typer";
import { formatISO } from "date-fns";

interface Props {
  tiltak: Tiltak;

  doneEditing(): void;
}

const VurderTiltakFormWrapper = styled.div`
  margin-bottom: 1rem;
`;

export const VurderTiltak = ({ tiltak, doneEditing }: Props) => {
  const lagreTiltak = useLagreTiltak();

  const tiltakInformasjon = (data: TiltakFormValues): Tiltak => {
    return {
      ...tiltak,
      tiltaknavn: data.overskrift,
      beskrivelse: data.beskrivelse,
      fom: data.fom ? formatISO(data.fom) : null,
      tom: data.tom ? formatISO(data.tom) : null,
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
    <VurderTiltakFormWrapper>
      <VurderTiltakForm
        defaultFormValues={createDefaultFormValues()}
        isSubmitting={lagreTiltak.isLoading}
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
    </VurderTiltakFormWrapper>
  );
};
