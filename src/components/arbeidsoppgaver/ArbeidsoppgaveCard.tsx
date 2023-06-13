import { ArbeidsoppgaveHeading } from "./ArbeidsoppgaveHeading";
import { EditerArbeidsoppgave } from "./EditerArbeidsoppgave";
import { KanIkkeBeskrivelse } from "./KanIkkeBeskrivelse";
import { ArbeidsoppgaveKnapper } from "./ArbeidsoppgaveKnapper";
import { OpprettetAv } from "./OpprettetAv";
import { SlettArbeidsoppgaveButton } from "./SlettArbeidsoppgaveButton";
import { TilretteleggingsBeskrivelse } from "./TilretteleggingsBeskrivelse";
import { VurderButton } from "../blocks/buttons/VurderButton";
import { VurderingFraSykmeldt } from "./VurderingFraSykmeldt";
import { useAudience } from "../../hooks/routeHooks";
import { KANGJENNOMFOERES } from "../../constants/konstanter";
import { useState } from "react";
import { Card } from "../blocks/card/Card";
import { CardHeader } from "../blocks/card/CardHeader";
import { texts } from "../seplanen/texts";
import { AddColored } from "../blocks/icons/AddColored";
import { Button } from "@navikt/ds-react";
import { Arbeidsoppgave } from "../../types/oppfolgingsplan";
import {
  aktorHarOpprettetElement,
  getAktorNavn,
} from "../../utils/textContextUtils";
import { ARBEIDSOPPGAVE_CARD } from "../../../cypress/dataTestId";
import {
  CheckmarkCircleFillIcon,
  ExclamationmarkTriangleFillIcon,
  PencilIcon,
  XMarkOctagonFillIcon,
} from "@navikt/aksel-icons";
import { IconWrapper } from "../blocks/icons/IconWrapper";

interface Props {
  arbeidstakerFnr: string;
  arbeidsoppgave: Arbeidsoppgave;
  readonly?: boolean;
}

export const ArbeidsoppgaveCard = ({
  arbeidstakerFnr,
  arbeidsoppgave,
  readonly = true,
}: Props) => {
  const { isAudienceSykmeldt } = useAudience();
  const type = arbeidsoppgave.gjennomfoering?.kanGjennomfoeres;
  const [editererArbeidsoppgave, setEditererArbeidsoppgave] = useState(false);
  const isAktorHarOpprettetElement = aktorHarOpprettetElement(
    isAudienceSykmeldt,
    arbeidstakerFnr,
    arbeidsoppgave.opprettetAv.fnr
  );
  const aktorNavn = getAktorNavn(
    isAudienceSykmeldt,
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
          icon={<PencilIcon aria-hidden />}
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
    <div data-testid={ARBEIDSOPPGAVE_CARD}>
      {type === KANGJENNOMFOERES.KAN && (
        <Card>
          <CardHeader>
            <IconWrapper>
              <CheckmarkCircleFillIcon
                aria-hidden
                color={"var(--a-green-600)"}
                width={30}
                height={30}
              />
            </IconWrapper>
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
            <IconWrapper>
              <XMarkOctagonFillIcon
                aria-hidden
                color={"var(--ac-alert-icon-error-color,var(--a-icon-danger))"}
                width={30}
                height={30}
              />
            </IconWrapper>
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
              <IconWrapper>
                <ExclamationmarkTriangleFillIcon
                  color="var(--ac-alert-icon-warning-color,var(--a-icon-warning))"
                  aria-hidden
                  width={30}
                  height={30}
                />
              </IconWrapper>{" "}
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
    </div>
  );
};
