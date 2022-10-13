import { PanelWrapper } from "../PanelWrapper";
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

export const ArbeidsoppgaverPanel = ({ oppfolgingsplan }: Props) => {
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
    <PanelWrapper>
      <Heading level="3" size="medium">
        {texts.arbeidsoppgaverPanel.title}
      </Heading>
      {arbeidsoppgaverKanGjennomfoeres.length && (
        <ArbeidsoppgaveCards
          arbeidsoppgaver={arbeidsoppgaverKanGjennomfoeres}
          type={"KAN"}
          title={texts.arbeidsoppgaverPanel.cardTitles.kan}
        />
      )}
      <ArbeidsoppgaveCards
        arbeidsoppgaver={arbeidsoppgaverMedTilrettelegging}
        type={"TILRETTELEGGING"}
        title={texts.arbeidsoppgaverPanel.cardTitles.tilrettelegging}
      />
      <ArbeidsoppgaveCards
        arbeidsoppgaver={arbeidsoppgaverKanIkkeGjennomfoeres}
        type={"KAN_IKKE"}
        title={texts.arbeidsoppgaverPanel.cardTitles.kanIkke}
      />
      <ArbeidsoppgaveCards
        arbeidsoppgaver={arbeidsoppgaverIkkeVurdert}
        type={"IKKE_VURDERT"}
        title={texts.arbeidsoppgaverPanel.cardTitles.ikkeVurdert}
      />
    </PanelWrapper>
  );
};
