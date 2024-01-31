import { useAudience } from "../../../hooks/routeHooks";
import { useState } from "react";
import {
  aktorHarOpprettetElement,
  getAktorNavn,
} from "../../../utils/textContextUtils";
import { EditerArbeidsoppgave } from "../EditerArbeidsoppgave";
import { Button } from "@navikt/ds-react";
import { PencilIcon } from "@navikt/aksel-icons";
import { SlettArbeidsoppgaveButton } from "../SlettArbeidsoppgaveButton";
import { VurderButton } from "../../blocks/buttons/VurderButton";
import { texts } from "../../seplanen/texts";
import { ARBEIDSOPPGAVE_CARD } from "../../../../cypress/dataTestId";
import { KANGJENNOMFOERES } from "../../../constants/konstanter";
import styles from "./arbeidsoppgavecard.module.css";
import { ArbeidsoppgaveHeading } from "../ArbeidsoppgaveHeading";
import { OpprettetAv } from "../OpprettetAv";
import { ArbeidsoppgaveKnapper } from "../ArbeidsoppgaveKnapper";
import { FilledPlusIcon } from "../../blocks/icons/FilledPlusIcon";
import { TilretteleggingsBeskrivelse } from "../TilretteleggingsBeskrivelse";
import { KanIkkeBeskrivelse } from "../KanIkkeBeskrivelse";
import { VurderingFraSykmeldt } from "../VurderingFraSykmeldt";
import { SpacedPanel } from "../../blocks/wrappers/SpacedPanel";
import { FilledCheckmarkIcon } from "../../blocks/icons/FilledCheckmarkIcon";
import { FilledCrossIcon } from "../../blocks/icons/FilledCrossIcon";
import { FilledWarningIcon } from "../../blocks/icons/FilledWarningIcon";
import { ArbeidsOppgaveDTO } from "../../../schema/oppfolgingsplanSchema";

interface Props {
  arbeidstakerFnr: string;
  arbeidsoppgave: ArbeidsOppgaveDTO;
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
    arbeidsoppgave.opprettetAv.fnr,
  );
  const aktorNavn = getAktorNavn(
    isAudienceSykmeldt,
    arbeidsoppgave.opprettetAv.navn,
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
        <SpacedPanel border={true}>
          <div className={styles.cardheader}>
            <FilledCheckmarkIcon />
            {texts.arbeidsoppgaveList.cards.kan}
          </div>
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
        </SpacedPanel>
      )}
      {type === KANGJENNOMFOERES.TILRETTELEGGING && (
        <SpacedPanel border={true}>
          <div className={styles.cardheader}>
            <FilledPlusIcon aria-hidden />
            {texts.arbeidsoppgaveList.cards.tilrettelegging}
          </div>
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
        </SpacedPanel>
      )}
      {type === KANGJENNOMFOERES.KAN_IKKE && (
        <SpacedPanel border={true}>
          <div className={styles.cardheader}>
            <FilledCrossIcon />
            {texts.arbeidsoppgaveList.cards.kanIkke}
          </div>
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
        </SpacedPanel>
      )}
      {type === KANGJENNOMFOERES.IKKE_VURDERT ||
        (!type && (
          <SpacedPanel border={true}>
            <div className={styles.cardheader}>
              <FilledWarningIcon /> {texts.arbeidsoppgaveList.cards.ikkeVurdert}
            </div>
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
          </SpacedPanel>
        ))}
    </div>
  );
};
