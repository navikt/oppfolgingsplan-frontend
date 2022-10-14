import { ContentWrapper } from "../ContentWrapper";
import {
  Arbeidsoppgave,
  Oppfolgingsplan,
} from "../../../../schema/oppfolgingsplanSchema";
import { ArbeidsoppgaveCards } from "./ArbeidsoppgaveCards";
import { sorterArbeidsoppgaverEtterOpprettet } from "../../../utils/arbeidsoppgaveUtils";
import { texts } from "../texts";
import { Heading } from "@navikt/ds-react";

export type KanGjennomforesType =
  | "KAN"
  | "KAN_IKKE"
  | "TILRETTELEGGING"
  | "IKKE_VURDERT";

interface Props {
  oppfolgingsplan: Oppfolgingsplan;
}

export const ArbeidsoppgaveList = ({ oppfolgingsplan }: Props) => {
  const arbeidsoppgaver = sorterArbeidsoppgaverEtterOpprettet(
    oppfolgingsplan?.arbeidsoppgaveListe
  );

  console.log(arbeidsoppgaver);

  const getFilteredOppgaver = (filter: KanGjennomforesType) =>
    arbeidsoppgaver.filter(
      (arbeidsoppgave: Arbeidsoppgave) =>
        arbeidsoppgave.gjennomfoering &&
        arbeidsoppgave.gjennomfoering.kanGjennomfoeres === filter
    );

  const arbeidsoppgaverKanGjennomfoeres = getFilteredOppgaver("KAN");
  const arbeidsoppgaverMedTilrettelegging =
    getFilteredOppgaver("TILRETTELEGGING");
  const arbeidsoppgaverKanIkkeGjennomfoeres = getFilteredOppgaver("KAN_IKKE");
  const arbeidsoppgaverIkkeVurdert = arbeidsoppgaver.filter(
    (arbeidsoppgave: Arbeidsoppgave) => !arbeidsoppgave.gjennomfoering
  );

  return (
    <ContentWrapper>
      <Heading level="3" size="medium">
        {texts.arbeidsoppgaveList.title}
      </Heading>
      {arbeidsoppgaverKanGjennomfoeres.length && (
        <ArbeidsoppgaveCards
          arbeidsoppgaver={arbeidsoppgaverKanGjennomfoeres}
          type={"KAN"}
          title={texts.arbeidsoppgaveList.cards.kan}
        />
      )}
      <ArbeidsoppgaveCards
        arbeidsoppgaver={arbeidsoppgaverMedTilrettelegging}
        type={"TILRETTELEGGING"}
        title={texts.arbeidsoppgaveList.cards.tilrettelegging}
      />
      <ArbeidsoppgaveCards
        arbeidsoppgaver={arbeidsoppgaverKanIkkeGjennomfoeres}
        type={"KAN_IKKE"}
        title={texts.arbeidsoppgaveList.cards.kanIkke}
      />
      <ArbeidsoppgaveCards
        arbeidsoppgaver={arbeidsoppgaverIkkeVurdert}
        type={"IKKE_VURDERT"}
        title={texts.arbeidsoppgaveList.cards.ikkeVurdert}
      />
    </ContentWrapper>
  );
};
