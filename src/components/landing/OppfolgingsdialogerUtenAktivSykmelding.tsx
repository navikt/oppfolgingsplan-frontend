import React from "react";
import OppfolgingsdialogTidligereUtenSykmelding from "./OppfolgingsdialogTidligereUtenSykmelding";
import { Heading } from "@navikt/ds-react";
import { Oppfolgingsplan } from "../../types/oppfolgingsplan";
import { SpacedDiv } from "../blocks/wrappers/SpacedDiv";

interface Props {
  oppfolgingsplanerUtenAktivSykmelding: Oppfolgingsplan[];
}

const OppfolgingsdialogerUtenAktivSykmelding = ({
  oppfolgingsplanerUtenAktivSykmelding,
}: Props) => {
  return (
    <div>
      <Heading size={"medium"} level={"2"}>
        Tidligere oppfølgingsplaner
      </Heading>
      <SpacedDiv marginTop={"1rem"}>
        {oppfolgingsplanerUtenAktivSykmelding.map((oppfolgingsplan, idx) => {
          return (
            <OppfolgingsdialogTidligereUtenSykmelding
              oppfolgingsplanUtenAktivSykmelding={oppfolgingsplan}
              key={idx}
            />
          );
        })}
      </SpacedDiv>
    </div>
  );
};

export default OppfolgingsdialogerUtenAktivSykmelding;
