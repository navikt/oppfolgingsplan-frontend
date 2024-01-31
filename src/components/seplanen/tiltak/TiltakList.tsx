import { ContentWrapper } from "../ContentWrapper";
import { texts } from "../texts";
import { STATUS_TILTAK } from "../../../constants/konstanter";
import { Heading } from "@navikt/ds-react";
import React from "react";
import { LagretTiltak } from "../../tiltak/LagretTiltak";
import { useInnloggetFnr } from "../../../api/queries/oppfolgingsplan/oppfolgingsplanQueries";
import {
  OppfolgingsplanDTO,
  TiltakDTO,
} from "../../../schema/oppfolgingsplanSchema";

interface Props {
  oppfolgingsplan: OppfolgingsplanDTO;
}

export const TiltakList = ({ oppfolgingsplan }: Props) => {
  const arbeidstakerFnr = oppfolgingsplan?.arbeidstaker?.fnr;
  const innloggetFnr = useInnloggetFnr(oppfolgingsplan);

  if (!oppfolgingsplan.tiltakListe || !arbeidstakerFnr || !innloggetFnr) {
    return null;
  }

  const sorterTiltakEtterTypeOgOpprettet = (arbeidsoppgaver: TiltakDTO[]) => {
    const order = [
      STATUS_TILTAK.AVTALT,
      STATUS_TILTAK.FORSLAG,
      STATUS_TILTAK.IKKE_AKTUELT,
    ];
    return arbeidsoppgaver.sort((a, b) => {
      if (order.indexOf(b.status) < order.indexOf(a.status)) return 1;
      if (order.indexOf(b.status) > order.indexOf(a.status)) return -1;
      else {
        return b.tiltakId - a.tiltakId;
      }
    });
  };

  const sortedTiltak = sorterTiltakEtterTypeOgOpprettet(
    oppfolgingsplan.tiltakListe,
  );

  const alleTiltak = sortedTiltak.map((tiltak, index) => {
    return (
      <LagretTiltak
        key={index}
        arbeidstakerFnr={arbeidstakerFnr}
        innloggetFnr={innloggetFnr}
        tiltak={tiltak}
        readonly={true}
      />
    );
  });

  return (
    <ContentWrapper>
      <Heading level="3" size="medium">
        {texts.tiltakList.title}
      </Heading>
      <>{alleTiltak}</>
    </ContentWrapper>
  );
};
