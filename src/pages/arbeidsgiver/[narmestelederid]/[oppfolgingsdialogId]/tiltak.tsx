import { NextPage } from "next";
import React, { useState } from "react";
import { NyttTiltak } from "../../../../components/tiltak/NyttTiltak";
import { LagredeTiltak } from "../../../../components/tiltak/LagredeTiltak";
import { useOppfolgingsplanerAG } from "../../../../api/queries/arbeidsgiver/oppfolgingsplanerQueriesAG";
import { beskyttetSideUtenProps } from "../../../../auth/beskyttetSide";
import { TiltakFormValues } from "../../../../components/tiltak/utils/typer";
import { Tiltak } from "../../../../types/oppfolgingsplan";
import { TiltakFormAG } from "../../../../components/tiltak/TiltakFormAG";
import { formatAsLocalDateTime } from "../../../../utils/dateUtils";
import {
  OppfolgingsplanPageAG,
  Page,
} from "../../../../components/blocks/wrappers/oppfolgingsplanpageag/OppfolgingsplanPageAG";
import { findAktivPlan } from "../../../../utils/oppfolgingplanUtils";
import { useOppfolgingsplanRouteId } from "../../../../hooks/routeHooks";
import { useLagreTiltak } from "../../../../api/queries/oppfolgingsplan/tiltakQueries";

const NyttTiltakPanel = () => {
  const lagreTiltak = useLagreTiltak();
  const [leggerTilNyttTiltak, setLeggerTilNyttTiltak] = useState(false);

  const nyttTiltakInformasjon = (data: TiltakFormValues): Partial<Tiltak> => {
    return {
      tiltaknavn: data.overskrift,
      beskrivelse: data.beskrivelse,
      fom: data.fom ? formatAsLocalDateTime(data.fom) : null,
      tom: data.tom ? formatAsLocalDateTime(data.tom) : null,
      status: data.status,
      beskrivelseIkkeAktuelt: data.beskrivelseIkkeAktuelt,
      gjennomfoering: data.gjennomfoering,
    };
  };

  return (
    <NyttTiltak
      formHeadingTitle={"Hva kan dere gjøre som arbeidsgiver?"}
      formHeadingBody={""}
      leggerTilNyttTiltak={leggerTilNyttTiltak}
      setLeggerTilNyttTiltak={setLeggerTilNyttTiltak}
    >
      <TiltakFormAG
        isSubmitting={lagreTiltak.isPending}
        onSubmit={(data) => {
          lagreTiltak.mutateAsync(nyttTiltakInformasjon(data)).then(() => {
            setLeggerTilNyttTiltak(false);
          });
        }}
        onCancel={() => setLeggerTilNyttTiltak(false)}
      />
    </NyttTiltak>
  );
};

const Tiltak: NextPage = () => {
  const allePlaner = useOppfolgingsplanerAG();
  const id = useOppfolgingsplanRouteId();

  return (
    <OppfolgingsplanPageAG page={Page.TILTAK}>
      {allePlaner.isSuccess ? (
        <div>
          <NyttTiltakPanel />
          <LagredeTiltak oppfolgingsplan={findAktivPlan(id, allePlaner.data)} />
        </div>
      ) : null}
    </OppfolgingsplanPageAG>
  );
};

export const getServerSideProps = beskyttetSideUtenProps;

export default Tiltak;
