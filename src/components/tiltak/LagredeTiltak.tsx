import React, { ReactElement } from "react";
import { LagretTiltak } from "./LagretTiltak";
import { Oppfolgingsplan } from "../../types/oppfolgingsplan";
import { useInnloggetFnr } from "../../api/queries/oppfolgingsplan/oppfolgingsplanQueries";

interface Props {
  oppfolgingsplan: Oppfolgingsplan;
}

export const LagredeTiltak = ({
  oppfolgingsplan,
}: Props): ReactElement | null => {
  const arbeidstakerFnr = oppfolgingsplan?.arbeidstaker?.fnr;
  const innloggetFnr = useInnloggetFnr(oppfolgingsplan);

  if (!oppfolgingsplan.tiltakListe || !arbeidstakerFnr || !innloggetFnr)
    return null;

  const alleTiltak = oppfolgingsplan.tiltakListe
    .sort((t1, t2) => t2.tiltakId - t1.tiltakId)
    .map((tiltak, index) => {
      return (
        <LagretTiltak
          key={index}
          arbeidstakerFnr={arbeidstakerFnr}
          innloggetFnr={innloggetFnr}
          tiltak={tiltak}
          readonly={false}
        />
      );
    });

  return <>{alleTiltak}</>;
};
