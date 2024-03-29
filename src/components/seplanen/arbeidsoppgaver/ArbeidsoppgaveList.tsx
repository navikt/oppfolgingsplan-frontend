import { KANGJENNOMFOERES } from "../../../constants/konstanter";
import { BodyLong, Heading } from "@navikt/ds-react";
import { ContentWrapper } from "../ContentWrapper";
import { texts } from "../texts";
import { ArbeidsoppgaveCard } from "../../arbeidsoppgaver/arbeidsoppgavecard/ArbeidsoppgaveCard";
import { ArbeidsOppgaveDTO } from "../../../schema/oppfolgingsplanSchema";

interface Props {
  arbeidstakerFnr: string;
  arbeidsoppgaver: ArbeidsOppgaveDTO[];
}

export const ArbeidsoppgaveList = ({
  arbeidstakerFnr,
  arbeidsoppgaver,
}: Props) => {
  const sorterArbeidsoppgaverEtterTypeOgOpprettet = (
    arbeidsoppgaver: ArbeidsOppgaveDTO[],
  ) => {
    const order = [
      KANGJENNOMFOERES.KAN,
      KANGJENNOMFOERES.TILRETTELEGGING,
      KANGJENNOMFOERES.KAN_IKKE,
      KANGJENNOMFOERES.IKKE_VURDERT,
      undefined,
    ];
    return arbeidsoppgaver.sort((a, b) => {
      if (
        order.indexOf(b.gjennomfoering?.kanGjennomfoeres) <
        order.indexOf(a.gjennomfoering?.kanGjennomfoeres)
      )
        return 1;
      if (
        order.indexOf(b.gjennomfoering?.kanGjennomfoeres) >
        order.indexOf(a.gjennomfoering?.kanGjennomfoeres)
      )
        return -1;
      else {
        return b.arbeidsoppgaveId - a.arbeidsoppgaveId;
      }
    });
  };

  const sortedArbeidsoppgaver =
    sorterArbeidsoppgaverEtterTypeOgOpprettet(arbeidsoppgaver);

  return (
    <ContentWrapper>
      <Heading level="3" size="medium">
        {texts.arbeidsoppgaveList.title}
      </Heading>
      {sortedArbeidsoppgaver.length > 0 ? (
        <div>
          {arbeidsoppgaver.map(
            (arbeidsoppgave: ArbeidsOppgaveDTO, idx: number) => (
              <ArbeidsoppgaveCard
                arbeidsoppgave={arbeidsoppgave}
                arbeidstakerFnr={arbeidstakerFnr}
                readonly={true}
                key={`arbeidsoppgaver-list-${idx}`}
              />
            ),
          )}
        </div>
      ) : (
        <BodyLong>Ingen oppgaver er lagt til enda</BodyLong>
      )}
    </ContentWrapper>
  );
};
