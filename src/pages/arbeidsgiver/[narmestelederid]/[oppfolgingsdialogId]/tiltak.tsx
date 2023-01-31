import { NextPage } from "next";
import React, { useState } from "react";
import { NyttTiltak } from "components/tiltak/NyttTiltak";
import { Page } from "components/blocks/wrappers/OppfolgingsplanPageSM";
import { LagredeTiltak } from "components/tiltak/LagredeTiltak";
import { OppfolgingsplanPageAG } from "../../../../components/blocks/wrappers/OppfolgingsplanPageAG";
import { useAktivPlanAG } from "../../../../api/queries/arbeidsgiver/oppfolgingsplanerQueriesAG";
import { beskyttetSideUtenProps } from "../../../../auth/beskyttetSide";
import { useLagreTiltak } from "../../../../api/queries/oppfolgingsplan/tiltakQueries";
import { TiltakFormValues } from "../../../../components/tiltak/utils/typer";
import { Tiltak } from "../../../../types/oppfolgingsplan";
import { TiltakFormAG } from "../../../../components/tiltak/TiltakFormAG";

const formHeadingTexts = {
  title: "Hva kan dere gjøre som arbeidsgiver?",
  body: "",
};

const Tiltak: NextPage = () => {
  const aktivPlan = useAktivPlanAG();
  const lagreTiltak = useLagreTiltak();
  const [leggerTilNyttTiltak, setLeggerTilNyttTiltak] = useState(false);
  const nyttTiltakInformasjon = (data: TiltakFormValues): Partial<Tiltak> => {
    return {
      tiltaknavn: data.overskrift,
      beskrivelse: data.beskrivelse,
      fom: data.fom?.toJSON(),
      tom: data.tom?.toJSON(),
      status: data.status,
      beskrivelseIkkeAktuelt: data.beskrivelseIkkeAktuelt,
      gjennomfoering: data.gjennomfoering,
    };
  };
  return (
    <OppfolgingsplanPageAG page={Page.TILTAK}>
      {aktivPlan && (
        <div>
          <NyttTiltak
            formHeadingTitle={formHeadingTexts.title}
            formHeadingBody={formHeadingTexts.body}
            leggerTilNyttTiltak={leggerTilNyttTiltak}
            setLeggerTilNyttTiltak={setLeggerTilNyttTiltak}
          >
            <TiltakFormAG
              isSubmitting={lagreTiltak.isLoading}
              onSubmit={(data) => {
                lagreTiltak
                  .mutateAsync(nyttTiltakInformasjon(data))
                  .then(() => {
                    setLeggerTilNyttTiltak(false);
                  });
              }}
              onCancel={() => setLeggerTilNyttTiltak(false)}
            />
          </NyttTiltak>

          <LagredeTiltak oppfolgingsplan={aktivPlan} />
        </div>
      )}
    </OppfolgingsplanPageAG>
  );
};

export const getServerSideProps = beskyttetSideUtenProps;

export default Tiltak;
