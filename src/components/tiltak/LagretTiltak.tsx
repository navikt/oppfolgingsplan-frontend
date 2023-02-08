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
import { useLagreKommentar } from "api/queries/oppfolgingsplan/tiltakQueries";
import { EditerTiltak } from "./EditerTiltak";
import { SpacedDetail } from "../blocks/SpacedDetail";
import { SpacedPanel } from "components/blocks/wrappers/SpacedPanel";
import { Dialog } from "components/blocks/dialog/Dialog";
import { Row } from "components/blocks/wrappers/Row";
import { Tiltak } from "../../types/oppfolgingsplan";
import { useAudience } from "../../hooks/routeHooks";
import { VurderButton } from "../blocks/buttons/VurderButton";
import { VurderTiltak } from "./VurderTiltak";

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

interface Props {
  arbeidstakerFnr: string;
  innloggetFnr: string;
  tiltak: Tiltak;
  readonly?: boolean;
}

export const LagretTiltak = ({
  arbeidstakerFnr,
  innloggetFnr,
  tiltak,
  readonly = true,
}: Props) => {
  const [displayNyKommentar, setDisplayNyKommentar] = useState(false);
  const [editererTiltak, setEditererTiltak] = useState(false);
  const [vurdererTiltak, setVurdererTiltak] = useState(false);
  const lagreKommentar = useLagreKommentar();
  const { isAudienceSykmeldt } = useAudience();

  const tiltakId = tiltak.tiltakId;

  function isTiltakCreatedByInnloggetRole() {
    if (isAudienceSykmeldt) {
      return innloggetFnr === tiltak.opprettetAv.fnr;
    }

    return arbeidstakerFnr !== tiltak.opprettetAv.fnr;
  }

  function isVurdert() {
    return !!tiltak.gjennomfoering || !!tiltak.beskrivelseIkkeAktuelt;
  }

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

      {!readonly && isAudienceSykmeldt && !isVurdert() && (
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
            aktorFnr={innloggetFnr}
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

          {vurdererTiltak && (
            <VurderTiltak
              tiltak={tiltak}
              doneEditing={() => setVurdererTiltak(false)}
            />
          )}

          {!displayNyKommentar && !editererTiltak && !vurdererTiltak && (
            <Row marginTop={"2rem"}>
              {isTiltakCreatedByInnloggetRole() &&
                (!isAudienceSykmeldt || !isVurdert()) && (
                  <Button
                    variant={"tertiary"}
                    icon={<Edit aria-hidden />}
                    onClick={() => setEditererTiltak(true)}
                  >
                    Endre
                  </Button>
                )}

              <VurderButton
                show={!isAudienceSykmeldt && !isTiltakCreatedByInnloggetRole()}
                onClick={() => setVurdererTiltak(true)}
                text={isVurdert() ? "Endre vurdering" : "Gi din vurdering"}
              />

              <Button
                variant={"tertiary"}
                icon={<DialogDots aria-hidden />}
                onClick={() => setDisplayNyKommentar(true)}
              >
                Kommenter
              </Button>

              {isTiltakCreatedByInnloggetRole() && (
                <SlettTiltakButton tiltakId={tiltak.tiltakId} />
              )}
            </Row>
          )}
        </>
      )}
    </SpacedPanel>
  );
};
