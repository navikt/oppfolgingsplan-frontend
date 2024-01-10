import React, { ReactElement } from "react";
import { LagretTiltak } from "./LagretTiltak";
import { useInnloggetFnr } from "../../api/queries/oppfolgingsplan/oppfolgingsplanQueries";
import { OppfolgingsplanDTO } from "../../schema/oppfolgingsplanSchema";

interface Props {
  oppfolgingsplan?: OppfolgingsplanDTO;
}

export const LagredeTiltak = ({
  oppfolgingsplan,
}: Props): ReactElement | null => {
  const arbeidstakerFnr = oppfolgingsplan?.arbeidstaker?.fnr;
  const innloggetFnr = useInnloggetFnr(oppfolgingsplan);

  if (
    !oppfolgingsplan ||
    !oppfolgingsplan.tiltakListe ||
    !arbeidstakerFnr ||
    !innloggetFnr
  )
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
