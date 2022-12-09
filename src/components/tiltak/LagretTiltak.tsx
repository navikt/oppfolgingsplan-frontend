import {
  Alert,
  BodyLong,
  BodyShort,
  Button,
  Heading,
  Label,
  Tag,
} from "@navikt/ds-react";
import { toDateMedMaanedNavn } from "utils/dateUtils";
import { STATUS_TILTAK } from "constants/konstanter";
import { NyKommentar } from "./NyKommentar";
import { DialogDots, Edit } from "@navikt/ds-icons";
import { SlettTiltakButton } from "./SlettTiltakButton";
import React, { ReactElement, useState } from "react";
import styled from "styled-components";
import { useLagreKommentarSM } from "api/queries/sykmeldt/tiltakQueriesSM";
import { EditerTiltak } from "./EditerTiltak";
import { Tiltak } from "../../schema/oppfolgingsplanSchema";
import { SpacedDetail } from "../blocks/SpacedDetail";
import { SpacedPanel } from "components/blocks/wrappers/SpacedPanel";
import { Dialog } from "components/blocks/dialog/Dialog";
import { Row } from "components/blocks/wrappers/Row";

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
  readonly?: Boolean;
}

export const LagretTiltak = ({
  arbeidstakerFnr,
  tiltak,
  readonly = true,
}: Props) => {
  const aktoerHarOpprettetElement =
    arbeidstakerFnr === (tiltak.opprettetAv && tiltak.opprettetAv.fnr);
  const [displayNyKommentar, setDisplayNyKommentar] = useState(false);
  const [editererTiltak, setEditererTiltak] = useState(false);
  const lagreKommentar = useLagreKommentarSM();
  const tiltakId = tiltak.tiltakId;

  return (
    <SpacedPanel border={true}>
      <HeadingWithLabel>
        {createStatusLabel(tiltak.status)}
        <Heading size={"medium"} level={"4"}>
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

      {!readonly && manglerVurderingFraLeder(arbeidstakerFnr, tiltak) && (
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

      {!readonly && (
        <>
          <Dialog
            tiltakId={tiltak.tiltakId}
            kommentarer={tiltak.kommentarer}
            aktorFnr={arbeidstakerFnr}
          />

          {displayNyKommentar && (
            <NyKommentar
              isLoading={lagreKommentar.isLoading}
              lagre={(kommentar: string) => {
                lagreKommentar
                  .mutateAsync({
                    tiltakId: tiltakId,
                    kommentar: { tekst: kommentar },
                  })
                  .then(() => {
                    setDisplayNyKommentar(false);
                  });
              }}
              avbryt={() => setDisplayNyKommentar(false)}
            />
          )}

          {editererTiltak && (
            <EditerTiltak
              tiltak={tiltak}
              doneEditing={() => setEditererTiltak(false)}
            />
          )}

          {!displayNyKommentar && !editererTiltak && (
            <Row>
              {aktoerHarOpprettetElement && (
                <Button
                  variant={"tertiary"}
                  icon={<Edit aria-hidden />}
                  onClick={() => setEditererTiltak(true)}
                >
                  Endre
                </Button>
              )}
              {aktoerHarOpprettetElement && (
                <SlettTiltakButton tiltakId={tiltak.tiltakId} />
              )}
              <Button
                variant={"tertiary"}
                icon={<DialogDots aria-hidden />}
                onClick={() => setDisplayNyKommentar(true)}
              >
                Kommenter
              </Button>
            </Row>
          )}
        </>
      )}
    </SpacedPanel>
  );
};
