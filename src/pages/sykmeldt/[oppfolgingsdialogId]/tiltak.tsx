import { NextPage } from "next";
import React, { useState } from "react";
import { useAktivPlanSM } from "api/queries/sykmeldt/oppfolgingsplanerQueriesSM";
import { NyttTiltak } from "components/tiltak/NyttTiltak";
import {
  OppfolgingsplanPageSM,
  Page,
} from "components/blocks/wrappers/OppfolgingsplanPageSM";
import { LagredeTiltak } from "components/tiltak/LagredeTiltak";
import { beskyttetSideUtenProps } from "../../../auth/beskyttetSide";
import { TiltakFormSM } from "../../../components/tiltak/TiltakFormSM";
import { STATUS_TILTAK } from "../../../constants/konstanter";
import { useLagreTiltak } from "../../../api/queries/oppfolgingsplan/tiltakQueries";
import { TiltakFormValues } from "../../../components/tiltak/utils/typer";
import { Tiltak } from "../../../types/oppfolgingsplan";
import { formatAsLocalDateTime } from "../../../utils/dateUtils";

const formHeadingTexts = {
  title: "Hva kan gjøre det lettere å jobbe?",
  body: "Når dere har fått oversikt over arbeidsoppgavene dine, kan dere se på hva slags tilrettelegging det er mulig å tilby.",
};

const Tiltak: NextPage = () => {
  const aktivPlan = useAktivPlanSM();
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
    <OppfolgingsplanPageSM page={Page.TILTAK}>
      {aktivPlan && (
        <div>
          <NyttTiltak
            formHeadingTitle={formHeadingTexts.title}
            formHeadingBody={formHeadingTexts.body}
            leggerTilNyttTiltak={leggerTilNyttTiltak}
            setLeggerTilNyttTiltak={setLeggerTilNyttTiltak}
          >
            <TiltakFormSM
              isSubmitting={lagreTiltak.isLoading}
              onSubmit={(data) => {
                data.status = STATUS_TILTAK.FORSLAG;
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
    </OppfolgingsplanPageSM>
  );
};

export const getServerSideProps = beskyttetSideUtenProps;

export default Tiltak;
