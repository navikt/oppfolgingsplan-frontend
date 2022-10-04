import {
  Alert,
  BodyLong,
  BodyShort,
  Button,
  Detail,
  Heading,
  Label,
  Tag,
} from "@navikt/ds-react";
import { toDateMedMaanedNavn } from "@/common/utils/dateUtils";
import { STATUS_TILTAK } from "@/common/konstanter";
import { Dialog } from "@/common/components/dialog/Dialog";
import { NyKommentar } from "@/common/components/tiltak/NyKommentar";
import { ButtonRow } from "@/common/components/wrappers/ButtonRow";
import { DialogDots, Edit } from "@navikt/ds-icons";
import { SlettTiltakButton } from "@/common/components/tiltak/SlettTiltakButton";
import React, { ReactElement, useState } from "react";
import styled from "styled-components";
import { useLagreKommentarSM } from "@/common/api/queries/sykmeldt/tiltakQueriesSM";
import { EditerTiltak } from "@/common/components/tiltak/EditerTiltak";
import { Tiltak } from "../../../schema/oppfolgingsplanSchema";
import {SpacedPanel} from "@/common/components/wrappers/SpacedPanel";

const createStatusLabel = (statusText?: string | null): ReactElement | null => {
  switch (statusText) {
    case STATUS_TILTAK.FORSLAG:
      return (
        <Tag variant="warning" size="small">
          Foreslått
        </Tag>
      );
    case STATUS_TILTAK.AVBRUTT:
      return (
        <Tag variant="info" size="small">
          Avbrutt
        </Tag>
      );
    case STATUS_TILTAK.IKKE_AKTUELT:
      return (
        <Tag variant="error" size="small">
          Ikke aktuelt
        </Tag>
      );
    case STATUS_TILTAK.AVTALT:
      return (
        <Tag variant="success" size="small">
          Avtalt
        </Tag>
      );
  }
  return null;
};

const HeadingWithLabel = styled.div`
  display: flex;
  gap: 1rem;
  flex-direction: row;
  margin-bottom: 1rem;
`;

export const SpacedAlert = styled(Alert)`
  margin-bottom: 1rem;
`;

export const SpacedDetail = styled(Detail)`
  margin-bottom: 1rem;
`;

const manglerVurderingFraLeder = (fnr: string, tiltak: Tiltak) => {
  return (
    tiltak &&
    !tiltak.gjennomfoering &&
    !tiltak.beskrivelseIkkeAktuelt &&
    fnr === (tiltak.opprettetAv && tiltak.opprettetAv.fnr) &&
    tiltak.sistEndretAv.fnr === fnr
  );
};

interface Props {
  arbeidstakerFnr: string;
  tiltak: Tiltak;
  oppfolgingsplanId: number;
}

export const LagretTiltak = ({
  arbeidstakerFnr,
  tiltak,
  oppfolgingsplanId,
}: Props) => {
  const aktoerHarOpprettetElement =
    arbeidstakerFnr === (tiltak.opprettetAv && tiltak.opprettetAv.fnr);
  const [displayNyKommentar, setDisplayNyKommentar] = useState(false);
  const [editererTiltak, setEditererTiltak] = useState(false);
  const lagreKommentarMutation = useLagreKommentarSM();
  const fnr = arbeidstakerFnr;
  const tiltakId = tiltak.tiltakId;

  return (
    <SpacedPanel border={true}>
      <HeadingWithLabel>
        {createStatusLabel(tiltak.status)}
        <Heading size={"medium"} level={"3"}>
          {tiltak.tiltaknavn}
        </Heading>
      </HeadingWithLabel>

      {tiltak.fom && tiltak.tom && (
        <BodyShort spacing={true}>
          {toDateMedMaanedNavn(tiltak.fom)} - {toDateMedMaanedNavn(tiltak.tom)}
        </BodyShort>
      )}

      <Label>Beskrivelse</Label>
      <BodyLong spacing={true}>{tiltak.beskrivelse}</BodyLong>

      {tiltak.status == "IKKE_AKTUELT" && tiltak.beskrivelseIkkeAktuelt && (
        <>
          <Label>Arbeidsgivers vurdering</Label>
          <BodyLong spacing={true}>{tiltak.beskrivelseIkkeAktuelt}</BodyLong>
        </>
      )}

      {manglerVurderingFraLeder(arbeidstakerFnr, tiltak) && (
        <SpacedAlert variant={"warning"}>
          Dette tiltaket mangler vurdering fra lederen din
        </SpacedAlert>
      )}

      {tiltak.gjennomfoering && tiltak.status === STATUS_TILTAK.AVTALT && (
        <>
          <Label>Oppfølging og gjennomføring</Label>
          <BodyLong spacing={true}>{tiltak.gjennomfoering}</BodyLong>
        </>
      )}

      <SpacedDetail>{`Foreslått av ${tiltak.opprettetAv.navn}`}</SpacedDetail>

      <Dialog
        tiltakId={tiltak.tiltakId}
        kommentarer={tiltak.kommentarer}
        aktorFnr={arbeidstakerFnr}
      />

      {/*Todo: Finn ut hvorfor den må reassigne tiltakid og fnr*/}
      {displayNyKommentar && (
        <NyKommentar
          lagre={(kommentar: string) => {
            lagreKommentarMutation.mutate({
              oppfolgingsplanId,
              tiltakId,
              fnr,
              kommentar,
            });
            setDisplayNyKommentar(false);
          }}
          avbryt={() => setDisplayNyKommentar(false)}
        />
      )}

      {editererTiltak && <EditerTiltak
          oppfolgingsplanId={oppfolgingsplanId}
          tiltak={tiltak}
          doneEditing={() => setEditererTiltak(false)}
      />}

      {!displayNyKommentar && !editererTiltak && (
        <ButtonRow>
          {aktoerHarOpprettetElement && (
            <Button
              variant={"tertiary"}
              icon={<Edit />}
              onClick={() => setEditererTiltak(true)}
            >
              Endre
            </Button>
          )}
          {aktoerHarOpprettetElement && (
            <SlettTiltakButton
              oppfolgingsplanId={oppfolgingsplanId}
              tiltakId={tiltak.tiltakId}
            />
          )}
          <Button
            variant={"tertiary"}
            icon={<DialogDots />}
            onClick={() => setDisplayNyKommentar(true)}
          >
            Kommenter
          </Button>
        </ButtonRow>
      )}
    </SpacedPanel>
  );
};
