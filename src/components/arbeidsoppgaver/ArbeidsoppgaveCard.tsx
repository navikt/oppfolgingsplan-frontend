import { ArbeidsoppgaveHeading } from "./ArbeidsoppgaveHeading";
import { EditerArbeidsoppgave } from "./EditerArbeidsoppgave";
import { KanIkkeBeskrivelse } from "./KanIkkeBeskrivelse";
import { ArbeidsoppgaveKnapper } from "./ArbeidsoppgaveKnapper";
import { OpprettetAv } from "./OpprettetAv";
import { SlettArbeidsoppgaveButton } from "./SlettArbeidsoppgaveButton";
import { TilretteleggingsBeskrivelse } from "./TilretteleggingsBeskrivelse";
import { VurderButton } from "./VurderButton";
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
import { Arbeidsoppgave } from "../../schema/oppfolgingsplanSchema";
import { Card } from "components/blocks/card/Card";
import { CardHeader } from "components/blocks/card/CardHeader";
import { texts } from "components/seplanen/texts";
import { AddColored } from "components/blocks/icons/AddColored";
import { Button } from "@navikt/ds-react";

interface Props {
  arbeidstakerFnr: string;
  arbeidsoppgave: Arbeidsoppgave;
  readonly?: Boolean;
}

export const ArbeidsoppgaveCard = ({
  arbeidstakerFnr,
  arbeidsoppgave,
  readonly = true,
}: Props) => {
  const { isAudienceSykmeldt } = useAudience();
  const type = arbeidsoppgave.gjennomfoering?.kanGjennomfoeres;
  const [editererArbeidsoppgave, setEditererArbeidsoppgave] = useState(false);
  const aktoerHarOpprettetElement =
    arbeidstakerFnr ===
    (arbeidsoppgave.opprettetAv && arbeidsoppgave.opprettetAv.fnr);

  const EditerArbeidsoppgaveForm = () => (
    <EditerArbeidsoppgave
      show={editererArbeidsoppgave}
      arbeidsoppgave={arbeidsoppgave}
      doneEditing={() => setEditererArbeidsoppgave(false)}
    />
  );
  const EndreKnapp = () => (
    <Button
      variant={"tertiary"}
      icon={<Edit />}
      onClick={() => setEditererArbeidsoppgave(true)}
    >
      Endre
    </Button>
  );
  const SlettKnapp = () => (
    <SlettArbeidsoppgaveButton
      show={aktoerHarOpprettetElement}
      arbeidsoppgaveId={arbeidsoppgave.arbeidsoppgaveId}
    />
  );
  const VurderKnapp = () => (
    <VurderButton
      show={isAudienceSykmeldt}
      onClick={() => setEditererArbeidsoppgave(true)}
    />
  );

  return (
    <>
      {type === KANGJENNOMFOERES.KAN && (
        <Card>
          <CardHeader>
            <SuccessColored />
            {texts.arbeidsoppgaveList.cards.kan}
          </CardHeader>
          <ArbeidsoppgaveHeading navn={arbeidsoppgave.arbeidsoppgavenavn} />
          <OpprettetAv opprettetAv={arbeidsoppgave.opprettetAv.navn} />
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
            <AddColored />
            {texts.arbeidsoppgaveList.cards.tilrettelegging}
          </CardHeader>
          <ArbeidsoppgaveHeading navn={arbeidsoppgave.arbeidsoppgavenavn} />
          <TilretteleggingsBeskrivelse
            gjennomfoering={arbeidsoppgave.gjennomfoering!}
          />
          <OpprettetAv opprettetAv={arbeidsoppgave.opprettetAv.navn} />
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
            <ErrorColored />
            {texts.arbeidsoppgaveList.cards.kanIkke}
          </CardHeader>
          <ArbeidsoppgaveHeading navn={arbeidsoppgave.arbeidsoppgavenavn} />
          <KanIkkeBeskrivelse gjennomfoering={arbeidsoppgave.gjennomfoering!} />
          <OpprettetAv opprettetAv={arbeidsoppgave.opprettetAv.navn} />
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
              <WarningColored />
              {texts.arbeidsoppgaveList.cards.ikkeVurdert}
            </CardHeader>
            <ArbeidsoppgaveHeading navn={arbeidsoppgave.arbeidsoppgavenavn} />
            <OpprettetAv opprettetAv={arbeidsoppgave.opprettetAv.navn} />
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
