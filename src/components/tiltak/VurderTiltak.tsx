import { useLagreTiltak } from "api/queries/oppfolgingsplan/tiltakQueries";
import { Tiltak } from "../../types/oppfolgingsplan";
import { VurderTiltakForm } from "./VurderTiltakForm";
import styled from "styled-components";
import {TiltakFormValues} from "./utils/typer";

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
      fom: data.fom?.toJSON() ?? null,
      tom: data.tom?.toJSON() ?? null,
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
        gjennomfoering: tiltak.gjennomfoering!,
        beskrivelseIkkeAktuelt: tiltak.beskrivelseIkkeAktuelt!,
      };
    }
  };

  return (
    <VurderTiltakFormWrapper>
      <VurderTiltakForm
        defaultFormValues={createDefaultFormValues()}
        isSubmitting={lagreTiltak.isLoading}
        onSubmit={(data) => {
          lagreTiltak.mutateAsync(tiltakInformasjon(data)).then(() => {
            doneEditing();
          });
        }}
        onCancel={doneEditing}
      />
    </VurderTiltakFormWrapper>
  );
};
