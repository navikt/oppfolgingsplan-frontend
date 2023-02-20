import { ArbeidsoppgaveHeading } from "./ArbeidsoppgaveHeading";
import { EditerArbeidsoppgave } from "./EditerArbeidsoppgave";
import { KanIkkeBeskrivelse } from "./KanIkkeBeskrivelse";
import { ArbeidsoppgaveKnapper } from "./ArbeidsoppgaveKnapper";
import { OpprettetAv } from "./OpprettetAv";
import { SlettArbeidsoppgaveButton } from "./SlettArbeidsoppgaveButton";
import { TilretteleggingsBeskrivelse } from "./TilretteleggingsBeskrivelse";
import { VurderButton } from "../blocks/buttons/VurderButton";
import { VurderingFraSykmeldt } from "./VurderingFraSykmeldt";
import { useAudience } from "hooks/routeHooks";
import { KANGJENNOMFOERES } from "constants/konstanter";
import {
  Edit,
  ErrorColored,
  SuccessColored,
  WarningColored,
} from "@navikt/ds-icons";
import { useState } from "react";
import { Card } from "components/blocks/card/Card";
import { CardHeader } from "components/blocks/card/CardHeader";
import { texts } from "components/seplanen/texts";
import { AddColored } from "components/blocks/icons/AddColored";
import { Button } from "@navikt/ds-react";
import { Arbeidsoppgave } from "../../types/oppfolgingsplan";
import {
  aktorHarOpprettetElement,
  getAktorNavn,
} from "../../utils/textContextUtils";

interface Props {
  innloggetFnr: string;
  arbeidstakerFnr: string;
  arbeidsoppgave: Arbeidsoppgave;
  readonly?: boolean;
}

export const ArbeidsoppgaveCard = ({
  innloggetFnr,
  arbeidstakerFnr,
  arbeidsoppgave,
  readonly = true,
}: Props) => {
  const { isAudienceSykmeldt } = useAudience();
  const type = arbeidsoppgave.gjennomfoering?.kanGjennomfoeres;
  const [editererArbeidsoppgave, setEditererArbeidsoppgave] = useState(false);
  const isAktorHarOpprettetElement = aktorHarOpprettetElement(
    innloggetFnr,
    arbeidstakerFnr,
    arbeidsoppgave.opprettetAv.fnr
  );
  const aktorNavn = getAktorNavn(
    isAudienceSykmeldt,
    isAktorHarOpprettetElement,
    arbeidsoppgave.opprettetAv.navn
  );

  const EditerArbeidsoppgaveForm = () => (
    <EditerArbeidsoppgave
      show={editererArbeidsoppgave}
      arbeidsoppgave={arbeidsoppgave}
      doneEditing={() => setEditererArbeidsoppgave(false)}
    />
  );

  // TODO: Swap audience with composition
  const EndreKnapp = () => {
    if (isAudienceSykmeldt) {
      return (
        <Button
          variant={"tertiary"}
          icon={<Edit aria-hidden />}
          onClick={() => setEditererArbeidsoppgave(true)}
        >
          Endre
        </Button>
      );
    }
    return null;
  };
  const SlettKnapp = () => (
    <SlettArbeidsoppgaveButton
      show={isAktorHarOpprettetElement}
      arbeidsoppgaveId={arbeidsoppgave.arbeidsoppgaveId}
    />
  );
  const VurderKnapp = () => (
    <VurderButton
      show={isAudienceSykmeldt}
      onClick={() => setEditererArbeidsoppgave(true)}
      text={texts.arbeidsoppgaveList.buttons.giDinVurdering}
    />
  );

  return (
    <>
      {type === KANGJENNOMFOERES.KAN && (
        <Card>
          <CardHeader>
            <SuccessColored aria-hidden />
            {texts.arbeidsoppgaveList.cards.kan}
          </CardHeader>
          <ArbeidsoppgaveHeading navn={arbeidsoppgave.arbeidsoppgavenavn} />
          <OpprettetAv opprettetAv={aktorNavn} />
          {!readonly && (
            <>
              <EditerArbeidsoppgaveForm />
              <ArbeidsoppgaveKnapper show={!editererArbeidsoppgave}>
                <EndreKnapp />
                <SlettKnapp />
              </ArbeidsoppgaveKnapper>
            </>
          )}
        </Card>
      )}
      {type === KANGJENNOMFOERES.TILRETTELEGGING && (
        <Card>
          <CardHeader>
            <AddColored aria-hidden />
            {texts.arbeidsoppgaveList.cards.tilrettelegging}
          </CardHeader>
          <ArbeidsoppgaveHeading navn={arbeidsoppgave.arbeidsoppgavenavn} />
          <TilretteleggingsBeskrivelse
            gjennomfoering={arbeidsoppgave.gjennomfoering}
          />
          <OpprettetAv opprettetAv={aktorNavn} />
          {!readonly && (
            <>
              <EditerArbeidsoppgaveForm />
              <ArbeidsoppgaveKnapper show={!editererArbeidsoppgave}>
                <EndreKnapp />
                <SlettKnapp />
              </ArbeidsoppgaveKnapper>
            </>
          )}
        </Card>
      )}
      {type === KANGJENNOMFOERES.KAN_IKKE && (
        <Card>
          <CardHeader>
            <ErrorColored aria-hidden />
            {texts.arbeidsoppgaveList.cards.kanIkke}
          </CardHeader>
          <ArbeidsoppgaveHeading navn={arbeidsoppgave.arbeidsoppgavenavn} />
          <KanIkkeBeskrivelse gjennomfoering={arbeidsoppgave.gjennomfoering} />
          <OpprettetAv opprettetAv={aktorNavn} />
          {!readonly && (
            <>
              <EditerArbeidsoppgaveForm />
              <ArbeidsoppgaveKnapper show={!editererArbeidsoppgave}>
                <EndreKnapp />
                <SlettKnapp />
              </ArbeidsoppgaveKnapper>
            </>
          )}
        </Card>
      )}
      {type === KANGJENNOMFOERES.IKKE_VURDERT ||
        (!type && (
          <Card>
            <CardHeader>
              <WarningColored aria-hidden />
              {texts.arbeidsoppgaveList.cards.ikkeVurdert}
            </CardHeader>
            <ArbeidsoppgaveHeading navn={arbeidsoppgave.arbeidsoppgavenavn} />
            <OpprettetAv opprettetAv={aktorNavn} />
            {!readonly && (
              <>
                <VurderingFraSykmeldt />
                <EditerArbeidsoppgaveForm />
                <ArbeidsoppgaveKnapper show={!editererArbeidsoppgave}>
                  <VurderKnapp />
                  <SlettKnapp />
                </ArbeidsoppgaveKnapper>
              </>
            )}
          </Card>
        ))}
    </>
  );
};
