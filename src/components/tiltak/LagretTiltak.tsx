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
import { toDateMedMaanedNavn } from "../../utils/dateUtils";
import { STATUS_TILTAK } from "../../constants/konstanter";
import { NyKommentar } from "./NyKommentar";
import { SlettTiltakButton } from "./SlettTiltakButton";
import React, { ReactElement, useState } from "react";
import { useLagreKommentar } from "../../api/queries/oppfolgingsplan/tiltakQueries";
import { EditerTiltak } from "./EditerTiltak";
import { SpacedPanel } from "../blocks/wrappers/SpacedPanel";
import { Dialog } from "../blocks/dialog/Dialog";
import { Row } from "../blocks/wrappers/Row";
import { useAudience } from "../../hooks/routeHooks";
import { VurderButton } from "../blocks/buttons/VurderButton";
import { VurderTiltak } from "./VurderTiltak";
import { Chat2Icon, PencilIcon } from "@navikt/aksel-icons";
import { TiltakDTO } from "../../schema/oppfolgingsplanSchema";

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

interface Props {
  arbeidstakerFnr: string;
  innloggetFnr: string;
  tiltak: TiltakDTO;
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
      <div className="flex flex-row gap-4 mb-4">
        {createStatusLabel(tiltak.status)}
        <Heading size={"medium"} level={"4"}>
          {tiltak.tiltaknavn}
        </Heading>
      </div>

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
        <Alert className="mb-4" variant={"warning"}>
          Dette tiltaket mangler vurdering fra lederen din
        </Alert>
      )}

      {tiltak.gjennomfoering && tiltak.status === STATUS_TILTAK.AVTALT && (
        <>
          <Label>Oppfølging og gjennomføring</Label>
          <BodyLong spacing={true}>{tiltak.gjennomfoering}</BodyLong>
        </>
      )}

      <Detail
        spacing={true}
      >{`Foreslått av ${tiltak.opprettetAv.navn}`}</Detail>

      {!readonly && (
        <>
          <Dialog
            tiltakId={tiltak.tiltakId}
            kommentarer={tiltak.kommentarer}
            arbeidstakerFnr={arbeidstakerFnr}
          />

          {displayNyKommentar && (
            <NyKommentar
              isLoading={lagreKommentar.isPending}
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
            <Row className="mt-8">
              {isTiltakCreatedByInnloggetRole() &&
                (!isAudienceSykmeldt || !isVurdert()) && (
                  <Button
                    variant={"tertiary"}
                    icon={<PencilIcon aria-hidden />}
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
                icon={<Chat2Icon aria-hidden />}
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
