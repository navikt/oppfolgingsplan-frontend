import { ArbeidsoppgaveHeading } from "@/common/components/arbeidsoppgaver/ArbeidsoppgaveHeading";
import { EditerArbeidsoppgave } from "@/common/components/arbeidsoppgaver/EditerArbeidsoppgave";
import { EndreButton } from "@/common/components/arbeidsoppgaver/EndreButton";
import { KanIkkeBeskrivelse } from "@/common/components/arbeidsoppgaver/KanIkkeBeskrivelse";
import { ArbeidsoppgaveKnapper } from "@/common/components/arbeidsoppgaver/ArbeidsoppgaveKnapper";
import { OpprettetAv } from "@/common/components/arbeidsoppgaver/OpprettetAv";
import { SlettButton } from "@/common/components/arbeidsoppgaver/SlettButton";
import { TilretteleggingsBeskrivelse } from "@/common/components/arbeidsoppgaver/TilretteleggingsBeskrivelse";
import { VurderButton } from "@/common/components/arbeidsoppgaver/VurderButton";
import { VurderingFraSykmeldt } from "@/common/components/arbeidsoppgaver/VurderingFraSykmeldt";
import { Card } from "@/common/components/card/Card";
import { CardHeader } from "@/common/components/card/CardHeader";
import { AddColored } from "@/common/components/icons/AddColored";
import { texts } from "@/common/components/oversikt/texts";
import { useAudience } from "@/common/hooks/routeHooks";
import { KANGJENNOMFOERES } from "@/common/konstanter";
import { ErrorColored, SuccessColored, WarningColored } from "@navikt/ds-icons";
import { useState } from "react";
import { Arbeidsoppgave } from "../../../schema/oppfolgingsplanSchema";

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
    <EndreButton
      show={aktoerHarOpprettetElement}
      onClick={() => setEditererArbeidsoppgave(true)}
    />
  );
  const SlettKnapp = () => (
    <SlettButton
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
