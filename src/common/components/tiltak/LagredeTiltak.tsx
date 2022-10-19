import React, { ReactElement } from "react";
import { LagretTiltak } from "@/common/components/tiltak/LagretTiltak";
import { Oppfolgingsplan } from "../../../schema/oppfolgingsplanSchema";

interface Props {
  oppfolgingsplan: Oppfolgingsplan;
}

export const LagredeTiltak = ({
  oppfolgingsplan,
}: Props): ReactElement | null => {
  const arbeidstakerFnr = oppfolgingsplan?.arbeidstaker?.fnr;

  if (!oppfolgingsplan.tiltakListe || !arbeidstakerFnr) return null;

  const alleTiltak = oppfolgingsplan.tiltakListe.map((tiltak, index) => {
    return (
      <LagretTiltak
        key={index}
        arbeidstakerFnr={arbeidstakerFnr}
        tiltak={tiltak}
        readonly={false}
      />
    );
  });

  return <>{alleTiltak}</>;
};
